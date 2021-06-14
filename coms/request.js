var http = require("http");
var zlib = require("zlib");
var https = require("https");
var http2 = require("http2");
var get = function (url) {
    var info = parseURL(url);
    return new Promise(function (ok, oh) {
        http.request({
            method: "get",
            server: info.host || "localhost",
            path: info.path || '',
        }, function (res) {
            var buffs = [];
            res.on("error", oh);
            res.on('data', function (data) {
                buffs.push(data);
            });
            res.on("end", function () {
                var d = Buffer.concat(buffs);
                d = zlib.gunzipSync(d);
                ok(d.toString());
            })
        }).end('');
    });
}
var urllist = [];
var request = async function (root) {
    var res = await get(root);
    var reg = /(https?\:|\/)[^,\\\^\\s\<\>\[\]\(\)\#\`\'\"\;]+/g;
    do {
        var r = reg.exec(res);
        if (!r) break;
        var m = r[0];
        if (/\}/.test(m) && !/\{/.test(m)) continue;
        saveToOrderedArray(urllist, m);
        console.log(m);
    } while (true);
};
