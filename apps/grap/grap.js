var page = div();
page.innerHTML = grap;
function stringifyRequests(reqlist) {
    var serverlist = {};
    var mesize = 0, mesize = 0;
    for (var r of reqlist) {
        if (mesize < r.method.length) mesize = r.method.length;
    }
    mesize += 2;
    for (var r of reqlist) {
        var url = parseURL(r.base + r.url);
        var host = url.protocol + "//" + url.host + "/";
        if (!serverlist[host]) {
            serverlist[host] = {};
        }
        host = serverlist[host];
        host[r.id] = r.method + new Array(mesize - r.method.length).join(" ") + (url.pathname.slice(1) || '.') + (url.search || '') + (url.hash || '');
    }
    return YAML.stringify(serverlist);
}
function main(params) {
    renderWithDefaults(page, {
        button,
        requests: [],
        address: 'config/api.yml',
        editpage: false,
        datas: [],
        indexes: null,
        color(text) {
            text = -parseInt(text, 36) * .1 + 2.4;
            return color.rotate('#02f', text)
        },
        load() {
            this.requests = data.from(this.address, this.parse);
        },
        run(a) {
            popup('/grap/fetch', a);
        },
        parse(a) {
            a = data.parseConfig(a);
            return Object.keys(a).map(k => a[k]);

        },
        edit(a) {
            this.datas = stringifyRequests(this.requests);
            this.editpage = true;
        },
        close() {
            try {
                var d = parseYML(this.datas);
                var requests = this.parse(d);
                this.requests.splice(0, this.requests.length);
                this.requests.push.apply(this.requests, requests);
            } catch (e) {
                return alert.error('数据错误' + e);
            }
            this.editpage = false;
        },
        search() {
            var { url, method } = this.api;
            console.log(data);
            data.fromApi({
                method,
                url
            }, { page: 1 }).loading_promise.then(function (res) {
                console.log(res);
            })
        }
    });
    page.$scope.load();
    return page;
}