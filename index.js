const core = require("@actions/core");
const github = require("@actions/github");
const createBranch = require("./createBranch");

(async () => {
  try {
    const created = await createBranch(
      github.context,
      core.getInput("branch"),
      core.getInput("sha")
    );
    core.setOutput("created", created ? "true" : "false");
  } catch (error) {
    core.setFailed(error.message);
  }
})();
