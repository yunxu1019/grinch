var page = div();
page.innerHTML = left;
render(page, {
    ylist: menu,
    checkroles(menu) {
        var res = checkroles(user.roles, menu.roles);
        return res;
    },
    btn: button,
    go,
    user,
    check(item, checked) {
        while (item.parent) {
            item.checked = checked;
            item = item.parent;
        }

    },
    open(event) {
        var item = event.item;
        var { value } = item;
        if (!value || !value.path) return;
        if (this.currentMenu) {
            this.check(this.currentMenu, false);
        }
        this.currentMenu = item;
        this.check(item, true);
        zimoli.go(value.path, value.data);
    },
    menus: data.fromURL('config/menus.json'),
});
function main() {
    return page;
}