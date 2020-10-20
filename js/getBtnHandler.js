function getBtnHandler(e, downlaod) {


    if ($(e).parent().attr("type") == "track") {
        var item = HTMLDATA.tracks[$(e).parent().attr("index")];
    } else if ($(e).parent().attr("type") == "playlistTrack") {
        var item = HTMLDATA.playlists[$(e).parent().attr("listIndex")].tracks[$(e).parent().attr("index")];
    }

    if (downlaod) {
        // FileHandler(item.id, item.title, downlaod);

        // window.location = "../download/?link=" + item.link;
        window.open("../download/?link=" + item.link, '_blank');

        // /http://localhost/download/?link=https://soundcloud.com/user660378/2012-28
    } else {
        if (HTMLDATA.playing.id == item.id) {

            var audioplayer = document.getElementById("audioControls");

            if (HTMLDATA.playing.state == true) {

                player().pause(e)
                // $(".btn-playing").children()[0].src = "assets/play.svg";
                // $(".btn-playing").removeClass("btn-playing");

                // audioplayer.pause();

            } else {

                // $(e).addClass("btn-playing");
                // $(e).children()[0].src = "assets/pause.svg";

                // audioplayer.src = HTMLDATA.playing.src;
                // audioplayer.play();
                player().play(e);

            }
            HTMLDATA.playing.state = !HTMLDATA.playing.state;

        } else {
            if (HTMLDATA.playing.state == true && $(".btn-playing").children().length != 0) {
                // $(".btn-playing").children()[0].src = "assets/play.svg";
                // $(".btn-playing").removeClass("btn-playing");
                player().pause(e)
            }
            player().resume(e);

            // $(e).addClass("btn-playing");
            // $(e).children()[0].src = "assets/pause.svg";
            $(".audioTitle").text(item.title)

            HTMLDATA.playing.id = item.id;
            HTMLDATA.playing.state = true;


            FileHandler(item.id, item.title, downlaod);
        }

    }


    function FileHandler(id, fileName, downlaod) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.response != "") {
                if (downlaod) {
                    let downXhr = new XMLHttpRequest();
                    downXhr.overrideMimeType('application/octet-stream');
                    downXhr.responseType = 'blob';
                    downXhr.open('GET', this.response);
                    downXhr.send();
                    downXhr.onprogress = (event) => {
                        console.log((event.loaded / event.total * 100 | 0));
                    }
                    downXhr.onload = function (e) {
                        if (this.status == 200) {
                            var blob = this.response;
                            var a = document.createElement("a");
                            var blobUrl = window.URL.createObjectURL(new Blob([blob], { type: blob.type }));
                            document.body.appendChild(a);
                            a.style = "display: none";
                            a.href = blobUrl;
                            a.download = fileName + ".mp3";
                            a.click();
                        }
                    }
                } else {
                    HTMLDATA.playing.src = this.response;
                    if (HTMLDATA.playing.state == true) {
                        var player = document.getElementById("audioControls");
                        player.src = this.response;
                        player.play();
                    }
                }
            }
        });
        xhr.open("GET", `../sc.php?type=audio&id=${id}`);
        xhr.send();
    }
}