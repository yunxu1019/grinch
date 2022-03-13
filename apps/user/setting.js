var fields = refilm`
反色/invert switch
灰度/grayscale switch
`;
function main() {
    var page = view();
    page.innerHTML = setting;
    drag.on(page, page.firstChild);
    resize.on(page);
    var profiles = [user];

    renderWithDefaults(page, {
        fields,
        change(f) {
            data.setInstance("setting", this.setting, true);
        },
        profiles,
        setting: data.getInstance("setting"),
        remove() {
            remove(page);
        }
    });
    return page;
}
