// const Sentry = require("@sentry/node");
// Sentry.init({
//     dsn: "https://c3a8ab0d34d54ccea8a26fe8d999b3bb@o4505073321312256.ingest.us.sentry.io/4505073327800320",
// });

const tracker = require('@middleware.io/node-apm');
// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
tracker.track({
    serviceName: "js-calculator2",
    accessToken: "snaczyvheqconfmojfldnxfnbtxynkhxxkpy",
    //target: "https://wbnkg_ekd.mw.lc",
    target: "https://4ef8-103-156-143-126.ngrok-free.app",
    customResourceAttributes: {
        git_commit_sha: "ac4cb8d2c54640fabe039b83433a8484609c829c",
        git_repository_url: "https://github.com/temp-mw/javascript-calculator",
    }
});