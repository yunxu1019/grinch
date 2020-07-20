var baseTypes = [
    { key: "string", name: "字符串" }, { key: "number", name: "双精度浮点数" }
];
var extraTypes = [];
/**
 * 类设计器
 */
function main(item = {
    name: '',
    properties: [],
    methods: []
}) {
    var page = div();
    page.innerHTML = type;
    render(page, {
        input() {
            var input = document.createElement("div");
            input.contentEditable = true;
            addClass(input, "input");
            return input;
        },
        addProperty() {
            if (!item.properties) item.properties = [];
            item.properties.push({ name: "属性", value: "", type: "string" });
        },
        btn: button,
        baseTypes,
        extraTypes,
        select,
        item
    })
    return page;
}