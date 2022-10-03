var route = frame$route;
var page = document.createElement("孤灯提单刀_漂泊我自傲_随心江湖江_问天何时尽");
page.innerHTML = top;
renderWithDefaults(page, {
    btn: button,
    user,
    data,
    xbox: vbox,
    searchbox,
    render,
    searchText: data.getInstance("search-text"),
    search(params) {
        data.setInstance("search-text", params);
    },
    login() {
        zimoli.prepare("/user/login", function () {
            var page = popup("#/user/login");
            on('submitted')(page, function () {
                remove(this);
            })
        });
    },
    options: data.getInstance("option-buttons"),

    open(option, params) {
        action(option, null, params).then(function (page) {
            if (isNode(page)) {
                on("submitted")(page, function () {
                    route.reload();
                });
            }
        });
    },
    home() {
        zimoli.go(route[0])
    },
    logout() {
        user.Logout();
    },
    fullscreen,
    alert,
    route,
    input() {
        return input();
    },
    switchMenu() {
        page.parentNode.switchLeft();
    }
})
var isOpend = false;
var mouseover = function () {
};
page.querySelectorAll("menu-item");
function main() {
    return page;
}