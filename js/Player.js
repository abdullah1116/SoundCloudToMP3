
function player() {
    var audioPlayer = document.getElementById("audioControls");

    return {

        play: (e) => {
            if ($(".btn-playing").length != 0) {
                $(".btn-playing").children()[0].src = "assets/play.svg";
                $(".btn-playing").removeClass("btn-playing");
            }

            // $(".playerCont").removeClass("playerHide");  


            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";

            audioPlayer.src = HTMLDATA.playing.src;
            audioPlayer.play();
        },
        pause: () => {
            // $(".playerCont").animate({ bottom: "-55" });            
            // $(".playerCont").addClass("playerHide");
            $(".btn-playing").children()[0].src = "assets/play.svg";
            $(".btn-playing").removeClass("btn-playing");

            audioPlayer.pause();

        },
        resume: (e) => {
            // $(".playerCont").animate({ bottom: "0px" });

            $(".btn-playing").removeClass("btn-playing");
            // $(".playerCont").removeClass("playerHide");


            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";
        },

        show: () => {
            // $(".playerCont").animate({ bottom: "0px" });
            $(".playerCont").removeClass("playerHide");

        },
        hide: () => {
            $(".playerCont").addClass("playerHide")
            // $(".playerCont").animate({ bottom: "-55" });
        }
    }

}
$(() => {
    document.getElementById('audioControls').onpause = function (e) {
        player().hide();

    }
    document.getElementById('audioControls').onplay = function (e) {
        player().show();
    }
})