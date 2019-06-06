var http = require("http");
var URL = require("url");
var cross = function (method, url, data) {
    return new Promise(function (ok, oh) {
        var { hostname, port, pathname } = URL.parse(url);
        var req = http.request({
            headers: {
                "content-type": "application/json"
            },
            method, hostname, port, path: pathname
        }, function (res) {
            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on("error", oh);
            res.on('close', function () {
                ok(Buffer.concat(chunks).toString());
            });
        });
        req.once("error", oh);
        req.end(data instanceof Object ? JSON.stringify(data) : data);
    });
};
var queue = function (f) {
    var cx = 0;
    var run = () => {
        if (cx >= this.length) return;
        var item = this[cx];
        cx++;
        f(item).then(run);
    };
    run();
}
function grinch() {
    return cross("post", "http://efront.cc:5989/grinch/_find", {
        "selector": {
        },
        skip: 0,
        limit: 21,
        "sort": [{ 'date': "desc" }]
    }).then(function (data) {
        var items = JSON.parse(data).docs;
        queue.call(items, function (item) {
            return cross("get", item.url);
        });
        return new Date();
    });
}