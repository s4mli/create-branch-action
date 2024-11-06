const core = require("@actions/core");
const github = require("@actions/github");

module.exports = async (context, branch, sha) => {
  const ref = `refs/heads/${branch}`;
  const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
  try {
    const r = await octokit.rest.repos.getBranch({ ...context.repo, branch });
    core.debug(`${r?.data?.name} exists, SHA: ${r?.data?.commit?.sha}`);
    if (branch === r?.data?.name) return false;
  } catch (error) {
    core.debug(`${error.status}: ${error.response?.data?.message}`);
    if (404 === error.status && "HttpError" === error.name) {
      try {
        const r = await octokit.rest.git.createRef({
          ...context.repo,
          sha: sha || context.sha,
          ref,
        });
        core.debug(`${r?.data?.ref} created, SHA: ${r?.data?.object?.sha}`);
        return ref === r?.data?.ref;
      } catch (err) {
        throw err;
      }
    } else {
      throw error;
    }
  }
};
