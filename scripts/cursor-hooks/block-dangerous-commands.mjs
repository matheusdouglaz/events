const command = process.env.CURSOR_HOOK_MATCH || "";

if (!command) {
  process.exit(0);
}

const blockedPatterns = [
  /git\s+reset\s+--hard/i,
  /git\s+clean\s+-fd/i,
  /git\s+push\s+-f(?:\s|$)/i,
  /git\s+push\s+--force/i,
  /git\s+push\s+--force-with-lease/i,
  /rm\s+-rf/i,
];

const isBlocked = blockedPatterns.some((pattern) => pattern.test(command));

if (isBlocked) {
  console.error(
    [
      "[Cursor Hook] Command blocked by project safety policy.",
      "Reason: destructive operation detected.",
      "Action: use a safer alternative or request explicit maintainer approval.",
      `Comando detectado: ${command}`,
    ].join("\n"),
  );
  process.exit(2);
}

process.exit(0);
