# create-branch-action

Github action to create branch

## Inputs

### `branch`

**Required** Branch name.

### `sha`

**Optional** SHA.

### `repository`

**Optional** owner/repo.

## Outputs

### `created`

**String** 'true': branch created, 'false': branch exists.

## Example usage

```yaml
uses: s4mli/create-branch-action@v1.0.0
env:
  GITHUB_TOKEN: xxx
with:
  branch: test
```
