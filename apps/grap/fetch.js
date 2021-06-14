function main(req) {
    var f = view();
    f.dragHandle = f.firstChild;
    drag.on(f);
    resize.on(f);
    f.innerHTML = template;
    req = extend({}, req, {
        method: req.method.replace(/\:[\s\S]*$/, '').replace(/^[mc]/, ''),
        selector: req.method.replace(/^[^\:]*\:?/, ''),
        url: req.url.replace(/#[\s\S]*$/, ''),
        map: req.url.replace(/^[^#]+/, '').slice(1)
    });
    renderWithDefaults(f, {
        destroy() {
            remove(f);
        },
        reflect() {
            return div();
        },
        req,
        fields: data.from("/grap/fetch.yml", parseFields)
    });
    console.log(req)

    return f;
}