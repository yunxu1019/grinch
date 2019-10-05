function main(params) {
    var page = vbox();
    page.innerHTML = list;
    var song = data.asyncInstance(params.api);
    render(page, {
        lattice,
        items: song,
        play(item) {
            if (item.children) {
                var hidden = document.createElement("hidden");
                appendChild(page, hidden);
                rootElements.push(hidden);
                var items = page.$scope.items;
                once('remove')(hidden, function () {
                    page.$scope.items = items;
                    render.refresh();
                });
                page.$scope.items = item.children instanceof Array
                    ? item.children
                    : data.asyncInstance(item.children);
            } else if (item.id) {
                kugou$player.play(item.id.replace(/^songs\_/i, ''));
            }
        }
    })
    return page;
}