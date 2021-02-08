function getBtnHandler(e, downlaod) {
    event.preventDefault();

    if ($(e).parent().attr('type') == 'track') {
        var item = HTMLDATA.tracks[$(e).parent().attr('index')];
    } else if ($(e).parent().attr('type') == 'playlistTrack') {
        var item =
            HTMLDATA.playlists[$(e).parent().attr('listIndex')].tracks[
                $(e).parent().attr('index')
            ];
    }

    if (downlaod) {
        window.open(downloadLink(item.link), '_blank');
    } else {
        if (HTMLDATA.playing.id == item.id) {
            if (HTMLDATA.playing.state == true) {
                player().pause(e);
            } else {
                player().resume(e);
            }
            HTMLDATA.playing.state = !HTMLDATA.playing.state;
        } else {
            $(e).addClass('btn-playing');
            // $(e).children()[0].src = "assets/pause.svg";

            const callback = res => {
                HTMLDATA.playing.id = item.id;
                HTMLDATA.playing.src = res;
                player().play(e);
                $('.audio-title').text(item.title);
            };

            FileHandler(item.id, callback);
        }
    }

    function FileHandler(id, callback) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4 && this.response != '') {
                if (typeof callback == 'function') {
                    callback(this.response);
                }
            }
        });
        xhr.open('GET', `./sc.php?type=audio&id=${id}`);
        xhr.send();
    }
}
