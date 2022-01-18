function main(params) {
    var page = vbox();
    page.innerHTML = list;
    var song = data.asyncInstance(params.api instanceof Array ? params.api[0] : params.api, null, kugou$parseSongsList);
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
                    : data.asyncInstance(item.children, null, kugou$parseSongsList);
            } else {
                var hash = item.hash || item.id.replace(/^songs\_/i, '');
                kugou$player.play(hash);
            }
        }
    })
    return page;
}