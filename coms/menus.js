data.fromURL('config/menus.json').loading_promise.then(function (items) {
    var result = [];
    var menuid = 0;
    var savedChildren = {};
    var getChildren = function (menu) {
        if (!menu.id) {
            menu.id = ++menuid;
        }
        if (!(menu.id in savedChildren)) {
            savedChildren[menu.id] = menu.children;
            if (menu.children instanceof Array) {
                menu.children.forEach(getChildren);
                menu.children.forEach(a => a.parent = menu);
            }
        }
    };
    items.map(getChildren);
    result.update = function () {
        var historys = zimoli.getCurrentHistory();
        var map = {};
        historys.forEach((a, i) => map[a] = i + 1);
        result.splice(0, result.length);
        var actived, actived_value = 0;
        var a = function (menu) {
            var res = checkroles(user.roles, menu.roles);
            if (res) {
                if (savedChildren[menu.id] instanceof Array) menu.children = savedChildren[menu.id].filter(a);
                if (menu.path) {
                    if (map[menu.path] > actived_value) {
                        actived = menu;
                        actived_value = map[menu.path];
                    }
                }
            }
            return res;
        };
        result.push.apply(result, items.filter(a));
        var active = result.active;
        if (!active || result.indexOf(active) < 0) {
            active = actived || result[0];
            result.open(active);
        }
    };
    var setActive = function (p, active) {
        while (p) {
            p.active = active;
            p = p.parent;
        }
    };
    result.open = function (menu) {
        if (menu === result.active) return;
        if (!menu) return;
        if (!menu.path) {
            menu.closed = !menu.closed;
            return;
        }
        if (result.active) {
            setActive(result.active, false);
        }
        setActive(menu, true);
        zimoli.go(menu.path, menu.data);
        data.setInstance("option-buttons", menu.options || [], false);
        result.active = menu;
    };
    result.update();
    return result;
});
