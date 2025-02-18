const tracker = require('@middleware.io/node-apm');
tracker.track({
    serviceName: "js-calculator1",
    accessToken: "snaczyvheqconfmojfldnxfnbtxynkhxxkpy",
    //target: "https://wbnkg_ekd.mw.lc",
    target: "https://4569-103-156-143-126.ngrok-free.app",
    customResourceAttributes: {
        git_commit_sha: "ac4cb8d2c54640fabe039b83433a8484609c829c",
        git_repository_url: "https://github.com/temp-mw/javascript-calculator",
    }
});