---
description: Review changes, stage, craft a conventional commit, and push to GitHub
---

Follow these steps in order. Do NOT skip any step.

1. Check the current branch and remote tracking status.
// turbo
```
git status -sb
```

2. Review unstaged and staged changes to understand what was modified.
// turbo
```
git diff --stat
git diff
git diff --staged
```

3. Analyze the diff and classify the change type using Conventional Commits:
   - `feat`: a new user-facing feature
   - `fix`: a bug fix
   - `chore`: tooling, deps, configs, non-functional maintenance
   - `refactor`: code restructure without behavior change
   - `docs`: documentation only
   - `style`: formatting, no logic change
   - `test`: adding or fixing tests
   - `perf`: performance improvement
   - `build` / `ci`: build system or CI changes

4. Determine an appropriate scope (optional) based on the top-level folder touched
   (e.g. `client`, `backend`, `auth`, `notes`). If multiple unrelated areas changed,
   consider splitting into multiple commits instead.

5. Stage the relevant files. Prefer `git add -A` only if all changes belong to the
   same logical commit; otherwise stage selectively.
```
git add -A
```

6. Craft the commit message in this exact format:
   ```
   <type>(<scope>): <short imperative summary, <=72 chars, lowercase, no period>

   <body: what & why, wrapped at ~72 cols. Reference files/functions when useful.>
   ```
   Rules:
   - Summary uses the imperative mood ("add", not "added").
   - Always include a body unless the change is truly trivial (typo, rename).
   - Do NOT include co-author or AI-generated tags unless the user asks.

7. Show the proposed commit message to the user for confirmation before committing.

8. Create the commit.
```
git commit -m "<type>(<scope>): <summary>" -m "<body>"
```

9. Push to the current branch's upstream. If no upstream is set, set it.
// turbo
```
git push || git push -u origin HEAD
```

10. Report back with the commit hash and the push result.
// turbo
```
git log -1 --oneline
```
