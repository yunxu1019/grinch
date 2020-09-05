
function main(argitem) {
    var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
    var page = div();
    page.innerHTML = grinch;
    var scope = render(page, {
        items: [],
        user,
        filterTime,
        btn: button,
        list: lattice,
        getIcon,
        alert,
        beian: /efront\.cc(\:\d+)?$/i.test(location.host) ? beian : null,
        parentId: undefined,
        a: button,
        encode(src) {
            return "http://efront.cc/@/data/xiaohua/photos" + src.replace(/\.?[^\.]+$/, function (m) {
                passport = encode62.timeupdate(passport);
                return "!" + passport + m;
            });
        },
        itemelem(elem) {
            return elem;
        },
        edit(item) {
            action({
                modal: {
                    path: '#/page/edit',
                    fields_ref: "config/fields/site.json",
                    actionId: 'update-site'
                }
            }, item, argitem).then(function (page) {
                on("submitted")(page, function () {
                    scope.load();
                });
            });
        },
        load() {
            scope.items = data.from("load-list", {
                "selector": {
                    parentId: this.parentId,
                },
                skip: 0,
                type: argitem.type,
                limit: 21,
                "sort": [{ [argitem.sort ? argitem.sort : 'date']: "desc" }]
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
            on("submitted")(elem, () => {
                scope.load();
            });
        },
    }).$scope;

    scope.load();
    return page;
}