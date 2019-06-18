
var page = view();
page.innerHTML = login;
var forms = page.querySelectorAll('form');
render(page, {
    go,
    user,
    input,
    field,
    pswd: password,
    button,
    username: user.name || "guest",
    password: "123456",
    request(name, password) {
        var that = this;
        var login = this.login;
        login.ing = true;
        api("_session", {
            name,
            password
        }).success(function (result) {
            login.ing = false;
            user.Login(result).then(function () {
                that.password = "";
                user.setSessionTime(60 * 60 * 1000 * 7 * 24);
                var session = cross.getCookies(config.api_domain);
                user._passport = encode62.encode62(password, session);
                user.saveSession(session);
                page.$reload();
            });
        }).error(function (result) {
            login.ing = false;
            alert.error(i18n(JSON.parse(result).reason));
        });

    },
    login() {
        this.request(this.username || "", this.password || "");
    }
});
page.onsubmit = function () {
    this.$scope.login();
};

window._page2 = page;
var [_username, _password, _loginBtn] = page.children;

function main(args) {
    return page;
}