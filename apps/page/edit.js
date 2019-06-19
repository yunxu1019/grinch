var page = view();
login();
function main(item) {
    page.innerHTML = edit;
    render(page, {
        field,
        btn: button,
        go,
        input,
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
            api(data._rev ? "post" : "put", `/grinch/${data._id}`, data).success(() => {
                alert("保存成功");
                this.close();
            }).error(() => {
                alert("保存失败！", "error");
                this.save.ing = false;
                render.refresh();
            });
        },
        close() {
            remove(page.mask);
        },
        data: Object.assign({ _id: user.name + ":" + +new Date, date: +new Date() }, item)
    });
    return page;
}