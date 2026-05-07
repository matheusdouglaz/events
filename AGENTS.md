# Project Agent Guide

## Framework baseline
This project may use Next.js behaviors that differ from older defaults.
Before changing framework-level code, consult relevant docs in
`node_modules/next/dist/docs/` and respect deprecations.

## Workflow baseline
Follow repository rules in `.cursor/rules/` for commit, PR, and code review.
Prefer atomic changes, clear test plans, and explicit risk communication.

## Safety baseline
Do not perform destructive operations without explicit approval.
Never commit secrets, credentials, tokens, or private keys.
If unexpected repository changes appear, stop and ask before proceeding.
