login(["_admin"]);


function main({ data_ref, fields_ref } = {}) {
    if (!data_ref || !fields_ref) throw new Error('参数不正确!');
    var page = div();
    page.innerHTML = object;
    render(page, {
        table,
        optionalFields: data.from(fields_ref, parseFields),
        fields: data.from(fields_ref, function (a) {
            var fields = parseFields(a);
            console.log(fields);
            return fields;
        }),
        edit(item) {
            popup('/page/edit', { item, fields_ref });
        },
        button,
        items: data.from(data_ref, function (d) {
            return d.map(name => data.from("db-info", { name }));
        })
    });
    return page;
}