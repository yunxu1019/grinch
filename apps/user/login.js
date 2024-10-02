
function main(autoclose) {
    var page = view();
    page.innerHTML = login;
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
            var result = await data.from("login", { uid: username, a: encode62.timeencode(encode62.geta(password)) });
            var api = await data.getApi('login');
            data.setSource(api.base, { authorization: result })
            await user.Login(result).then(async () => {
                this.password = "";
                user.setSessionTime(60 * 60 * 1000 * 7 * 24);
                var session = data.getSource(api.base);
                user.name = username;
                user.saveSession(session);
                dispatch(page, 'submitted');
            });
            if (autoclose || !page.$reload) remove(page);
            else page.$reload();
        },
        close() {
            history.back();
        }
    });
    window._page2 = page;
    var [_username, _password, _loginBtn] = page.children;
    return page;
}