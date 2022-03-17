var steps = [
    refilm`*用户名/username input ${function (a) {
        if (/^_/.test(a)) {
            return "不能以下划线开头";
        }
    }}`,
    refilm`
    $用户名/username text
    *设置密码/password password`,
    refilm`
    $用户名/username text
    *确认密码/password1 password`,
    refilm`
    $用户名/username text
    / success //注册完成！`,
]
function main() {
    var page = view();
    page.innerHTML = template;

    page.setAttribute("ng-src", "[steps[index],data]");
    renderWithDefaults(page, {
        steps,
        data: {},
        _index: 0,
        get index() {
            return this._index;
        },
        set index(v) {
            if (v > this._index) submit(steps[this._index], this.data);
            if (this._index === 0) {
                if (!this.data.username) return;
            }
            this._index = v;
        },
        async register() {
            submit(steps[this._index], this.data);
            if (this.data.password1 !== this.data.password) {
                alert("两次输入的密码不一致！");
                return;
            }
            var { username, password } = this.data;
            await data.from("register", { username, password });
            this.index++;
        },
        remove() {
            remove(page);
        }
    });
    on('mounted')(page, function () {
        page.querySelector("input").focus();
    });
    drag.on(page.firstChild, page);
    resize.on(page);
    return page;
}