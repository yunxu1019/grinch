function main(elem) {
    var elem = elem || document.createElement("item");
    care(elem, function (a) {
        elem.innerHTML = item;
        render(elem, {
            item: a
        });
    });
    return elem;
}