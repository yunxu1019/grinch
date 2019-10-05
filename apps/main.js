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
var link = document.createElement('link');
link.rel = "stylesheet";
link.href = "fonts/font-awesome.css";
data.loadConfig("config/api.json");
document.documentElement.firstChild.appendChild(link);
zimoli('/frame/main');
// imk();