var page = div();
page.innerHTML = top;
render(page, {
    btn: button,
    user,
    options: data.getInstance("option-buttons"),
    open(option) {
        if (option.do instanceof Function) {
            option.do();
            return;
        }
        if (option.path) {
            popup(option.path, option.data);
        }
    },
    logout() {
        user.Logout();
    },
    fullscreen,
    alert,
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