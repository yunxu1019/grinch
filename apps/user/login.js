
function main(args) {
    var page = view();
    page.innerHTML = login;
    page.renders = [function () {
        if (user.isLogin) {
            if (this.$reload instanceof Function) this.$reload();
            else remove(this);
        }
    }];
    autofocus(page);
    page.dragHandle = page.firstChild;
    renderWithDefaults(page, {
        go,
        user,
        input,
        fields: refilm`
        *用户名/username input
        *密码/password password
        `,
        field,
        popup,
        pswd: password,
        button,
        data: {
            username: user.name || "",
            password: "",
        },
        async login() {
            var { username, password } = submit(this.fields, this.data);
            var result = await data.from("login", { name: username, password });
            var api = await data.getApi('login');
            await user.Login(result).then(async () => {
                this.password = "";
                user.setSessionTime(60 * 60 * 1000 * 7 * 24);
                var session = cross.getCookies(api.base);
                var item = await data.getApi('session');
                cookie.linkCookie(api.base, item.base);
                user._passport = encode62.encode62(password, session);
                user.saveSession(session);
                dispatch(page, 'submitted');
            });
        },
        close() {
            history.back();
        }
    });
    window._page2 = page;
    var [_username, _password, _loginBtn] = page.children;
    return page;
}