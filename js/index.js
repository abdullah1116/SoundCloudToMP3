var searchText;
HTMLDATA = {
    Header: '',
    playing: {
        id: '',
        src: '',
        state: false,
        autoplay: false,
        target: {},
    },
    searched: {},
    isGridView: true,
};

function loadSearchParams() {
    searchText = new URL(window.location.href).searchParams.get('search');
    if (searchText) {
        document.getElementById('search-input').value = searchText;
        searchHandler(false);
    } else {
        getTop();
    }
}

function searchHandler(updateHistory = true) {
    searchText = document.getElementById('search-input').value;

    if (def(searchText) && searchText != '') {
        window.document.title = `${searchText} | SoundCloud To MP3`;

        if (updateHistory) {
            $('#search-input').autocomplete('close');

            history.pushState(
                { search: searchText },
                searchText,
                '?search='.concat(searchText),
            );
        }
        HTMLDATA.searched.title = searchText;
        HTMLDATA.searched.link = `./sc.php?type=${
            /soundcloud.com\//.test(searchText)
                ? 'link&link='
                : 'search&search='
        }`;

        cacheFetch('results', HTMLDATA.searched.link, searchText).then(res => {
            HTMLDATA.tracks = [];
            HTMLDATA.playlists = [];
            HTMLDATA.title = `Searching for "${searchText}"`;
            if (res) {
                HTMLDATA = { ...HTMLDATA, ...res.content };
            }

            RenderContainer();
            $('.glow-this').removeClass('glow');
            $('body').removeClass('searching');
        });

        $('.glow-this').addClass('glow');
        $('body').addClass('searching');
    } else {
        HTMLDATA.searched.title = '';
        getTop();
    }
}

function getTop() {
    cacheFetch('top', './sc.php?type=top', '').then(res => {
        HTMLDATA.tracks = [];
        HTMLDATA.playlists = [];
        HTMLDATA.title = 'Most heard tracks';
        HTMLDATA = { ...HTMLDATA, ...res.content };
        RenderContainer();
    });
}

function openSuggestions(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('search-btn').click();
    }
}

function selectGridView(e) {
    if (!$($(e)[0].target).hasClass('view-select-img-selected')) {
        $('.view-select-img').toggleClass('view-select-img-selected');
        HTMLDATA.isGridView = !HTMLDATA.isGridView;
        RenderContainer();
    }
}

function downloadLink(text) {
    return text.replace('https://soundcloud.com/', './download/?link=/');
}

function isPlaying(trackId, playlistId = undefined) {
    return (
        HTMLDATA.playing.target.trackId == trackId &&
        HTMLDATA.playing.target.playlistId == playlistId
    );
}
