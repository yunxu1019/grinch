var page = div();
page.innerHTML = grap;
function main(params) {
    render(page, {
        button,
        api: {
            url: 'https://baidu.com',
            method: 'get'
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