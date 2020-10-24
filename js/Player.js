
function player() {
    var audioPlayer = document.getElementById("audioControls");

    return {

        play: (e) => {
            player().removeclass();

            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";

            player().show();

            audioPlayer.src = HTMLDATA.playing.src;
            audioPlayer.play();
        },
        pause: () => {
            player().removeclass();
            audioPlayer.pause();

        },
        resume: (e) => {
            player().removeclass();


            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";
            audioPlayer.play();
        },

        removeclass: () => {
            if ($(".btn-playing").length != 0) {
                $(".btn-playing").children()[0].src = "assets/play.svg";
                $(".btn-playing").removeClass("btn-playing");
            }
        },

        refresh: () => {
            setTimeout(() => {
                console.warn(!audioPlayer.paused);
                if (!audioPlayer.paused || audioPlayer.readyState != 4) {
                    player().show();
                } else {
                    player().removeclass();
                    player().hide();
                    HTMLDATA.playing.state = false;
                }
            }, 1000)
        },



        show: () => {
            $(".playerCont").removeClass("playerHide");
        },

        hide: () => {
            $(".playerCont").addClass("playerHide")
        }
    }

}
$(() => {
    document.getElementById('audioControls').onpause = function (e) {
        player().refresh();
        // player().hide();
        // player().removeclass();

    }
    document.getElementById('audioControls').onplay = function (e) {
        player().refresh();
    }
})