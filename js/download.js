HTMLDATA = {
    playing: {
        id: '',
        src: '',
        state: false,
    },
    searched: {},
    isGridView: false,
};

function searchHandler(searchText) {
    HTMLDATA.searched.link = `../sc.php?type=link&link=${searchText}&details=true`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && this.response != null) {
            if (this.response.error) {
                alert('Something went wrong!');
                $('body').removeClass('searching');
                window.close();
                return;
            }
            HTMLDATA.tracks = [];
            HTMLDATA.playlists = [];
            HTMLDATA = { ...HTMLDATA, ...this.response.content };
            // RenderContainer();
            setTimeout(() => {
                $('body').append(
                    `<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8b58e0488054c6"></script>`,
                );
            }, 500);
            renderDownload();
            // $(".glow-this").removeClass("glow");
            $('body').removeClass('searching');
        }
    });
    xhr.open('GET', HTMLDATA.searched.link);
    xhr.send();

    // $(".glow-this").addClass("glow");
    $('body').addClass('searching');
}

$(() => {
    let para = new URL(window.location.href).searchParams.get('link');
    if (para != null) {
        searchHandler(para);
    } else {
        window.location = window.origin;
    }
});
function renderDownload() {
    $('.sound-title').text(HTMLDATA.tracks[0].title);
    $('.sound-artist').text(HTMLDATA.tracks[0].user);
    $('.image')[0].src = HTMLDATA.tracks[0].image.replace(
        '-large',
        '-t500x500',
    );

    $('#fileDetails').text(
        `Duration: ${
            (+HTMLDATA.tracks[0].duration / 60000).toFixed(2) + ' min'
        } | FileSize: ${
            (+HTMLDATA.tracks[0].duration / 65675.2).toFixed(2) + ' MB'
        }`,
    );

    $('.hide-on-search').show();
}

function downloadBtnHandler(e) {
    FileHandler(HTMLDATA.tracks[0].id, HTMLDATA.tracks[0].title, e);
}

function FileHandler(id, fileName, e) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && this.response != '') {
            let downXhr = new XMLHttpRequest();
            downXhr.overrideMimeType('application/octet-stream');
            downXhr.responseType = 'blob';
            downXhr.open('GET', this.response);
            downXhr.send();
            downXhr.onprogress = event => {
                let percent =
                    (((event.loaded / event.total) * 100) | 0).toFixed() + '%';

                $(e).children('span').children('span').text(percent);
            };
            downXhr.onload = function (e) {
                if (this.status == 200) {
                    var blob = this.response;
                    var a = document.createElement('a');
                    var blobUrl = window.URL.createObjectURL(
                        new Blob([blob], { type: blob.type }),
                    );
                    document.body.appendChild(a);
                    a.style = 'display: none';
                    a.href = blobUrl;
                    a.download = fileName + '.mp3';
                    a.click();
                }
            };
        }
    });
    xhr.open('GET', `../sc.php?type=audio&id=${id}`);
    xhr.send();
}
