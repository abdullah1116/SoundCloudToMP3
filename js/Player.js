function player() {
    var audioPlayer = document.getElementById('audio-controls');

    return {
        play: e => {
            player().removeclass();
            HTMLDATA.playing.state = true;

            $(e).addClass('btn-playing');
            $(e).children('img').attr('src', 'assets/pause.svg');
            $(e).children('span').text('Pause');

            player().show();

            audioPlayer.src = HTMLDATA.playing.src;
            audioPlayer.play();
        },
        pause: () => {
            player().removeclass();
            audioPlayer.pause();
        },
        resume: e => {
            player().removeclass();

            $(e).addClass('btn-playing');
            $('.btn-playing').children('img').attr('src', 'assets/play.svg');
            $('.btn-playing').children('span').text('Pause');

            audioPlayer.play();
        },

        removeclass: () => {
            if ($('.btn-playing').length != 0) {
                $('.btn-playing')
                    .children('img')
                    .attr('src', 'assets/play.svg');

                $('.btn-playing').children('span').text('Play');

                $('.btn-playing').removeClass('btn-playing');
            }
        },

        refresh: () => {
            setTimeout(() => {
                if (!audioPlayer.paused || audioPlayer.readyState != 4) {
                    player().show();
                } else {
                    player().removeclass();
                    player().hide();
                    HTMLDATA.playing.state = false;
                }
            }, 1000);
        },

        show: () => {
            $('.player-cont').removeClass('player-hide');
        },

        hide: () => {
            $('.player-cont').addClass('player-hide');
        },
    };
}

$(() => {
    document.getElementById('audio-controls').onpause = function (e) {
        player().refresh();
    };
    document.getElementById('audio-controls').onplay = function (e) {
        player().refresh();
    };
});
