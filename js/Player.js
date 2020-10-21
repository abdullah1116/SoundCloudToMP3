
function player() {
    var audioPlayer = document.getElementById("audioControls");

    return {
        show: (e) => {
            // $(".playerCont").animate({ bottom: "0px" });
            $(".playerCont").removeClass("playerHide");

        },
        play: (e) => {
            player().resume(e)
            audioPlayer.src = HTMLDATA.playing.src;
            audioPlayer.play();
        },
        pause: () => {
            // $(".playerCont").animate({ bottom: "-55" });            
            $(".playerCont").addClass("playerHide");
            $(".btn-playing").children()[0].src = "assets/play.svg";
            $(".btn-playing").removeClass("btn-playing");

            audioPlayer.pause();

        },
        resume: (e) => {
            // $(".playerCont").animate({ bottom: "0px" });
            $(".playerCont").removeClass("playerHide");
            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";
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
})