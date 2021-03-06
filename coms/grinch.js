"use strict";
var http = require("http");
var _URL = require("url");
var jsdom = require("jsdom");
var cross = function (method, url, data) {
    return new Promise(function (ok, oh) {
        var _a = _URL.parse(url), hostname = _a.hostname, port = _a.port, pathname = _a.pathname;
        var req = http.request({
            headers: {
                "content-type": "application/json"
            },
            method: method, hostname: hostname, port: port, path: pathname
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
    var _this = this;
    var cx = 0;
    return new Promise(function (ok) {
        var run = function () {
            if (cx >= _this.length)
                return ok();
            var item = _this[cx++];
            f(item).then(run)["catch"](run);
        };
        run();
    });
};
module.exports = function grinch() {
    return cross("post", "http://efront.cc:5989/grinch/_find", {
        "selector": {},
        skip: 0,
        limit: 21,
        "sort": [{ 'date': "desc" }]
    }).then(function (data) {
        var items = JSON.parse(data).docs;
        return queue.call(items, function (item) {
            return jsdom.JSDOM.fromURL(item.url, {
                userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            });
        });
    }).then(function () {
        return new Date();
    });
};
