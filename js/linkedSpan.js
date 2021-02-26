setTimeout(() => {
    this.linkedSpan = () => {
        let allEle = document.getElementsByTagName('span');
        for (var i = 0, elLength = allEle.length - 1; i < elLength; i++) {
            let ele = allEle[i];
            let href = ele.getAttribute('href');
            let target = ele.getAttribute('target');
            if (href) {
                if (target == '_blank') {
                    ele.addEventListener(
                        'click',
                        e => !event.defaultPrevented && window.open(href),
                    );
                } else {
                    ele.addEventListener(
                        'click',
                        e =>
                            !event.defaultPrevented && (window.location = href),
                    );
                }
                ele.style.cursor = 'pointer';
            }
        }
        window.addEventListener('load', () => linkedSpan());
    };
});
