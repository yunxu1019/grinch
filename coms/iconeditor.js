var { Blob, URL } = window;
var url = null;
var toURL = function () { return this.url };
function main(data, field) {
    var page = document.createElement("没有谁的光环_握紧手中的平凡");
    page.innerHTML = iconeditor;
    view(page);
    renderWithDefaults(page, {
        tabs,
        Blob, URL,
        url: null,
        menu: [
            "使用网络路径",
            "本地上传",
        ],
        preview() {
            var p = picture([this.url]);
            var close = drop();
            css(close, {
                zIndex: zIndex() + 2
            });
            on('click')(close, function () {
                remove(p);
            });
            p.with = [close];
            close.setAttribute("type", "white");
            popup(p);
        },
        file: null,
        data,
        field,
        checking: false,
        async checkLink() {
            this.checking = true;
            var url = getIcon(data, field.key);
            try {
                await cross("get", url);
                alert("连接成功！", "info");
            } catch (e) {
                alert("链接无法使用", "error");
            }
            this.checking = false;
        },
        chooseImage() {
            var scope = this;
            return chooseFile("image/*").then(function ([file]) {
                if (file.size > 200 * 1024) {
                    alert("您的图像超过200KB，暂不支持使用", "error");
                    return;
                }
                if (url) {
                    URL.revokeObjectURL(url);
                }
                var u = url = URL.createObjectURL(file);
                scope.file = file;
                scope.url = u;
            });
        },
        save() {
            this.exit();
            if (!this.url || !this.file) return;
            var f = this.file;
            var u = this.url;
            f.url = u;
            f.toString = toURL;
            data[field.key] = f;
        },
        exit() {
            remove(page);
        }
    });
    return page;
}