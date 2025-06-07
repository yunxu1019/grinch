user.setLoginPath("/user/login");
data.loadConfig("config/api.yml");
user.loadSession().then(async function (session) {
    if (!session) return;
    var api = await data.getApi('login');
    data.setSource(session, api.base);
});
var link = document.createElement('link');
link.rel = "stylesheet";
link.href = "fonts/font-awesome.css";
data.setReporter(function (error) {
    alert(i18n(error));
});
document.documentElement.firstChild.appendChild(link);
zimoli('/frame/main');
if (/efront\.cc$/i.test(location.host)) document.body.appendChild(beian());
// imk();
