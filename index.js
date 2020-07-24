#!/usr/bin/env node
const program = require("commander");
const ssoAuth = require("@mhlabs/aws-sso-client-auth");
const inquirer = require('inquirer');
const { spawn } = require("child_process");
const prompt = inquirer.createPromptModule();

program.version("0.0.3", "-v, --vers", "output the current version");
program
  .option("-p, --profile [profile]", "AWS profile to use")
  .allowUnknownOption(true)
  .action(async (cmd) => {
    let profile = cmd.profile;
    if (cmd.profile === true) {
      const answer = await prompt({
        name: "id",
        type: "list",
        message: "Select profile",
        choices: await ssoAuth.listProfiles(),
      });
      profile = answer.id;
    }
    const creds = await ssoAuth.requestAuth("sam", profile);
    process.env.AWS_ACCESS_KEY_ID = creds.credentials.accessKeyId;
    process.env.AWS_SECRET_ACCESS_KEY = creds.credentials.secretAccessKey;
    process.env.AWS_SESSION_TOKEN = creds.credentials.sessionToken;
    process.env.AWS_REGION = creds.region;
    process.env.AWS_DEFAULT_REGION = creds.region;

    const sink = spawn(process.env.SAM_BIN_PATH || "sam", cmd.args, {
      stdio: [process.stdin, process.stdout, process.stderr],
    });
});

program.parse(process.argv);
