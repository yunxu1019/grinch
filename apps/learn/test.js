var page = vbox();
function main() {

    page.innerHTML = test;
    render(page, {
        images: [
            "/@d:/data/kami.jpg",
            "/@d:/data/kami1.jpg",
            "/@d:/data/kami2.jpg",
            "/@d:/data/kami3.jpg",
            "/@d:/data/kami4.jpg",
            "/@d:/data/kami5.jpg",
            "/@d:/data/kami6.jpg",
            "/@d:/data/kami7.jpg",
            "/@d:/data/uncen.jpg"
        ],
        picture(m, i) {
            var p = picture(m, i);
            popup(p);
            console.log("click", arguments)
        },
        image1(elem) {
            var plot = function (x, y, w, h) {
                var rect = document.createElement('div');
                appendChild(elem, rect);
                rect.classList.add('rect');
                rect.style.width = w + 'px';
                rect.style.height = h + 'px';
                rect.style.left = (img.offsetLeft + x) + 'px';
                rect.style.top = (img.offsetTop + y) + 'px';
            };
            var tracker = new tracking.ObjectTracker(["face"]);
            var img = elem.querySelector("img");
            img.onload = function () {
                if (!/^data/i.test(img.src)) tracking.track(img, tracker);
            };

            tracker.setStepSize(1);

            tracker.on('track', function (event) {
                if (event.data.length === 0) {
                    console.log(event);
                    // No colors were detected in this frame.
                } else {
                    console.log(event);
                    event.data.forEach(function (rect) {
                        plot(rect.x, rect.y, rect.width, rect.height);
                    });
                }
            });
            return elem;
        }
    });
    return page;
}