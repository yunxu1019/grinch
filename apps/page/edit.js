
function checkField(data, field) {
    delete field.errored;
    if (field.is_required && isEmpty(data[field.key])) {
        field.errored = 'required';
    }
    return !!field.errored;
}

function uploadDistinct(file) {
    var dist = `/@/data/grinch/` + file.url.replace(/^[\s\S]*?([\w\-]+)$/, "$1");
    var promise = new Promise(function (ok, oh) {
        var xhr = new XMLHttpRequest;
        xhr.open("put", dist);
        xhr.send(file);
        xhr.onerror = oh;
        file.percent = "0%";
        if (xhr.upload) xhr.upload.onprogress = function (event) {
            var { total, loaded } = event;
            file.percent = (loaded / total * 100).toFixed(2) + "%";
            render.refresh();
        };
        xhr.onload = function () {
            delete file.percent;
            ok(dist);
        };
    });
    return promise;
}

model.setModels({
    icon: iconholder,
});

function main({ fields_ref, fields, item, params, actionId, title }) {
    var page = view(document.createElement("我能想到最浪漫的事_就是和你一起慢慢变老"));
    var has_rev = !!item;
    if (!item) item = Object.assign({}, params);
    var editField = false;

    page.innerHTML = edit;
    if (!item._rev) {
        item.author = user.name;
    }
    page.renders = [function () {
        var fields = this.querySelectorAll("field");
        var valid = page.$scope.valid;
        for (var cx = 0, dx = fields.length; cx < dx; cx++) {
            var field = fields[cx];
            var m = field.querySelector("model");
            if (m && m.valid === false) {
                valid = false;
                break;
            }
        }
        if (cx === dx) valid = true;
        if (valid !== page.$scope.valid) {
            page.$scope.valid = valid;
            render.refresh();
        }
    }];

    resize.on(page);
    drag.on(page.children[0], page);
    drag.on(page.children[1], page);
    render(page, {
        field,
        btn: button,
        go,
        title,
        input,
        _isedit: !has_rev,
        get isedit() {
            return this._isedit;
        },
        set isedit(a) {
            this._isedit = a;
            this.keepPosition();
        },
        has_rev,
        user,
        action,
        model,
        item,
        valid: false,
        keepPosition() {
            var p = move.getPosition(page);
            setTimeout(function () {
                move.setPosition(page, p);
            });
        },
        fields: fields || data.from(fields_ref, item._id ? parseFields : function (fields) {
            fields = parseFields(fields);
            fields = has_rev ? fields : fields.filter(a => 'key' in a && !a.is_append);
            fields = fields.filter(a => a.is_inform !== false);
            return fields;
        }),
        getIcon,
        yscroll() {
            var s = scrollbar('y');
            var body = this.body;
            once('append')(body, lazy(() => {
                s.bindTarget(body);
                css(s, {
                    right: "6px",
                    top: 0,
                    bottom: 0,
                    background: "transparent",
                    zIndex: 1,
                    width: '4px',
                    height: 'auto'
                });
                css(s.children[0], {
                    opacity: .7
                });
                var a = on("resize")(page, function () {
                    s.reshape();
                });
                on("remove")(s, a);
            }));
            return s;
        },
        remove() {
            if (!this.remove.confirm) {
                this.remove.confirm = true;
                setTimeout(() => {
                    this.remove.confirm = false;
                    render.digest();
                }, 1200);
                return;
            }
            this.remove.ing = true;
            var item = this.data;
            console.log(item);
            data.from("del-item", {
                _id: item._id,
                rev: item._rev,
                type: params && params.type
            }).loading_promise.then(() => {
                alert("删除成功！");
                dispatch(page, "submitted");
                this.close();
            }, () => {
                this.remove.ing = false;
                render.refresh();
            });
        },
        editField(f) {
            if (!editField) return;
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
                });

            });
        },
        login(callback) {
            if (user.isLogin) return callback.call(this);
            var that = this;
            callback.ing = true;
            zimoli.prepare("/user/login", function () {
                var p = popup("#/user/login");
                on("remove")(p, function () {
                    callback.ing = false;
                    if (user.isLogin) return callback.call(that);
                });
            })
        },
        async save() {
            var error_Fields = this.fields.filter(checkField);
            if (
                error_Fields.length > 0
            ) {
                return;
            }
            if (!this.valid) return;
            if (!user.isLogin) return;

            this.save.ing = true;
            var item = this.data;
            for (var k in item) {
                var f = item[k];
                if (f instanceof window.File) {
                    try {
                        item[k] = await uploadDistinct(f);
                        URL.revokeObjectURL(f.url);
                    } catch (e) {
                        alert(String(e));
                        return;
                    }
                }
            }
            var params = getParams(this.data, fields);
            if (!params._id) params._id = user.name + ":" + (+new Date);
            params.date = +new Date;
            params.author = user.name;
            if (!actionId) {
                this.close();
                extend(item, params);
                dispatch(page, "submitted");
                return;
            }
            var res = data.from(actionId, params);
            res.loading_promise.then(() => {
                this.save.ing = false;
                if (res.is_errored) return;
                dispatch(page, 'submitted');
                var { $scope } = page;
                if (!this.has_rev) {
                    this.close();
                    render.refresh();
                } else if (res.rev) {
                    $scope.data._rev = res.rev;
                    extend($scope.item, $scope.data);
                }
                $scope.isedit = false;
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
        data: extend({ date: +new Date }, item)
    });
    Promise.resolve(page.$scope.fields.loading_promise).then(function () {
        setTimeout(function () {
            move.setPosition(page, [.5, .5]);
        }, 20);
    });
    return page;
}