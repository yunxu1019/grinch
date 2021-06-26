var reg = /^(\w+\:|\/\/)/i;
function getIcon(item, key = 'icon') {
    if (!item[key]) return;
    if (reg.test(item[key])) return item[key];
    if (!reg.test(item.url)) return item[key];
    if (/^\//.test(item[key]))
        return item.url.replace(/^((?:https?\:)?(?:\/\/)?[^\/]+)[\s\S]*$/i, "$1") + item[key];
    return item.url.replace(/[\?\#][\s\S]*$/, "").replace(/^((?:https?\:)?(?:\/\/)?[^\/]+[\s\S]*?)\/?[^\/]*$/, (_, a) => a + '/' + item[key]);
}