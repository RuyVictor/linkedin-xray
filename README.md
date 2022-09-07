<h1 align="center">
    Linkedin X-Ray
</h1>

# Project

Get all the profile information of anyone without needing an API key.

# Getting Started

## Setup

To run this project, install it locally using npm or yarn:

```js
npm i linkedin-xray
// or "yarn add linkedin-xray"
```

If you deploy your application to some debian-based linux server, install the following dependencies:

Step 1 - In terminal:

```console
sudo apt-get update

sudo apt-get install -y libgbm-dev

sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

Step 2 - in the root folder of the project run the following command:

Windows:

```console
npm config set puppeteer_product=firefox
npm i puppeteer
# or yarn add puppeteer

if you have Git Bash:
PUPPETEER_PRODUCT=firefox npm i puppeteer
# or PUPPETEER_PRODUCT=firefox yarn add puppeteer
```

Linux:

```
PUPPETEER_PRODUCT=firefox npm i puppeteer
# or PUPPETEER_PRODUCT=firefox yarn add puppeteer
```

## Usage

```js
import { LinkedinXray } from "linkedin-xray";

try {
  const linkedinXray = new LinkedinXray();
  const profileUrl = "https://www.linkedin.com/in/[your user id]";
  const result = await linkedinXray.getInfo({ profileUrl });
  console.log(result);
} catch (error) {
  console.error(error);
}
```

# Technologies

- Puppeteer
- JSDOM
- NodeJS
