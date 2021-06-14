var parseFields = function (data) {
    if (!data) return;
    var keys;
    if (typeof data[0] === "string") {
        keys = data[0].split(/\s+/);
        data = data.slice(1);
    } else if (data[0] instanceof Array) {
        keys = data[0];
        data = data.slice(1);
    } else {
        keys = "key name type".split(/\s+/);
    }
    data = data.map(function (string) {
        if (typeof string === "string") {
            string = string.split(/\s+/);
        }
        if (string instanceof Array) {
            var res = {};
            keys.forEach((k, i) => res[k] = string[i]);
        } else {
            res = string;
        }
        if (res && res.key) {
            var is_inlist = /^[\+\!]|^[\+\!]$/.test(res.key);
            var is_hidden = /^\-|\-$/.test(res.key);
            var is_append = /^\$|\$$/.test(res.key);// 服务器追加的属性
            var is_inform = !/^\!|\!$/.test(res.key);
            var is_editable = !/^\&|\&$/.test(res.key);// 创建后不能修改的属性
            var is_required = /^\*|\*$/.test(res.key);
            var delete_onempty = /^\?|\?$/.test(res.key);
            var delete_onsubmit = /^\~|\~$/.test(res.key);
            if (typeof res.options === 'string') {
                var options = res.options;
                if (/^\[[\s\S]*\]$|^\{[\s\S]*\}$|[\r\n]/.test(options)) {
                    options = parseYML(options);
                } else if (/\,/.test(options)) {
                    options = options.split(',');
                }
                res.options = options;
            }
            res.key = res.key.replace(/^[\?\~\*\!\+\-\$]|[\?\~\*\!\+\-\$]$/g, '');
            if (/^\|.*?\|$/.test(res.type)) {
                res.text_align = 'center';
            } else if (/^\||\|$/.test(res.type)) {
                res.text_align = res.type[0] === "|" ? "left" : "right";
                res.type = res.type.replace(/^\||\$/g, "");
            }
            if (is_inlist) res.is_inlist = true;
            if (is_hidden) res.is_hidden = true;
            if (is_append) res.is_append = true;
            if (!is_inform) res.is_inform = false;
            if (is_required) res.is_required = true;
            if (!is_editable) res.is_editable = false;
            if (delete_onempty) res.delete_onempty = true;
            if (delete_onsubmit) res.delete_onsubmit = true;
        }
        console.log(res)
        return res;
    });
    return data;
};