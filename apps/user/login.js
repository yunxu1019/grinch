
function main(args) {
    var page = view();
    page.innerHTML = login;
    var forms = page.querySelectorAll('form');
    page.renders = [function () {
        if (user.isLogin) {
            if (this.$reload instanceof Function) this.$reload();
            else remove(this);
        }
    }];
    page.dragHandle = page.firstChild;
    render(page, {
        go,
        user,
        input,
        field,
        pswd: password,
        button,
        username: user.name || "",
        password: "",
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
                    dispatch(page, 'submitted');
                });
            }).error(function (result) {
                login.ing = false;
                alert.error(i18n(JSON.parse(result).reason));
            });

        },
        login() {
            if (this.login.ing) return;
            this.request(this.username || "", this.password || "");
        },
        close() {
            history.back();
        }
    });


    on("submit")(page, function (e) {
        e.preventDefault();
    });
    on("keydown")(page, function (e) {
        if (e.which === 13) {
            this.$scope.login();
        }
    });
    window._page2 = page;
    var [_username, _password, _loginBtn] = page.children;
    return page;
}