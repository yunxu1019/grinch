login();
function main() {
    var page = div();
    page.innerHTML = setting;
    var profiles=[user];
    renderWithDefaults(page, {
        user,
        profiles,
        logout() {
            user.Logout().then(function () {
                page.$reload();
            });
        },
    });
    return page;
}
