function getBtnHandler(e, download, id = undefined, parentId = undefined) {
    event.preventDefault();
    if (parentId != undefined) {
        var item = HTMLDATA.playlists[parentId].tracks[id];
    } else if (id != undefined) {
        var item = HTMLDATA.tracks[id];
    }

    if (download) {
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
