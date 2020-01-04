
login();
function checkField(data, field) {
    delete field.errored;
    if (field.is_required && isEmpty(data[field.key])) {
        field.errored = 'required';
    }
    return !!field.errored;
}
function main({ fields_ref, fields, item, params, actionId, title }) {
    var page = view();
    var has_rev = !!item;
    if (!item) item = Object.assign({}, params);

    page.innerHTML = edit;
    if (!item._rev) {
        item.author = user.name;
    }
    page.renders = [function () {
        setTimeout(e => {
            var fields = this.querySelectorAll("field");
            var valid = page.$scope.valid;
            for (var cx = 0, dx = fields.length; cx < dx; cx++) {
                var field = fields[cx];
                var m = field.querySelector("model");
                if (m && m.valid === false) {
                    valid = false;
                    break;
                };
            }
            if (cx === dx) valid = true;
            if (valid !== page.$scope.valid) {
                page.$scope.valid = valid;
                render.refresh();
            }
        });
    }];

    render(page, {
        field,
        btn: button,
        go,
        title,
        input,
        isedit: !has_rev,
        has_rev,
        user,
        action,
        model,
        valid: false,
        fields: fields || data.from(fields_ref, item._id ? parseFields : function (fields) {
            fields = parseFields(fields);
            fields = has_rev ? fields : fields.filter(a => 'key' in a && !a.is_append);
            fields = fields.filter(a => a.is_inform !== false);
            return fields;
        }),
        getIcon,
        remove() {
            this.remove.ing = true;
            var item = this.data;
            api("delete", `/grinch/${item._id}?rev=${item._rev}`).success(() => {
                alert("删除成功！");
                this.close();
            }).error(() => {
                this.remove.ing = false;
                alert("删除失败！", "error");
                render.refresh();
            });
        },
        editField(f) {
            var newField = extend({}, f);
            var $scope = page.$scope;
            action({
                modal: {
                    path: '/page/edit',
                    fields: [
                        {
                            name: "字段名",
                            key: "key",
                        },
                        {
                            name: "显示名",
                            key: "name",
                        }
                    ],
                    item: newField
                }
            }).then(function (modal) {
                on("submitted")(modal, function () {
                    if (!deepEqual.shallow(newField, f)) {
                        var data = $scope.data;
                        var value = data[f.key];
                        delete data[f.key];
                        data[newField.key] = value;
                        var index = $scope.fields.indexOf(f);
                        $scope.fields = fields.slice(0);
                        $scope.fields.splice(index, 1, newField);
                    }
                })

            });
        },
        save() {
            var error_Fields = this.fields.filter(checkField);
            if (
                error_Fields.length > 0
            ) {
                return;
            }
            if (!this.valid) return;

            this.save.ing = true;
            var params = getParams(this.data, fields);
            if (!actionId) {
                this.close();
                extend(item, params);
                dispatch(page, "submitted");
                return;
            }
            var res = data.from(actionId, params).loading_promise.then(() => {
                this.save.ing = false;
                if (res.is_errored) return;
                if (!this.has_rev) {
                    this.close();
                    render.refresh();
                }
                dispatch(page, 'submitted');
            }).catch((e) => {
                this.save.ing = false;
                alert(String(e.reason), 'error');
            });
            // api("put", `/grinch/${item._id}`, item).success(() => {
            //     alert("保存成功");
            //     this.isedit = false;
            //     this.save.ing = false;
            //     if (!item._rev) {
            //         this.close();
            //     }
            //     render.refresh();
            // }).error(() => {
            //     alert("保存失败！", "error");
            //     this.save.ing = false;
            //     render.refresh();
            // });
        },
        getHeight() {
            var fields = this.fields;
            return fromPixel((fields.length > 6 ? 6 : fields.length || 0) * 44 + 32);
        },
        close() {
            remove(page.mask || page);
        },
        data: extend({ _id: user.name + ":" + +new Date, date: +new Date() }, item)
    });
    console.log(page.renders);
    return page;
}