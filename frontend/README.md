# Clean Contacts Front End

## Prerequisites
- A Linux machine or Linux VM  
  - If you’re on Windows, WSL with Ubuntu is recommended: https://learn.microsoft.com/en-us/windows/wsl/install
- Node.js

## Run in Development Mode

### Install Node.js (via nvm)
Recommended: Node.js **v24.13.0 (LTS)** for Linux using **nvm** with **npm**.

```bash
# Download and install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Load nvm (instead of restarting the shell)
. "$HOME/.nvm/nvm.sh"

# Install Node.js 24 (LTS)
nvm install 24

# Verify versions
node -v   # should print "v24.13.0"
npm -v    # should print "11.6.2"
```

### Clone the repository and navigate to the frontend
```bash
git clone git@github.com:stephenolenchak/team5-contacts-app.git
cd team5-contacts-app/frontend
```

### Start the dev server
```bash
npm install
npm run dev
```

---

## Build for Production

```bash
npm run build
```

Then copy the contents of the `dist/` folder to your web server.