
function main(argitem) {
    var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
    var page = div();
    page.innerHTML = grinch;
    var popPage = function () {
        popup(this.path);
    };
    data.setInstance("option-buttons", [
        {
            name: "添加",
            icon: "fa-file",
            path: "#/page/edit",
            do: popPage
        },
        {
            name: "添加目录",
            icon: "fa-folder",
            path: "#/folder/edit",
            do: popPage
        }
    ]);
    var scope = render(page, {
        items: [],
        user,
        filterTime,
        btn: button,
        list: lattice,
        getIcon,
        alert,
        parentId: undefined,
        encode(src) {
            return "http://efront.cc/@/data/xiaohua/photos" + src.replace(/\.?[^\.]+$/, function (m) {
                passport = encode62.timeupdate(passport);
                return "!" + passport + m;
            });
        },
        itemelem(elem) {
            return elem;
        },
        load() {
            var xhr = cross("post", `http://efront.cc:5989/${argitem.type}/_find`).send({
                "selector": {
                    parentId: this.parentId,
                },
                skip: 0,
                limit: 21,
                "sort": [{ [argitem.sort ? argitem.sort : 'date']: "desc" }]
            }).done(function (xhr) {
                var items = JSON.parse(xhr.responseText).docs;
                scope.items = items;
                render.digest();
            });
        },
        grinch() {
            return queue.call(this.items, function (item) {
                // return jsdom.JSDOM.fromURL(item.url, {
                //     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
                // });
            });
        },
        open(url) {
            window.open(url, "_child");
        },
        popup() {
            var elem = popup.apply(null, arguments);
            once("remove")(elem, () => {
                this.load();
            })
        },
    }).$scope;

    scope.load();
    return page;
}