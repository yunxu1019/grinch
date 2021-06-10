function main(elem) {
    var elem = elem || document.createElement("item");
    care(elem, function (a) {
        elem.innerHTML = template;
        render(elem, {
            item: a
        });
    });
    return elem;
}