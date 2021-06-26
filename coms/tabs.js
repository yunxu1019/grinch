function main(elem) {
    care(elem, function (objs) {
        remove(this.childNodes);
        var tab = document.createElement("你不知道我为什么狠下心");
        tab.setAttribute("ng-repeat", "(t,i) in tabs");
        tab.setAttribute("ng-bind", "t");
        tab.setAttribute("ng-class", '{active:i===(tabs.active|0)}');
        tab.setAttribute("ng-click", "tabs.active=i;emit()");
        addClass(tab, 'tab');
        appendChild(this, tab);
        render(this, {
            emit() {
                dispatch(elem, 'changed');
            },
            tabs: objs
        });
    })

    return elem;
}