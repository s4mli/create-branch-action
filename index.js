const core = require("@actions/core");
const github = require("@actions/github");
const createBranch = require("./createBranch");

(async () => {
  try {
    let { owner, repo } = github.context.repo;
    const repository = core.getInput("repository");
    if (repository) {
      [owner, repo] = repository.split("/");
    }
    const created = await createBranch({
      owner,
      repo,
      branch: core.getInput("branch"),
      sha: core.getInput("sha") || github.context.sha,
    });
    core.setOutput("created", created ? "true" : "false");
  } catch (error) {
    core.setFailed(error.message);
  }
})();
