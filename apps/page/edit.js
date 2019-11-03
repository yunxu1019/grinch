login();
function main({ fields_ref, fields, item = {}, item_ref }) {
    var page = view();
    page.innerHTML = edit;
    if (!item._rev) {
        item.author = user.name;
    }
    render(page, {
        field,
        btn: button,
        go,
        input,
        isedit: !item._rev,
        user,
        fields: fields || data.from(fields_ref, item._id ? parseFields : function (items) {
            return parseFields(items).filter(a => 'key' in a && !a.is_append);
        }),
        getIcon,
        remove() {
            this.remove.ing = true;
            var data = this.data;
            api("delete", `/grinch/${data._id}?rev=${data._rev}`).success(() => {
                alert("删除成功！");
                this.close();
            }).error(() => {
                this.remove.ing = false;
                alert("删除失败！", "error");
                render.refresh();
            });
        },
        save() {
            var data = this.data;
            if (!data._id) return;
            this.save.ing = true;
            api("put", `/grinch/${data._id}`, data).success(() => {
                alert("保存成功");
                this.isedit = false;
                this.save.ing = false;
                if (!item._rev) {
                    this.close();
                }
                render.refresh();
            }).error(() => {
                alert("保存失败！", "error");
                this.save.ing = false;
                render.refresh();
            });
        },
        getHeight() {
            var fields = this.fields;
            return fromPixel((fields.length > 6 ? 6 : fields.length || 6) * 44 + 32);
        },
        close() {
            remove(page.mask || page);
        },
        data: Object.assign({ _id: user.name + ":" + +new Date, date: +new Date() }, item)
    });
    return page;
}