var page = view();
login();
function main() {
    page.innerHTML = edit;
    render(page, {
        field,
        btn: button,
        go,
        input,
        save() {
            api("put","/grinch/");
            this.uploading = false;
        },
        close() {
            history.back();
        },
        data: {}
    });
    return page;
}