$.fn.googleSuggest = function (opts) {
    opts = $.extend(opts);
    opts.delay = 300;
    opts.source = function (request, response) {
        cacheFetch(
            'autocomplete',
            './sc.php/?type=keySuggest&key=',
            request.term,
        ).then(data => {
            response(
                $.map(data.content, function (item) {
                    return { value: $('<span>').html(item).text() };
                }),
            );
        });
    };

    opts.select = function (event, ui) {
        $('#search-input').val(ui.item.label);
        searchHandler();
    };
    return this.each(function () {
        $(this).autocomplete(opts);
    });
};
