var page = div();
once("append")(page, function () {
    zimoli.switch('/', page, '/page/grinch');
    zimoli();
});
user.setLoginPath("/user/login");
api.setBaseUrl("http://efront.cc:5989/", cross);
user.loadSession().then(function (session) {
    if (!session) return;
    cross.addCookie(session, config.api_domain);
    api("get", "_session").success(function (result) {
        if (result.ok && result.userCtx && result.userCtx.name) {
        } else {
            user.Logout();
        }
    }).error(function (error) {
        user.Logout();
        alert.error(JSON.parse(error).reason);
    });
});

function main() {
    return page;
}