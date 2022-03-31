
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
            var inlist = /^[\+\!]|^[\+\!]$/.test(res.key);
            var hidden = /^\-|\-$/.test(res.key);
            var append = /^\$|\$$/.test(res.key);// 服务器追加的属性
            var inform = !/^\!|\!$/.test(res.key);
            var editable = !/^\&|\&$/.test(res.key);// 创建后不能修改的属性
            var required = /^\*|\*$/.test(res.key);
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
            if (inlist) res.inlist = true;
            if (hidden) res.hidden = true;
            if (append) res.readonly = true;
            if (!inform) res.inform = false;
            if (required) res.required = true;
            if (!editable) res.editable = false;
            if (delete_onempty) res.delete_onempty = true;
            if (delete_onsubmit) res.delete_onsubmit = true;
        }
        return res;
    });
    return data;
};