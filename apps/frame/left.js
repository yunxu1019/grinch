var page = div();
page.innerHTML = left;
if (!user.avatar) user.avatar = "user/avatar.png";
render(page, {
    ylist: menu,
    btn: button,
    go,
    user,
    avatar,
    popup,
    menus: frame$route,

});
function main() {
    console.log(avatar);
    return page;
}