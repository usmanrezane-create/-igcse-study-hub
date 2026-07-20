from pathlib import Path
import fitz
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
TARGETS = {
    "assets/accounting/accounting-02-sources-recording-answers.pdf": 18,
    "assets/accounting/accounting-03-verification-records-answers.pdf": 16,
    "assets/accounting/accounting-04-procedures-answers.pdf": 15,
    "assets/accounting/accounting-05-financial-statements-answers.pdf": 56,
    "assets/accounting/accounting-06-analysis-interpretation-answers.pdf": 9,
}


def git_bytes(commit: str, path: str) -> bytes | None:
    result = subprocess.run(
        ["git", "show", f"{commit}:{path}"],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.DEVNULL,
        check=False,
    )
    return result.stdout if result.returncode == 0 and result.stdout.startswith(b"%PDF") else None


def choose_source(path: str, target_pages: int) -> bytes:
    commits = subprocess.run(
        ["git", "rev-list", "--all", "--", path],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        check=True,
    ).stdout.splitlines()
    best = None
    best_score = 10**9
    for commit in commits:
        data = git_bytes(commit, path)
        if not data:
            continue
        try:
            doc = fitz.open(stream=data, filetype="pdf")
            pages = doc.page_count
            doc.close()
        except Exception:
            continue
        if pages == target_pages:
            print(f"{path}: using historical {commit[:8]} with {pages} pages")
            return data
        score = abs(pages - target_pages) + (1000 if pages > target_pages else 0)
        if score < best_score:
            best_score = score
            best = (data, commit, pages)
    if best:
        print(f"{path}: exact source not found; using {best[1][:8]} with {best[2]} pages")
        return best[0]
    data = (ROOT / path).read_bytes()
    print(f"{path}: using current repository file")
    return data


def group_lines(words, tolerance=1.6):
    words = sorted(words, key=lambda w: (w[1], w[0]))
    lines = []
    for word in words:
        if not lines or abs(word[1] - lines[-1][0][1]) > tolerance:
            lines.append([word])
        else:
            lines[-1].append(word)
    for line in lines:
        line.sort(key=lambda w: w[0])
    return lines


def line_text(line):
    return " ".join(word[4] for word in line).strip()


def best_gap(expected, words, low, high, step=0.75):
    best = (10**9, expected)
    x = low
    while x <= high:
        hits = 0
        near = 0
        for word in words:
            x0, _, x1, _, *_ = word
            if x0 - 0.8 <= x <= x1 + 0.8:
                hits += 1
            if min(abs(x - x0), abs(x - x1)) < 2:
                near += 0.25
        score = hits * 8 + near + abs(x - expected) / 12
        if score < best[0]:
            best = (score, x)
        x += step
    return best[1]


def decorate(data: bytes, output: Path) -> tuple[int, int]:
    doc = fitz.open(stream=data, filetype="pdf")
    total = 0
    pages_with_accounts = 0
    for page in doc:
        words = page.get_text("words")
        lines = group_lines(words)
        blocks = []
        for i, line in enumerate(lines):
            tokens = [w[4] for w in line]
            currency_count = tokens.count("$") + tokens.count("£")
            if tokens.count("Date") < 2 or tokens.count("Details") < 2 or currency_count < 2:
                continue
            header = [w for w in line if w[4] in {"Date", "Details", "$", "£"}][:6]
            if len(header) < 6:
                continue
            data_lines = []
            last_y = max(w[3] for w in line)
            j = i + 1
            while j < len(lines):
                candidate = lines[j]
                text = line_text(candidate)
                y = min(w[1] for w in candidate)
                gap = y - last_y
                min_x = min(w[0] for w in candidate)
                candidate_tokens = [w[4] for w in candidate]
                if gap > 16:
                    break
                if re.search(r"\baccount\b", text, re.I):
                    break
                if re.match(r"^\d+\([a-z]", text, re.I) or text.startswith("Question "):
                    break
                if candidate_tokens.count("Date") >= 2 and candidate_tokens.count("Details") >= 2:
                    break
                if min_x < min(w[0] for w in header) - 25:
                    break
                data_lines.append(candidate)
                last_y = max(w[3] for w in candidate)
                j += 1
            if not data_lines:
                continue
            left = min(w[0] for w in header) - 8
            right = max(w[2] for w in header) + 10
            top = min(w[1] for w in header) - 4
            header_bottom = max(w[3] for w in header) + 4
            bottom = max(w[3] for row in data_lines for w in row) + 5
            flat = [w for row in data_lines for w in row]
            expected = [
                (header[0][2] + header[1][0]) / 2,
                (header[1][2] + header[2][0]) / 2,
                (header[2][2] + header[3][0]) / 2,
                (header[3][2] + header[4][0]) / 2,
                (header[4][2] + header[5][0]) / 2,
            ]
            boundaries = []
            for boundary_index, expected_x in enumerate(expected):
                span = 18 if boundary_index == 2 else 10
                boundaries.append(
                    best_gap(expected_x, flat, max(left + 4, expected_x - span), min(right - 4, expected_x + span))
                )
            for boundary_index in range(1, len(boundaries)):
                if boundaries[boundary_index] <= boundaries[boundary_index - 1] + 8:
                    boundaries[boundary_index] = boundaries[boundary_index - 1] + 8
            if boundaries[-1] >= right - 5:
                boundaries[-1] = right - 5
            blocks.append((left, right, top, header_bottom, bottom, boundaries))
        if blocks:
            pages_with_accounts += 1
        for left, right, top, header_bottom, bottom, boundaries in blocks:
            black = (0.08, 0.08, 0.08)
            gray = (0.55, 0.55, 0.55)
            page.draw_rect(fitz.Rect(left, top, right, bottom), color=black, width=0.8, overlay=False)
            page.draw_line((left, header_bottom), (right, header_bottom), color=black, width=0.8, overlay=False)
            for boundary_index, x in enumerate(boundaries):
                page.draw_line(
                    (x, top),
                    (x, bottom),
                    color=black if boundary_index == 2 else gray,
                    width=1.25 if boundary_index == 2 else 0.45,
                    overlay=False,
                )
            page.insert_text((left + 1, top - 1.5), "Dr", fontname="hebo", fontsize=6.6, color=black, overlay=True)
            page.insert_text((right - 11, top - 1.5), "Cr", fontname="hebo", fontsize=6.6, color=black, overlay=True)
            total += 1
    metadata = doc.metadata
    metadata["title"] = "Cambridge IGCSE Accounting 0452 - Standard Dr and Cr answer layout"
    metadata["author"] = "Usman IGCSE Study Hub"
    metadata["subject"] = "Independent answer guide with standard Dr/Cr account ruling"
    doc.set_metadata(metadata)
    doc.save(output, garbage=4, deflate=True, clean=True)
    pages = doc.page_count
    doc.close()
    return total, pages_with_accounts


def update_text_files():
    index_path = ROOT / "index.html"
    index = index_path.read_text(encoding="utf-8")
    index = re.sub(r"\?v=\d+", "?v=25", index)
    index = re.sub(
        r"\s*<p>Choose Debit or Credit Card on the secure PayPal checkout\. After payment, PayPal returns you to this website, then you sign in to activate full access\.</p>",
        "",
        index,
    )
    index = re.sub(
        r'<div class="device-access-note" role="note" aria-label="[^"]*">\s*<span class="device-access-icon">.*?</span>\s*<div>\s*<b>.*?</b>\s*<p>.*?</p>\s*</div>\s*</div>',
        '<div class="device-access-note" role="note" aria-label="Keep your transaction ID safe">\n'
        '            <span class="device-access-icon">!</span>\n'
        '            <div>\n'
        '              <b>Keep your transaction ID safe</b>\n'
        '              <p>You will receive it by email after payment.</p>\n'
        '            </div>\n'
        '          </div>',
        index,
        flags=re.S,
    )
    index_path.write_text(index, encoding="utf-8")

    app_path = ROOT / "app.js"
    app = app_path.read_text(encoding="utf-8")
    app = re.sub(
        r'answers: "(assets/accounting/[^"?]+-answers\.pdf)(?:\?v=\d+)?"',
        r'answers: "\1?v=25"',
        app,
    )
    app_path.write_text(app, encoding="utf-8")

    for obsolete in ROOT.glob("accounting-v24*.js"):
        obsolete.unlink()


update_text_files()
results = []
for path, target_pages in TARGETS.items():
    source = choose_source(path, target_pages)
    output = ROOT / path
    output.parent.mkdir(parents=True, exist_ok=True)
    tables, pages_with_accounts = decorate(source, output)
    doc = fitz.open(output)
    results.append(f"{path}: {doc.page_count} pages, {tables} Dr/Cr accounts, {pages_with_accounts} pages with accounts")
    doc.close()

(ROOT / "V25_ACCOUNTING_PAYMENT_FIX.txt").write_text(
    "V25 PUBLISHED FIX\n\n"
    "Accounting answer booklets use standard Dr/Cr ledger ruling with Date, Details and Amount columns.\n"
    "The payment box no longer shows the long PayPal-return sentence.\n"
    "The highlighted notice says: Keep your transaction ID safe. You will receive it by email after payment.\n"
    "Sign-in remains after payment only. US$20 once for 30 days remains unchanged.\n\n"
    + "\n".join(results)
    + "\n",
    encoding="utf-8",
)
print("\n".join(results))
