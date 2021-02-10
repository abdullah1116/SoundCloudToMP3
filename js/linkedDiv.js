setInterval(() => {
    const linkedDiv = () => {
        let allEle = document.getElementsByTagName('div');
        for (var i = 0, elLength = allEle.length - 1; i < elLength; i++) {
            let ele = allEle[i];
            let href = ele.getAttribute('href');
            if (href) {
                ele.addEventListener('click', () => {
                    window.location = href;
                });
                ele.style.cursor = 'pointer';
            }
        }
    };
    window.addEventListener('load', () => linkedDiv());
});
