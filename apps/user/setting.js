login();
function main() {
    var page = div();
    page.innerHTML = setting;
    render(page, {
        btn: button,
        user,
        logout() {
            user.Logout().then(function () {
                page.$reload();
            });
        },
    });
    return page;
}
