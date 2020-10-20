
function player() {
    var audioPlayer = document.getElementById("audioControls");
    return {
        show: (e) => {
            $(".playerCont").animate({ bottom: "0px" });
        },
        play: (e) => {
            player().resume(e)
            audioPlayer.src = HTMLDATA.playing.src;
            audioPlayer.play();
        },
        pause: () => {
            $(".playerCont").animate({ bottom: "-55" });
            $(".btn-playing").children()[0].src = "assets/play.svg";
            $(".btn-playing").removeClass("btn-playing");

            audioPlayer.pause();

        },
        resume: (e) => {
            $(".playerCont").animate({ bottom: "0px" });
            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";
        },
        stop: () => {
            $(".playerCont").animate({ bottom: "-55" });
        }
    }

}
