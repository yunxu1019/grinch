var article = `一年前的六月，当我离开老食堂，我知道，那是永远离开了，虽然食堂的师傅阿姨和张洋姐都以为我只是因为考试离开了。树依旧是树，风依旧是风，而周围的人比往常少了许多。也许是我对最后一顿免费的午餐依依不舍，吃的时间有些长，也许是大家都怕了中午的太阳，周围没有一个人。回头望望老食堂，还是勇敢向前吧。
　　新的生活就在一步看不到一个脚印的水泥地面开始了。再也不用紧张地赶向课堂，再也不担心没时间上厕所，我慢慢走着。走着走着，一股热泪就要夺眶，我用力撑着眼帘，不让它出来，就算看着我走着的只有树荫下的小野猫。这熟悉的小路此刻终于陌生极了，和2010年冬天回家时，从恒力化纤到南麻镇的小路一样，好像往事依旧发生在这路上，周围还有人在打闹嬉笑，而我变成一个匆匆看客，看着时间的终点向起点重合。
　　毕业了，我在寻找和离开老食堂时一样的感觉，找不到。而上学比在老食堂工作累多了，至少现在我这么觉得。在老食堂，每工作一天就可以得到一天的工资；上学却不一样，无论怎么努力，最后的结果都可能是不好的，我为之欣喜若狂的事情，在别人眼中始终一文不值，每天都不病而病地挣扎着。
　　来苏州科技学院之前，爷爷奶奶姥姥姥爷健在，我不欠苏州科技学院什么；苏州科技学院之后，四老都经历了生死劫，姥爷没有扛过去，先走了，而我也欠了苏州科技学院的债。苏州科技学院为我买了很多我没看过的书，为我开了很多我没听过的课，为我准备了很多我没有能力通过的考试，为我提供了每小时8块钱的勤工助学的工作岗位，为我申请了比学费只少了两千的助学金，为我提供了比家常便饭好十倍有余的自费伙食，为我暂时保管了我的毕业证、学位证以及教师资格证书，让我打心眼里不知道怎么感谢它是好。
　　四年没在这里包夜，四年没在这里旷课，四年没在这里吐脏字，四年对这里唯唯诺诺，前三个是我坚持了，可第四个为什么变成了内在的？两个小时后的早晨就是毕业典礼了，真奇怪，我还能留到最后一课，把本不该开始的大学读完。我那可爱可敬可亲的家人们，你们该满意了吧。以后的路还长，下一步怎么走？我无法挣脱迷茫了。`
    .replace(/[，、]/g, "_").replace(/[；。？]/g, "\r\n").split(/[\r\n\s]+/).filter(a => !!a);

var currentScope = null;
data.bindInstance("search-text", function (text) {
    if (currentScope) {
        currentScope.searchText = text || undefined;
        currentScope.load();
    }
});
var fields = data.from("config/fields/site.yml", parseFields);
prepare("/page/edit");
function main(argitem) {
    var passport = encode62.timeencode(encode62.decode62(user._passport, user.session));
    var page = document.createElement("垂死病中惊坐起_暗风吹雨入寒窗");
    page.innerHTML = grinch;
    var scope = render(page, {
        items: [],
        user,
        filterTime,
        btn: button,
        list: gallery,
        getIcon,
        alert,
        beian: /efront\.cc(\:\d+)?$/i.test(location.host) ? beian : null,
        parentId: undefined,
        a: button,
        marker,
        searchText: undefined,
        async pay(item) {
            var host = '//efront.cc/';
            var p = frame$payment([
                {
                    url: host + 'pay/alipay:',
                    name: '支付宝',
                    icon: host + 'pay/alipay.ico',
                    cost(price) {
                        return BigNumber.prd((0.6036218 + 0.204081632) / 100, price);
                    },
                },
            ], item.cprice);
            popup(p, true);
            move.setPosition(p, [.5, .5]);
            care(p, 'payment', function () {
                window.open(item.url);
                remove(p);
            });
        },
        encode(src) {
            return "http://efront.cc/@/data/xiaohua/photos" + src.replace(/\.?[^\.]+$/, function (m) {
                passport = encode62.timeupdate(passport);
                return "!" + passport + m;
            });
        },
        padding(elem) {
            var e = document.createElement(article[elem.$scope.$index % article.length]);
            appendChild(e, [].slice.call(elem.children));
            render(e, elem.$scope, elem.$parentScopes, false);
            return e;
        },
        async edit(item) {
            var fs = fields.slice();
            if (!item) fs = fs.filter(f => 'key' in f && !f.readonly);
            fs = fs.filter(f => f.inform !== false);
            item = Object.assign({}, item);
            if (item.cprice > 0 || item.fprice > 0) {
                if (item.author !== user.name) delete item.url;
            }
            action({
                modal: {
                    path: '#/page/edit',
                    fields: fs,
                    fields_ref: "config/fields/site.yml",
                    actionId: 'update-item'
                }
            }, item, argitem).then(function (page) {
                on("submitted")(page, function () {
                    scope.load();
                });
            });
        },
        loadid: 0,
        async load() {
            var loadid = ++this.loadid;
            var loaded = 0, pagesize = 20;
            var limit = 60000;
            this.items = [];
            var lastId = '';
            while (loaded === this.items.length && loadid === this.loadid && this.items.length < limit) {
                loaded += pagesize;
                var params = {
                    lastId,
                    size: pagesize,
                    searchText: this.searchText,
                    type: argitem.type
                };
                var items = await data.lazyInstance("load-list", params).loading_promise;
                if (loadid !== this.loadid) break;
                var lastId = items[items.length - 1]?.id;
                this.items.push.apply(this.items, items);
                await new Promise(ok => setTimeout(ok, 600));
            }
        },
        grinch() {
            return queue.call(this.items, function (item) {
                // return jsdom.JSDOM.fromURL(item.url, {
                //     userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
                // });
            });
        },
        open(url) {
            window.open(url, "_child");
        },
        popup() {
            var elem = popup.apply(null, arguments);
            on("submitted")(elem, () => {
                scope.load();
            });
        },
    }).$scope;
    scope.load();
    onremove(page, function () {
        currentScope = null;
    });
    onappend(page, function () {
        currentScope = scope;
    });
    return page;
}