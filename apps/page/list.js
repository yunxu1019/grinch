function main(args) {
    var page = div();
    page.innerHTML = template;
    var params = extend({}, args);
    for (var k in params) {
        if (/\_ref$/i.test(k)) delete params[k];
    }
    render(page, {
        lattice,
        item,
        params,
        popup,
        edit(item) {
            var {
                edit_ref,
                fields_ref,
            } = args;
            popup("#/page/edit", {
                actionId: edit_ref,
                fields_ref,
                item
            });
        },
        padding,
        items: data.from(args.data_ref, params)
    })
    console.log(list, args, page.$scope);
    return page;
}