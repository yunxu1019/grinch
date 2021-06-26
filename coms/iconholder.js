function main(elem) {
    var { field, data } = elem;
    var elem = document.createElement("icon");
    elem.setAttribute("ng-src", "getIcon(data,field.key)");
    var size = field.size || 24;
    css(elem, {
        height: fromPixel(size),
        paddingLeft: fromPixel(size)
    });
    on("changes")(elem, function ({ changes }) {
        if (changes.src) css(this, {
            backgroundImage: `url("${this.src}")`
        });
    });
    elem.setAttribute("empty_", "data[field.key]?null:true");
    elem.innerHTML = `<span @click=edit ng-if="data[field.key]">修改</span><span @click=edit -else>设置</span>`;

    render(elem, {
        getIcon,
        data,
        edit() {
            var editer = iconeditor(data, field);
            popup(editer);
            drag.on(editer.firstChild, editer);
            move.setPosition(editer, [.5, .5]);
        },
        field
    });
    return elem;
}