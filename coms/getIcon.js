var reg = /^https?\:|\/\//i;
function getIcon(item) {
    if (!item.icon) return;
    if (reg.test(item.icon)) return item.icon;
    if (!reg.test(item.url)) return item.icon;
    if (/^\//.test(item.icon))
        return item.url.replace(/^((?:https?\:)?(?:\/\/)?[^\/]+\/)[\s\S]+$/i, "$1") + item.icon;
    return item.url.replace(/[\?\#][\s\S]*$/, "").replace(/[^\/]*$/, item.icon);
}