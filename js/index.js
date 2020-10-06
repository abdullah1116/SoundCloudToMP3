HTMLDATA = {
    playing: {
        id: "",
        src: "",
        state: false,
    },
    searched: { artist: undefined }
};

isGridView = true;


$(() => {
    let para = new URL(window.location.href).searchParams.get('search');
    console.log(para);
    if (para != null) {
        document.getElementById("SearchInput").value = para;
        searchHandler();
    }

}
)


// function copyHandler() {

//     const el = document.createElement('textarea');
//     el.value = window.location.origin + window.location.pathname + "?search=" + $("#SearchInput").val()
//     document.body.appendChild(el);
//     el.select();
//     document.execCommand('copy');
//     document.body.removeChild(el);

// }

function searchHandler() {
    var searchText = $("#SearchInput").val()



    if (searchText != undefined && searchText != "" && HTMLDATA.searched.title != searchText) {

        HTMLDATA.searched.title = searchText;
        HTMLDATA.searched.link = (/soundcloud.com\//.test(searchText) ? `sc.php?type=link&link=${searchText}` : `sc.php?type=search&search=${searchText}`)

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.response != null && !this.response.error) {

                console.log("xhr done");
                HTMLDATA.tracks = [];
                HTMLDATA.playlists = [];
                HTMLDATA = { ...HTMLDATA, ...this.response.content };
                RenderContainer();
                $(".glowThis").removeClass("glow");
                $("body").removeClass("searching");
                // $(".viewSelecCont").removeClass("d-none");

            } else {
                console.error("error: Please try again");
                return;
            }
        });
        xhr.open("GET", HTMLDATA.searched.link);
        xhr.send();


        $(".glowThis").addClass("glow");
        $("body").addClass("searching");
        // $(".loaderBody").removeClass("loaderHide");

        // $(".viewSelecCont").addClass("d-none");


    } else {
        HTMLDATA.searched.title = "";
    }
}

function getBtnHandler(e, downlaod) {


    if ($(e).parent().attr("type") == "track") {
        var item = HTMLDATA.tracks[$(e).parent().attr("index")];
    } else if ($(e).parent().attr("type") == "playlistTrack") {
        var item = HTMLDATA.playlists[$(e).parent().attr("listIndex")].tracks[$(e).parent().attr("index")];
    }

    if (downlaod) {
        downlaodFile(item.id, item.title, downlaod);
    } else {
        if (HTMLDATA.playing.id == item.id) {

            var player = document.getElementById("audioControls");

            if (HTMLDATA.playing.state == true) {


                $(".btn-playing").children()[0].src = "assets/play.svg";
                $(".btn-playing").removeClass("btn-playing");

                player.pause();

            } else {

                $(e).addClass("btn-playing");
                $(e).children()[0].src = "assets/pause.svg";

                player.src = HTMLDATA.playing.src;
                player.play();

            }
            HTMLDATA.playing.state = !HTMLDATA.playing.state;

        } else {
            if (HTMLDATA.playing.state == true) {
                $(".btn-playing").children()[0].src = "assets/play.svg";
                $(".btn-playing").removeClass("btn-playing");
            }

            $(e).addClass("btn-playing");
            $(e).children()[0].src = "assets/pause.svg";

            HTMLDATA.playing.id = item.id;
            HTMLDATA.playing.state = true;


            downlaodFile(item.id, item.title, downlaod);
        }

    }


    function downlaodFile(id, fileName, downlaod) {
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
        xhr.open("GET", `sc.php?type=audio&id=${id}`);
        xhr.send();
    }
}

function RenderContainer() {
    var HTML = ""
    const rendList = (d, listIndex) => {
        let list = ""
        d.tracks.map((d, i) => { //playlist inner list 
            list += `<div class="listItem  border rounded">
                        <img  src="${d.image}" class="ListSoundImg border rounded" alt="Image Not Found">
                        <p class="playlistTrackTitle">${d.title}</p>
                        <a type="playlistTrack" class="btn-group listDownBtncont defColor" listIndex="${listIndex}" index="${i}" class="btn-group">
                            <button
                                type="button"
                                class="btn btn-orange  listDownBtn"
                                onclick="getBtnHandler(this,true)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn ${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "btn-playing" : "" : ""} btn-orange listDownBtn"
                                onclick="getBtnHandler(this,false)">
                                <img src="./assets/${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "pause" : "play" : "play"}.svg">
                            </button>
                    </a>
                    </div>`
        })
        return (list);
    }

    // $("#Container").children().remove()

    if (isGridView) {

        HTMLDATA.tracks.map((d, i) => {
            HTML += (
                `<div class="m-3 p-2 item shadow border rounded">
                        <div class="shadow downBtnCont">
                    <a type="track" index="${i}" class="btn-group defColor">
                            <button
                                type="button"
                                class="btn btn-orange downBtn"
                                onclick="getBtnHandler(this,true)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn ${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "btn-playing" : "" : ""} btn-orange downBtn"
                                onclick="getBtnHandler(this,false)">
                                <img src="./assets/${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "pause" : "play" : "play"}.svg">
                            </button>
                    </a>
                        </div>
                    <div class="imgCont">            
                        <img  src="${d.image}" 
                              class="soundBackImg border rounded" 
                              alt="Image Not Found">
                    </div>
                    <p class="soundArtist">${d.user}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`);
        })

        HTMLDATA.playlists.map((d, i) => {

            if (d.tracks.length != 0) {
                HTML += (
                    `<div class="m-3 p-2 item shadow border rounded">                
                    <div class="imgCont">
                        <div class="listCont border rounded">${rendList(d, i)}</div>
                        <a>
                            <img  src="${d.image}" 
                                class="soundBackImg border rounded" 
                                alt="Image Not Found">
                        </a>
                    </div>
                    <p class="soundArtist">${d.user}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`);
            }
        })

    } else {//ListView render

        HTMLDATA.tracks.map((d, i) => {
            HTML += (
                `<div class="mx-3 my-1 p-2 itemList Row  w-100 shadow border rounded ">
                        
                        <div class="imgContList">
                            <img src="${d.image}"
                            class="soundBackImgList border rounded" alt="Image Not Found">
                        </div>
                        <div class="col p-3">
                                <p class="soundArtist">${d.user}</p>
                                <p class="soundTitle">${d.title}</p>
                        </div>
                        <div class="shadow playlistDownBtncont">
                        <a type="track" index="${i}" class="btn-group defColor">
                            <button type="button" class="btn btn-orange playlistDownBtn"  onclick="getBtnHandler(this,true)">
                                Download
                                <img src="./assets/down.svg" class="playlistDownBtnImg" >
                            </button>
                            <button type="button" class="btn ${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "btn-playing" : "" : ""} btn-orange playlistDownBtn" onclick="getBtnHandler(this,false)">
                                Play
                                <img src="./assets/${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "pause" : "play" : "play"}.svg" class="playlistDownBtnImg">
                            </button>
                        </a>
                        </div>
                    </div>`);
        })

        HTMLDATA.playlists.map((d, i) => {
            if (d.tracks.length != 0) {
                HTML += (
                    `
                        <div class="mx-3 my-1 p-2 playlistItemList w-100 shadow border rounded ">
                        <div class="px-3 mb-1 playlistItemListInner">
                            <a type="track" index="${i}"></a>
                            <div class="imgContList">
                                <img src="${d.image}"
                                class="soundBackImgList border rounded" alt="Image Not Found">
                            </div>
                            <div class="p-3">
                                <p class="soundArtist">${d.user}</p>
                                <p class="soundTitle">${d.title}</p>
                            </div>                            
                        </div>
                        <div class="playlistContList border rounded">${rendList(d, i)}</div>
                    </div>`);
            }
        })
    }
    $("#Container")[0].innerHTML = HTML;
}




document.getElementById("SearchInput").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("SearchBtn").click();
    }
});

$(".viewSelectImg").click((e) => {

    if (!$($(e)[0].target).hasClass("viewSelectImg-selected")) {
        $(".viewSelectImg").toggleClass("viewSelectImg-selected");
        isGridView = !isGridView;
        RenderContainer();
    }
})
