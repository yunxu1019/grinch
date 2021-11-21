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
    elem.innerHTML = `<span ng-if="data[field.key]?.percent">正在上传 (<span ng-bind="data[field.key].percent"></span>)</span><span @click=edit ng-elseif="data[field.key]">修改</span><span @click=edit -else>设置</span>`;

    render(elem, {
        getIcon,
        data,
        edit() {
            var editer = iconeditor(data, field);
            editer.initialStyle = "transform:scale(.9);opacity:0;transition:transfrom .2s,opacity .1s"
            popup(editer);
            drag.on(editer.firstChild, editer);
            move.setPosition(editer, [.5, .5]);
        },
        field
    });
    return elem;
}