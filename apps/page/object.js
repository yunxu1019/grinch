var route = frame$route;

function main(args) {
    if (!args) return;
    var { data_ref, fields_ref, action: action1, roles } = args;
    if (!data_ref || !fields_ref) throw new Error('参数不正确!');
    console.log(data_ref)
    var page = div();
    page.innerHTML = object;
    once("append")(page, function () {
        render(this, {
            table,
            action(opt, item) {
                action(opt, item).then(function (pg) {
                    if (isNode(pg)) {
                        on("submitted")(pg, e => route.reload());
                    } else if (pg instanceof Object) {
                        if (!pg.errored) {
                            route.reload();
                        }
                    }
                })
            },
            optionalFields: data.from(fields_ref, parseFields),
            fields: data.from(fields_ref, function (a) {
                var fields = parseFields(a);
                return fields;
            }),
            model,
            showContext(event, item) {
                event.preventDefault();
                this.items.active = item;
                var menu = menuList(null, [
                    {
                        name: '删除',
                    }
                ], function () {
                    console.log('active');
                });
                menu.tabIndex = 0;
                on("blur")(menu, e => {
                    remove(menu);
                    this.items.active = null;
                    render.refresh();
                });
                popup(menu, event);
                menu.focus();
            },
            edit(item) {
                action(action1, extend({}, item));
            },
            button,
            items: data.from(data_ref, function (d) {
                return d.map(name => data.from("db-info", { name }));
            })
        });
    });
    page.roles = roles;
    return page;
}