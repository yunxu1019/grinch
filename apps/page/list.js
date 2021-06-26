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
            zimoli.prepare("/page/edit", function () {
                var {
                    edit_ref,
                    fields_ref,
                } = args;
                var page = popup("#/page/edit", {
                    actionId: edit_ref,
                    fields_ref,
                    params: args,
                    item
                });
                on("submited")(page, function () {
                    page.$reload();
                });
            })
        },
        padding,
        items: data.from(args.data_ref, params)
    })
    return page;
}