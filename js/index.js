HTMLDATA = {
    Header: '',
    playing: {
        id: '',
        src: '',
        state: false,
    },
    searched: {},
    isGridView: true,
};

$(() => {
    let para = new URL(window.location.href).searchParams.get('search');
    if (para != null) {
        document.getElementById('SearchInput').value = para;
        searchHandler();
    } else {
        getTop();
    }
    setTimeout(() => {
        $('body').append(
            `<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8b58e0488054c6"></script>`,
        );
    }, 5000);

    if (screen.width < 1000) {
        $('.viewSelectImg').toggleClass('viewSelectImg-selected');
        HTMLDATA.isGridView = false;
    }
});

function showHandler() {
    player().show();
}

function searchHandler() {
    var searchText = $('#SearchInput').val();
    $('#SearchInput').autocomplete('close');

    if (
        searchText != undefined &&
        searchText != '' &&
        HTMLDATA.searched.title != searchText
    ) {
        HTMLDATA.searched.title = searchText;
        HTMLDATA.searched.link = `./sc.php?type=${
            /soundcloud.com\//.test(searchText)
                ? 'link&link='
                : 'search&search='
        }${searchText}`;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                HTMLDATA.tracks = [];
                HTMLDATA.playlists = [];
                HTMLDATA.Header = '';
                if (this.response != null) {
                    HTMLDATA = { ...HTMLDATA, ...this.response.content };
                }

                RenderContainer();
                $('.glowThis').removeClass('glow');
                $('body').removeClass('searching');
            }
        });
        xhr.open('GET', HTMLDATA.searched.link);
        xhr.send();

        $('.glowThis').addClass('glow');
        $('body').addClass('searching');
    } else {
        HTMLDATA.searched.title = '';
    }
}

function getTop() {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.addEventListener('readystatechange', function () {
        if (
            this.readyState === 4 &&
            this.response != null &&
            !this.response.error
        ) {
            HTMLDATA.tracks = [];
            HTMLDATA.playlists = [];
            HTMLDATA.Header = 'Most heard tracks';
            HTMLDATA = { ...HTMLDATA, ...this.response.content };
            // HTMLDATA.Top = `
            // <p style="
            // position: absolute;
            // margin-top: -30px;
            // font-size: 25px;
            // font-weight: bold;
            // left: 60px;
            // color: #00000085;">Most heard tracks: </p>`;

            RenderContainer();
        }
    });
    xhr.open('GET', './sc.php?type=top');
    xhr.send();
}

document
    .getElementById('SearchInput')
    .addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById('SearchBtn').click();
        }
    });

$('.viewSelectImg').click(e => {
    if (!$($(e)[0].target).hasClass('viewSelectImg-selected')) {
        $('.viewSelectImg').toggleClass('viewSelectImg-selected');
        HTMLDATA.isGridView = !HTMLDATA.isGridView;
        RenderContainer();
    }
});

// $('.tips-links').click(e => {
//     let div;

//     switch (e.currentTarget.textContent) {
//         case 'How to Use':
//             div = 'howtouse';
//             break;

//         case 'Contact us':
//             div = 'contactus';
//             break;

//         case 'Playlist downloader':
//             div = 'playlistdownloader';
//             break;
//         default:
//             return;
//             break;
//     }

//     $('html, body').animate(
//         {
//             scrollTop: $('#' + div).offset().top - 70,
//         },
//         500,
//     );
// });

$.fn.googleSuggest = function (opts) {
    opts = $.extend(opts);
    opts.delay = 0;
    opts.source = function (request, response) {
        $.ajax({
            url: './sc.php/?type=keySuggest',
            data: {
                key: request.term,
            },
            success: function (data) {
                response(
                    $.map(data.content, function (item) {
                        return { value: $('<span>').html(item).text() };
                    }),
                );
            },
        });
    };

    opts.select = function (event, ui) {
        $('#SearchInput').val(ui.item.label);
        searchHandler();
    };
    return this.each(function () {
        $(this).autocomplete(opts);
    });
};

$('#SearchInput').googleSuggest();

$('.listItem').click(e => {
    console.log(e);
});