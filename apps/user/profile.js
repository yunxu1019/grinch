login();
var fields = refilm`
用户名/name input
头像/avatar icon
角色/roles  multi-select
`;
model.setModels({
    'icon': iconholder
})
function main() {
    var page = view();
    page.innerHTML = template;
    renderWithDefaults(page, {
        user,
        fields,
        async logout() {
            await data.from("logout");
            user.Logout().then(function () {
                page.$reload();
            });
        },
        remove(){
            remove(page);
        }
    });
    console.log(page.$scope)
    drag.on(page, page.firstChild);
    resize.on(page);
    return page;
}