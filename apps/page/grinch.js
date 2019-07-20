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
    load() {
        var xhr = cross("post", "http://efront.cc:5989/grinch/_find").send({
            "selector": {
            },
            skip: 0,
            limit: 21,
            "sort": [{ 'date': "desc" }]
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
function main() {
    scope.load();
    return page;
}