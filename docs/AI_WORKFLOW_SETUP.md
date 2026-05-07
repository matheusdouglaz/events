# AI Workflow Setup (Cursor)

Este guia separa o que deve ser global (usuario) e o que deve ser por projeto.

## 1) User Rules globais (Cursor Settings > Rules)

Use o texto abaixo como base global:

```md
Responda sempre em Portugues do Brasil.
Seja objetivo, tecnico e orientado a resultado.
Explique rapidamente o plano antes de alterar arquivos.
Nunca execute comandos destrutivos sem confirmacao explicita.
Ao revisar codigo, priorize bugs, seguranca e regressao.
Para commits: prefira Conventional Commits e explique o "por que".
Para PRs: inclua resumo, risco e plano de testes.
```

## 2) Regras por projeto (versionadas no repo)

Arquivos criados:

- `.cursor/rules/00-core-workflow.mdc`
- `.cursor/rules/10-typescript-nextjs.mdc`
- `.cursor/rules/20-code-review.mdc`
- `.cursor/rules/30-commit-default.mdc`
- `.cursor/rules/31-commit-emergency-no-verify.mdc`
- `.cursor/rules/40-create-pr.mdc`
- `.github/pull_request_template.md`
- `.cursor/hooks.json`
- `scripts/cursor-hooks/block-dangerous-commands.mjs`
- `scripts/cursor-hooks/warn-secrets-on-commit.mjs`

## 3) Como isso opera na pratica

- As rules padronizam como a IA deve trabalhar no repositorio.
- O template de PR melhora consistencia de descricao e teste.
- Os hooks adicionam guardrails para reduzir risco operacional.

## 3.1) Como acionar no chat

- Code review completo: `Use @code-review e revise minha branch`
- Commit padrao seguro: `Use @30-commit-default e crie um commit atomico`
- Commit emergencia (excecao): `Use @31-commit-emergency-no-verify e commite com no-verify`
- Criar PR com template: `Use @40-create-pr e abra um PR para esta branch`

## 4) Ajustes recomendados para maturidade

- Integrar testes no CI como bloqueio obrigatorio de merge.
- Adotar branch protection com review obrigatorio.
- Evoluir rules por dominio (ex.: `src/app/**`, `prisma/**`).
- Adotar secret scanning no CI como camada obrigatoria (hooks locais nao bastam).
- Tratar hooks do Cursor como guardrail local, nunca como unico controle.

## 5) Do and Don't (onboarding rapido)

### Do
- Use `@30-commit-default` para commits atomicos e seguros.
- Use `@code-review` antes de abrir PR para reduzir retrabalho.
- Use `@40-create-pr` para manter consistencia de descricao e testes.
- Trate alertas de hooks como sinal de risco real e revise o diff.
- Mantenha PRs pequenas, focadas e com plano de teste claro.

### Don't
- Nao usar `--no-verify` como padrao (apenas modo emergencia).
- Nao commitar `.env`, chaves, certificados ou credenciais.
- Nao misturar mudancas nao relacionadas no mesmo commit ou PR.
- Nao ignorar falhas de CI; corrigir antes de solicitar merge.
- Nao usar comandos destrutivos sem aprovacao explicita.
