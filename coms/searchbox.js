var lazy2 = function (r, w) {
    var i, a, t;
    var f = function () {
        r.apply(t, a);
    };
    return function () {
        a = arguments;
        t = this;
        clearTimeout(i);
        i = setTimeout(f, w);
    };
};
var search = function () {
    if (this.searchText === this.value) return;
    this.searchText = this.value;
    dispatch(this, 'search');
};
var cancel = function () {
    if (!this.value && !this.searchText) return;
    this.searchText = this.value = '';
    dispatch(this, 'search');
};
var emit = lazy2(search, 60);
function searchbox() {
    var i = input();
    on("keyup")(i, emit);
    on("input")(i, emit);
    on("paste")(i, emit);
    on("cut")(i, emit);
    on("keydown.enter.only")(i, search);
    on("keydown.esc.only")(i, cancel);
    return i;
}