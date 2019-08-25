var page = view();
login();
var checkFolder = function () {

};
function main(item) {
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
        getIcon,
        remove() {
            this.remove.ing = true;
            var data = this.data;

            api("delete", `/datalog/${data._id}?rev=${data._rev}`).success(() => {
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
            cross("post", "http://efront.cc:5989/catalog/_find").send({
                "selector": {
                    name: data.name,
                    parentId: data.parentId
                },
                skip: 0,
                limit: 21,
                "sort": [{ 'name': "desc" }]
            }).done( (xhr) =>{
                var items = JSON.parse(xhr.responseText).docs;
                if (items.length) {
                    alert("已存在同名文件夹！", "error");
                    this.save.ing = false;
                    render.refresh();
                    return;
                }
                api("put", `/catalog/${data._id}`, data).success(() => {
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
            }).error(()=>{
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