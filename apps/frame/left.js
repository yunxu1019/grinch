var page = div();
page.innerHTML = left;
render(page, {
    ylist: menu,
    btn: button,
    go,
    user,
    avatar(elem) {
        elem.innerHTML = avatar;
        return elem;
    },
    menus: frame$route,

});
function main() {
    console.log(avatar);
    return page;
}