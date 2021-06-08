function main({ item }) {
    console.log(item);
    item.fields = [];
    var page = view();
    resize.on(page);
    page.innerHTML = field;
    page.dragHandle = page.firstChild;
    render(page, {
        design() {
            return design(this.item.fields);
            // console.log(design())
        },
        submit() {
            console.log(item);
        },
        item,
        input,
        field: zimoli$field,
        remove() {
            remove(page);
        },
        btn: button
    })
    //  design([]);

    return page;
}