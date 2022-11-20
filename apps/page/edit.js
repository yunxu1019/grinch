
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
    var page = document.createElement("我能想到最浪漫的事_就是和你一起慢慢变老");
    page.innerHTML = edit;
    page = view(page);
    var has_rev = !!item;
    if (!item) item = Object.assign({}, params);
    var editField = false;

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
        if (this.scrollbar) this.scrollbar.reshape();
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
            for (var k in this.data) delete this.data[k];
            extend(this.data, item);
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
            requestAnimationFrame(function () {
                move.setPosition(page, p);
            });
        },
        fields: fields || data.from(fields_ref, item._id ? parseFields : function (fields) {
            fields = parseFields(fields);
            fields = has_rev ? fields : fields.filter(a => 'key' in a && !a.readonly);
            fields = fields.filter(a => a.inform !== false);
            return fields;
        }),
        getIcon,
        yscroll() {
            var s = scrollbar('y');
            var body = this.body;
            once('append')(body, lazy(() => {
                s.bindTarget(body, page);
                css(s, {
                    right: "6px",
                    top: 0,
                    bottom: 0,
                    background: "transparent",
                    zIndex: 2,
                    height: 'auto'
                });
                css(s.children[0], {
                    opacity: .7
                });
                page.scrollbar = s;
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
        async login(callback) {
            var item = submit(this.fields, this.data);
            if (user.isLogin) return callback.call(this, item);
            var that = this;
            callback.ing = true;
            var p = await popup("#/user/login");
            on("remove")(p, function () {
                callback.ing = false;
                render.refresh();
                if (user.isLogin) return callback.call(that, item);
            });
        },
        async save(item) {
            if (!user.isLogin) return;
            this.save.ing = true;
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
            if (!params._rev && this.data._rev) params._rev = this.data._rev;
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
            try {
                await res;
                this.save.ing = false;
                if (res.errored) return;
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
            }
            catch {
                this.save.ing = false;
            };
        },
        getHeight() {
            var fields = this.fields;
            return fromPixel((fields.length > 6 ? 6 : fields.length || 0) * 44 + 32);
        },
        close() {
            remove(page);
        },
        data: extend({ date: +new Date }, item)
    });
    page.onback = function () {
        if (this.$scope.isedit) return false;
    };
    Promise.resolve(page.$scope.fields.loading_promise).then(function () {
        setTimeout(function () {
            move.setPosition(page, [.5, .5]);
        }, 20);
    });
    return page;
}