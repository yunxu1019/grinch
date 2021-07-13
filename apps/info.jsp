<script serverside>
    new Promise(function (ok, oh) {
        var socket = (req.connection || req.socket || req.connection.socket);
        ok(YAML.stringify({
            "你的地址": socket.remoteAddress,
            "你的端口": socket.remotePort,
            "服务器地址": socket.localAddress,
            "服务器端口": socket.localPort,
            "请求方法": req.method,
            "请求路径": req.url,
            "请求头": req.headers,
        }));
    });
</script>