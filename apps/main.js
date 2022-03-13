user.setLoginPath("/user/login");
api.setBaseUrl("http://efront.cc:5989/", cross);
user.loadSession().then(function (session) {
    if (!session) return;
    cross.addCookie(session, config.api_domain);
    data.from("session").then(function (result) {
        if (result.ok && result.userCtx && result.userCtx.name) {
        } else {
            user.Logout();
        }
    }, function (error) {
        user.Logout();
        alert.error(JSON.parse(error).reason);
    });
});
var link = document.createElement('link');
link.rel = "stylesheet";
link.href = "fonts/font-awesome.css";
data.loadConfig("config/api.yml");
data.setReporter(function (error) {
    alert(i18n(error));
});
document.documentElement.firstChild.appendChild(link);
zimoli('/frame/main');
if (/efront\.cc$/i.test(location.host)) document.body.appendChild(beian());
// imk();