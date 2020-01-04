var http2 = require("http");
var server = http2.createServer(function (req, res) {
    console.log(req.method);
    res.end("ok");
})
server.on('error', function () {
    console.error("启动失败！");
});
server.on("listening", function () {
    var { port } = server.address();
    var url = `http://127.0.0.1:${port}`;
    console.info(`服务器已启动 ${url}\r\n`);
});
server.listen(process.env.http_port || 2019);