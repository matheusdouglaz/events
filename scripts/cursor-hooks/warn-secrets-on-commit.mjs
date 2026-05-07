import { execSync } from "node:child_process";

const suspiciousPattern =
  /(api[_-]?key|secret|token|password|passwd|private[_-]?key|authorization)/i;

const blockedFilePattern =
  /(^|\/)\.env(\.|$)|credentials\.json$|id_rsa$|\.pem$|\.p12$/i;

function getStagedFiles() {
  try {
    const output = execSync("git diff --cached --name-only", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });

    return output
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function getStagedDiff() {
  try {
    return execSync("git diff --cached", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 10 * 1024 * 1024,
    });
  } catch {
    return "";
  }
}

const files = getStagedFiles();
const riskyFile = files.find((file) => blockedFilePattern.test(file));

if (riskyFile) {
  console.error(
    [
      "[Cursor Hook] Commit blocked: sensitive file detected in staging.",
      `Detected file: ${riskyFile}`,
      "Action: remove it from the commit or store secret material in a secure vault.",
    ].join("\n"),
  );
  process.exit(2);
}

const diff = getStagedDiff();
if (suspiciousPattern.test(diff)) {
  console.error(
    [
      "[Cursor Hook] Security warning: potential secret detected in staged diff.",
      "Action: review the diff carefully before committing.",
      "If this is a false positive, adjust content to reduce exposure risk.",
    ].join("\n"),
  );
}

process.exit(0);
