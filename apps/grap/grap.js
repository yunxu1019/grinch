/**
 * 
 * @param {HTMLElement} e 
 */
var getElementSelector = function (e) {
    var s = e.tagName.toLowerCase();
    var clist = ''
    if (e.classList.length) clist = Array.prototype.filter.call(e.classList, function (a) {
        return /^[\w\-]+$/.test(a);
    }).join('.');
    if (clist) s += '.' + clist;
    return s;
};
var groups = null;
var groupsMap = null;
class Group extends Array {
    deep = 0;
    constructor(name) {
        super();
        this.name = name;
        this.children = this;
    }
};

var getSelectorPath = function (img, parent) {
    var c = img.parentNode;
    var s = getElementSelector(img);
    while (c !== parent && c.parentNode && c.classList) {
        s = getElementSelector(c) + ">" + s;
        c = c.parentNode;
    };
    return [s, c];
};

var keepStyles = {
    class: true,
    href: { a: true },
    src: { img: true }
}
/**
 * 
 * @param {Element} e 
 */
var trimAttribute = function (e) {
    var tagName = e.tagName.toLowerCase();
    for (var { name } of e.attributes) {
        var keep = keepStyles[name];
        if (isObject(keep)) {
            keep = keep[tagName];
        }
        if (keep !== true) e.removeAttribute(name);
    }
};
function popimg(e) {
    var img = e.target;
    if (!img.group) return;
    var p = picture(img.group.map(x => x.src), img.index);
    p.touchclose = true;
    popup(p);
}
var locations_history = [];
function ophref(e) {
    if (!e.target.href) return;
    e.preventDefault();
    var loca = parseURL(e.target.href);
    if (!loca.host) {
        return window.open(loca.href, "_self");
    }
    locations_history.push(this.menus.map(m => Object.assign({ m }, m)));
    this.location = loca;
    this.valid = true;
    this.load();
}
/**
 * @param {Element} img 
 */
function group(img) {
    if (img.group) return;
    var [s, c] = getSelectorPath(img, this);
    var nodes = c.querySelectorAll(s);
    if (nodes.length > 1) {
        var ns = nodes;
        a: do {
            var [p] = ns;
            p = p.parentNode;
            for (var n of ns) {
                if (n.parentNode !== p) {
                    ns = Array.prototype.map.call(ns, n => n.parentNode).filter(p => p);
                    continue a;
                }
            }
            break;
        } while (true);
        if (ns.length < nodes.length) return;
        var [s1, c] = getSelectorPath(nodes[0], p);
        nodes = c.querySelectorAll(s1);
        var isImage = /^img$/i.test(img.tagName);
        nodes = nodes.forEach(n => {
            var deep = 1;
            var n0 = n;
            var p = n.parentNode;
            do {
                p = n.parentNode;
                if (p === c) break;
                n = p;
            } while (true);
            if (isImage) n = n0;
            if (n && !n.group) {
                var tagName = n.tagName.toLowerCase();
                if (tagName === 'a' || tagName === 'button' || tagName === 'btn') button(n);
                if (!groupsMap[s]) groups.push(groupsMap[s] = new Group(s));
                var g = groupsMap[s];
                var x = n.cloneNode(true)
                if (isImage) {
                    x.group = g;
                } else {
                    var cc = x.querySelectorAll(":not(link,style,script,iframe,frameset,meta,:empty,button,input,select,textarea)");
                    remove(x.childNodes);
                    appendChild(x, cc);
                    for (var cc of cc) trimAttribute(cc);
                    cc = x.querySelectorAll(":not(img):empty");
                    remove(cc);
                    trimAttribute(x);
                    deep = x.childNodes.length;
                }
                x.index = g.length;
                x.group = g;
                g.push(x);
                g.deep += deep;
                n.group = g;
            }
            return n;
        });
        return s;
    }
}
var formaturl = function (base, url) {
    if (/^\/[~*&\.]/.test(url)) return url;
    url = parseURL(url);
    if (!url.protocol) {
        url.protocol = base.protocol;
        if (!url.host) {
            if (/^\/[~*&\.]/.test(base.pathname)) {
                var m = /^\/[~&*\.]+([^\/]+)/.exec(base.pathname);
                url.host = m[1];
            }
            else {
                url.host = base.host;
            }
        }
    }
    return url.href;
}
var setAttribute = function (img, attr, base) {
    var src = img.getAttribute(attr);
    if (!src || /^data\:/.test(src)) {
        var attributes = [];
        for (var a of img.attributes) {
            if (!(a.name in Image.prototype)) attributes.push(a);
        }
        for (var { value } of attributes) {
            if (/\.(png|jpg|webp|gif)|^(\w+\:|\/\/)/i.test(value)) {
                src = value;
                break;
            }
        }
        if (!src) for (var a of attributes) {
            if (/lazy/i.test(a.name)) src = a.value;
        }
    }
    if (src && !/^https?\:/i.test(src)) {
        src = formaturl(base, src);
    }
    if (!img[attr] !== src) img[attr] = src;

}

var toGroups = function (dom, all) {
    groups = [];
    groupsMap = {};
    all.forEach(group, dom.body);
    var res = groups;
    groups = null;
    groupsMap = null;
    return res;
};
var menus = [{ name: "图片", tag: 'img', attr: 'src' }, { name: "链接", tag: "a", attr: 'href' }];
async function load() {
    if (!this.valid) return;
    var href = this.location.href;
    if (this.loading) this.loading.abort();
    this.loading = cross('get', this.location.href)
    var res = await this.loading;
    var parser = new DOMParser;
    var dom = parser.parseFromString(res.responseText, 'text/html');
    var imgs = dom.querySelectorAll("img");
    var anchors = dom.querySelectorAll("a");
    var base = parseURL(href);
    if (!base.protocol) base.protocol = location.protocol;
    imgs.forEach(img => setAttribute(img, 'src', base));
    anchors.forEach(a => setAttribute(a, 'href', base));
    menus[0].groups = toGroups(dom, imgs);
    menus[1].groups = toGroups(dom, anchors);
    this.menus = menus.filter(m => m.groups.length > 0);
    if (!this.menus.length) {
        this.activeMenu = null;
        return;
    }

    for (var m of this.menus) {
        if (m.actived) {
            this.activeMenu = m;
            return;
        }
    }
    for (var m of menus) {
        m.actived = false;
    }
    this.menus[0].actived = true;
    this.activeMenu = this.menus[0];
}
function main(params) {
    var page = document.createElement("一点一横长");
    page.innerHTML = template;
    data.bindInstance(page, {
        "search-text"(value) {
            page.$scope.location = parseURL(value);
            page.$scope.valid = !!parseURL(value).hostname;
        }
    });
    renderWithDefaults(page, {
        valid: false,
        menu,
        searchtip: params.searchtip || "",
        menus: [],
        ophref,
        popimg,
        get activeMenu() {
            return this._activeMenu;
        },
        set activeMenu(v) {
            var index = 0, deep = 0;
            if (v) {
                for (var cx = 0, dx = v.groups.length; cx < dx; cx++) {
                    var g = v.groups[cx];
                    if (g.deep > deep) {
                        index = cx;
                        deep = g.deep;
                    }
                }
                if (!isFinite(v.index)) {
                    v.index = index;
                }
            }
            return this._activeMenu = v;
        },
        _activeMenu: null,
        location: { href: "" },
        load
    });
    bind('keydown.enter')(page, function () {
        if (page.$scope.valid && document.activeElement === document.body.querySelector(".searchbox")) {
            page.firstElementChild.querySelector("a").click();
        }
    });
    onmounted(page, function () {
        page.$scope.load();
    });
    page.onback = function () {
        if (locations_history.length) {
            var $scope = this.$scope;
            var menus = $scope.menus = locations_history.pop();
            menus.forEach(m => {
                var mm = m.m;
                delete m.m;
                Object.assign(mm, m);
                return mm;
            });
            $scope.activeMenu = menus.filter(m => m.actived)[0];
            return false;
        }
    };
    return page;
}