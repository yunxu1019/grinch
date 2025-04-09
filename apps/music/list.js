function main(params) {
    var page = vbox();
    page.innerHTML = list;
    var song = data.asyncInstance(params.api instanceof Array ? params.api[0] : params.api, null, kugou$parseSongsList);
    render(page, {
        lattice,
        items: song,
        async play(item) {
            var scope = this;
            if (item.children) {
                var hidden = document.createElement("hidden");
                appendChild(page, hidden);
                rootElements.push(hidden);
                var items = scope.items;
                once('remove')(hidden, function () {
                    scope.items = items;
                    render.refresh();
                });
                scope.items = item.children instanceof Array
                    ? item.children
                    : data.asyncInstance(item.children, null, kugou$parseSongsList);
            } else {
                if (!item.hash && item.hashid) {
                    await data.from("song-mix", item, function (a) {
                        var m = a.innerText.match(/(['"`]?)hash\1\s*:\s*(["'`])(.*?)\2/);
                        if (m) item.hash = m[3];
                    });
                }

                var hash = item.hash || item.id.replace(/^songs\_/i, '');
                kugou$player.play(hash);
            }
        }
    })
    return page;
}