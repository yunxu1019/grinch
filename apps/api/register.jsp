<script serverside>
    // lock(req.address);
    var fields = refilm`*用户名/username input
    *密码/password password`;
    var { query } = parseURL(req.url);
    if (!query) return textplain(YAML.stringify(fields));
    try {
        var { username, password } = submit(fields, parseKV(query));
        lock30("register-" + remoteAddress);
        return await _runtask("couchdb", "put", `/_users/org.couchdb.user:${username}`, { _id: `org.couchdb.user:${username}`, type: 'user', roles: [], name: username, password });
    }
    catch (e) {
        forbidden(e);
    }
</script>