var load = async function (url, selector, datamap, result) {
    var dom = await data.fromURL(url);
    var dom = dom.querySelectorAll(selector);
    if (!dom?.length) return false;

    for (var cx = 0, dx = dom.length; cx < dx; cx++) {
        var dm = dom[cx];
        var r = {};
        for (var k in datamap) {
            var s = datamap[k];
            var d = data.seekResponse(dm, s);
            if (/(href|src)$/i.test(s)) {
                if (!/^(\w+)\:/.test(d)) {
                    var base = parseURL(url);
                    var n = base.locate(d);
                    d = String(n);
                }
            }
            r[k] = d;
        }
        result.push(r);
    }
}
var parseUrlList = function (urltext, seekSelector, datamap) {
    var params = [];
    var template = [];
    var index = 0;
    var gt = (p, i) => template[i << 1 | 1] = p;
    var gp = param => {
        param.forEach(gt);
        return template.join('');
    };
    urltext.replace(/\[([\d,\-]+)\]/g, (_, a, i) => {
        var param = [];
        a.split(',').forEach(a => {
            var [b, c = b] = a.split("-");
            for (var cx = +b, dx = +c; cx <= dx; cx++) {
                param.push(cx);
            }
        });
        params.push(param);
        template.push(urltext.slice(index, i), '');
        index = i + _.length;
        return `[${param.length}]`;
    });
    template.push(urltext.slice(index));
    params = combgen(...params);
    var value = null;
    var ld = async function (result) {
        var next = params.next(value);
        if (!next.done) {
            ld.value = next.value;
            var url = gp(next.value);
            try {
                value = await load(url, seekSelector, datamap, result);
            } catch (url) {
                value = false;
            }
            return true;
        }
    };

    ld.template = template;
    ld.params = params;
    return ld;
}
