# Contributing

## Branch naming

All branches must follow this pattern:

```
type/wids-<issue-number>
```

The `wids-` prefix is always required. Valid types are the same as Conventional Commits types: `fix`, `feat`, `refactor`, `docs`, `chore`, `test`, etc.

Examples:
- `fix/wids-115`
- `feat/wids-103`
- `docs/wids-121`

## Commit convention

All commits must follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type: short description in english
```

Everything must be in English — code, commits, PR titles, branch names, and descriptions.

To link a commit to its issue and automatically close it on merge, add `fixes #<issue-number>` in the commit body:

```
fix: clear cedula validation error state on input change

fixes #115
```

## Opening issues

Every issue body must include an `## Acceptance criteria` section describing what "done" looks like.

## PR flow

1. Create a branch from `main` following the naming convention above
2. Work and commit following the commit convention above
3. Push the branch and open a PR
4. Assign `waldaara` as reviewer — only `waldaara` has bypass permissions to merge into `main`

## CI/CD

Every PR gets a preview deployment automatically. If the build fails, the PR will not be reviewed — fix the build first.
