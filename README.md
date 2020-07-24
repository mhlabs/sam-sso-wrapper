## sam-sso-wrapper

Thin CLI client that lets you use sam-cli with AWS Single Sign-On and with your configured AWS profiles.

### Usage:
```
sam-sso [args to pass on to sam-cli] --profile <profileName> 
```

Example:
```
sam-sso deploy --guided --profile test 
``` 

If the --profile flag is omitted, your default profile is used
If the --profile flag is included you will get prompted with a list of your configured profiles:
![Demo](https://raw.githubusercontent.com/mhlabs/sam-sso-wrapper/master/images/example-profiles.gif)

### Using alias
In your ~/.bashrc (or your OS equivalent), add the following:
```
export SAM_BIN_PATH=/home/linuxbrew/.linuxbrew/bin/sam  # Or where your sam-cli binary is located
alias sam='sam-sso'
```

This lets you use standard sam-cli operations with SSO auth:
![Demo](https://raw.githubusercontent.com/mhlabs/sam-sso-wrapper/master/images/example-alias.gif)


