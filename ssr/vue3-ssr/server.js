const path = require("path");
const express = require("express");
const fs = require("fs");
const { renderToString } = require("@vue/server-renderer");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const isDev = process.env.NODE_ENV === "development";
const port = isDev ? 8080 : 3000;

const build = async () => {
  const { stdout } = await exec("yarn build");
  console.log(stdout);
  console.log("build success");
};

function bootstrap() {
  const server = express();
  const manifest = require("./dist/server/ssr-manifest.json");

  const appPath = path.join(__dirname, "./dist", "server", manifest["app.js"]);
  const createApp = require(appPath).default;

  server.use(
    "/img",
    express.static(path.join(__dirname, "./dist/client", "img"))
  );
  server.use(
    "/js",
    express.static(path.join(__dirname, "./dist/client", "js"))
  );
  server.use(
    "/css",
    express.static(path.join(__dirname, "./dist/client", "css"))
  );
  server.use(
    "/favicon.ico",
    express.static(path.join(__dirname, "./dist/client", "favicon.ico"))
  );

  server.get("*", async (req, res) => {
    const { app } = createApp();
    let html = fs.readFileSync(
      path.join(__dirname, "/dist/client/index.html"),
      "utf-8"
    );
    const appContent = await renderToString(app);
    html = html
      .toString()
      .replace('<div id="app">', `<div id="app">${appContent}`);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });

  console.log(`You can navigate to http://localhost:${port}`);

  server.listen(port);
}

async function start() {
  if (isDev) {
    await build();
  }
  bootstrap();
}

start();
