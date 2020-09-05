var route = frame$route;
var page = div();
page.innerHTML = top;
renderWithDefaults(page, {
    btn: button,
    user,
    data,
    xbox: vbox,
    options: data.getInstance("option-buttons"),

    open(option) {
        action(option).then(function (page) {
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