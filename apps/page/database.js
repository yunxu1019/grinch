function main(item) {
    var page = div();
    page.innerHTML = database;
    render(page, {
        table,
        item,
        model,
        docs: data.from("all-docs", { db_name: item.db_name }),
        fields: data.from("all-docs", { db_name: item.db_name }, function (docs) {
            var map = {};
            docs.rows.forEach(function (doc) {
                if (/^_/.test(doc.id)) return;
                Object.keys(doc.doc).forEach(k => {
                    if (!map[k]) map[k] = true
                });
            });
            return Object.keys(map).map(k => {
                var readonly = /^_/.test(k);
                return {
                    key: k,
                    name: k,
                    readonly,
                    type: readonly ? 'read' : 'text',
                    inlist: !readonly
                }
            });
        }),
        open(item) {
            console.log(item);
            var fields = this.fields;
            zimoli.prepare('/page/edit', function () {

                var page = popup('/page/edit', {
                    item,
                    fields
                });
            })
        },
        action(opt, item) {
        },
        // fields: data.from(fields_ref, function (a) {
        //     var fields = parseFields(a);
        //     return fields;
        // }),
        // model,
        // showContext(event, item) {
        //     event.preventDefault();
        //     this.items.active = item;
        //     var menu = menuList(null, [
        //         {
        //             name: '删除',
        //         }
        //     ], function () {
        //         console.log('active');
        //     });
        //     menu.tabIndex = 0;
        //     on("blur")(menu, e => {
        //         remove(menu);
        //         this.items.active = null;
        //         render.refresh();
        //     });
        //     popup(menu, event);
        //     menu.focus();
        // },
        // edit(item) {
        //     action(action1, { item, fields_ref });
        // },
        // button,
        // items: data.from(data_ref, function (d) {
        //     return d.map(name => data.from("db-info", { name }));
        // })

    });
    on("append")(page, function () {

        data.setInstance("option-buttons", [
            {
                name: "添加",
                icon: 'fa fa-plus',
                modal: {
                    path: '/page/edit',
                    fields: page.$scope.fields
                }
            }
        ]);

    });
    return page;
}