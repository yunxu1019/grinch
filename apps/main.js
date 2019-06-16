var page = div();
once("append")(page, function () {
    zimoli.switch('/', page, '/page/grinch');
    zimoli();
});
user.setLoginPath("/user/login");
api.setBaseUrl("http://efront.cc:5989/", cross);
function main() {
    return page;
}