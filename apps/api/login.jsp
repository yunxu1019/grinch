<script serverside>
    // lock(req.address);
    var fields = refilm`*用户名/name input
    *密码/password password`;
    var { query } = parseURL(req.url);
    try {
        var { name, password } = submit(fields, parseKV(query));
        lock30("login-" + remoteAddress, 3);
        return await _runtask("login", name, password);
    }
    catch (e) {
        forbidden(e);
    }
</script>