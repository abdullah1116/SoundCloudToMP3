class playerClass {
    constructor(id) {
        this.audioPlayer = document.getElementById(id);
        this.audioPlayer.addEventListener('ended', () => {
            this.ended();
        });
    }

    playTrack(trackId, playlistId = undefined, force = undefined) {
        event.preventDefault();
        const element = this.getELement(trackId, playlistId);
        if (!force && isPlaying(trackId, playlistId)) {
            if (HTMLDATA.playing.state == true) {
                player.pause(element);
            } else {
                player.resume(element);
            }
            HTMLDATA.playing.state = !HTMLDATA.playing.state;
        } else {
            $(element).addClass('btn-playing');

            const track = def(playlistId)
                ? HTMLDATA.playlists[playlistId].tracks[trackId]
                : HTMLDATA.tracks[trackId];

            const callback = res => {
                HTMLDATA.playing.id = track.id;
                HTMLDATA.playing.src = res;
                HTMLDATA.playing.target = {
                    trackId: trackId,
                    playlistId: playlistId,
                };

                track.stream = res;

                this.play(element);
                audioTitle.textContent = track.title;
            };

            if (def(track.stream)) {
                callback(track.stream);
            } else {
                fetch(`./sc.php?type=audio&id=${track.id}`)
                    .then(r => r.text())
                    .then(callback);
            }
        }
    }

    play(e) {
        this.removeclass();
        HTMLDATA.playing.state = true;

        $(e).addClass('btn-playing');
        $(e).children('img').attr('src', 'assets/pause.svg');
        $(e).children('span').text('Pause');

        this.show();

        this.audioPlayer.src = HTMLDATA.playing.src;
        this.audioPlayer.play();
    }

    pause() {
        this.removeclass();
        this.audioPlayer.pause();
    }

    resume(e) {
        this.removeclass();

        $(e).addClass('btn-playing');
        $('.btn-playing').children('img').attr('src', 'assets/pause.svg');
        $('.btn-playing').children('span').text('Pause');

        this.audioPlayer.play();
    }

    removeclass() {
        if ($('.btn-playing').length != 0) {
            $('.btn-playing').children('img').attr('src', 'assets/play.svg');

            $('.btn-playing').children('span').text('Play');

            $('.btn-playing').removeClass('btn-playing');
        }
    }

    refresh() {
        setTimeout(() => {
            if (!this.audioPlayer.paused || this.audioPlayer.readyState != 4) {
                this.show();
            } else {
                this.removeclass();
                this.hide();
                HTMLDATA.playing.state = false;
            }
        }, 1000);
    }

    show() {
        $('.player-cont').removeClass('player-hide');
    }

    hide() {
        $('.player-cont').addClass('player-hide');
    }

    getELement(trackId, playlistId = undefined) {
        return document.querySelector(
            `button[onclick="player.playTrack(${trackId}${
                def(playlistId) ? ',' + playlistId : ''
            })"]`,
        );
    }

    // EVENTS
    ended() {
        if (!autoplay.enable()) {
            return;
        }
        const target = HTMLDATA.playing.target;

        if (target && def(target.trackId)) {
            if (target.playlistId) {
                const playlists = HTMLDATA.playlists[target.playlistId];

                player.playTrack(
                    playlists.tracks.length == +target.trackId + 1
                        ? 0
                        : target.trackId + 1,
                    target.playlistId,
                );
            } else {
                player.playTrack(target.trackId, target.playlistId, true);
            }
        }
    }
}
player = new playerClass('audio-controls');

function setAutoPlay() {
    autoplay.enable = val => {
        if (def(val)) {
            autoplay.setAttribute('enable', val);
            return (HTMLDATA.playing.autoplay = val);
        } else {
            return autoplay.getAttribute('enable') == 'true';
        }
    };
    autoplay.toggle = val => autoplay.enable(!autoplay.enable());
    autoplay.onclick = autoplay.toggle;
}

$(() => {
    document.getElementById('audio-controls').onpause = function (e) {
        player.refresh();
    };
    document.getElementById('audio-controls').onplay = function (e) {
        player.refresh();
    };
    setAutoPlay();
});
