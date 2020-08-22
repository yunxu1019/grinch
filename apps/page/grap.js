var page = div();
page.innerHTML = grap;
function main(params) {
    renderWithDefaults(page, {
        button,
        requests: [],
        address: '/config/api.json',
        editpage: false,
        datas: [],
        indexes: null,
        load() {
            console.log(this)
            this.requests = data.from(this.address, a => {
                this.datas = JSON.stringify(a, null, 4);
                return this.parse(a);
            });
        },
        parse(a) {
            a = data.parseConfig(a);
            return Object.keys(a).map(k => a[k]);

        },
        edit(a) {
            this.editpage = true;
        },
        close() {
            try {
                var d = JSON.parse(this.datas);
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
    })
    return page;
}