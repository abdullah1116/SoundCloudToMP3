HTMLDATA = {};
isGridView = true;
Player = new Audio;
Player2 = new Audio;


SC.initialize({ client_id: "86b6a66bb2d863f5d64dd8a91cd8de94" });

// find all sounds of buskers licensed under 'creative commons share alike'
const get = {
    it: (e) => { // e = event          
        if ($("#SearchInput").val() != "") {
            get.track($("#SearchInput").val())
            $(".glowThis").addClass("glow");
        }

    },
    track: (text) => {
        var fn = (data) => {
            HTMLDATA.tracks = data;
            get.playlists($("#SearchInput").val())
        }

        get.sendReq("/tracks", text, fn);
    },
    playlists: (text, fn) => {
        var fn = (data) => {
            HTMLDATA.playlists = data;
            RenderContainer()
            $(".glowThis").removeClass("glow");
        }

        get.sendReq("/playlists", text, fn);
    },
    sendReq: (type, text, fn) => {
        SC.get(type, { q: text }).then(function (res) {
            fn(res)
        });
    },


}
function RenderContainer() {
    const rendList = (d, listIndex) => {
        let html = ""
        d.tracks.map((d, i) => {
            html += `<div class="listItem  border rounded">
                        <img  src="${d.artwork_url ? d.artwork_url : d.user.avatar_url}" class="ListSoundImg border rounded" alt="Image Not Found">
                        <p class="playlistTrackTitle">${d.title}</p>
                        <a type="playlistTrack" class="btn-group listDownBtncont" listIndex="${listIndex}" index="${i}" class="btn-group">                        
                            <button
                                type="button"
                                class="btn btn-orange defColor listDownBtn"
                                onclick="DownBtnHandler(this)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn btn-orange defColor listDownBtn"
                                onclick="PlayBtnHandler(this)">
                                <img src="./assets/play.svg">
                            </button>
                    </a>
                    </div>`
        })
        return (html)
    }

    $("#Container").children().remove()

    if (isGridView) {

        HTMLDATA.tracks.map((d, i) => {
            $("#Container").append(
                `<div class="m-3 p-2 item shadow border rounded">
                        <div class="shadow downBtnCont">
                    <a type="track" index="${i}" class="btn-group">
                            <button
                                type="button"
                                class="btn btn-orange defColor downBtn"
                                onclick="DownBtnHandler(this)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn btn-orange defColor playBtn"
                                onclick="PlayBtnHandler(this)">
                                <img src="./assets/play.svg">
                            </button>
                    </a>
                        </div>
                    <div class="imgCont">            
                        <img  src="${d.artwork_url ? d.artwork_url : d.user.avatar_url}" 
                              class="soundBackImg border rounded" 
                              alt="Image Not Found">
                    </div>
                    <p class="soundArtist">${d.user.username}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`)
        })

        HTMLDATA.playlists.map((d, i) => {
            if (d.tracks.length != 0) {

                $("#Container").append(
                    `<div class="m-3 p-2 item shadow border rounded">                
                    <div class="imgCont">
                        <div class="listCont border rounded">${rendList(d, i)}</div>
                        <a>
                            <img  src="${d.artwork_url ? d.artwork_url : d.user.avatar_url}" 
                                class="soundBackImg border rounded" 
                                alt="Image Not Found">
                        </a>
                    </div>
                    <p class="soundArtist">${d.user.username}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`)
            }
        })
    } else {
        HTMLDATA.tracks.map((d, i) => {
            $("#Container").append(
                `<div class="mx-3 my-1 p-2 itemList Row  w-100 shadow border rounded ">
                        
                        <div class="imgContList">
                            <img src="${d.artwork_url ? d.artwork_url : d.user.avatar_url}"
                            class="soundBackImgList border rounded" alt="Image Not Found">
                        </div>
                        <div class="col p-3">
                                <p class="soundArtist">${d.user.username}</p>
                                <p class="soundTitle">${d.title}</p>
                        </div>
                        <div class="shadow playlistDownBtncont">
                        <a type="track" index="${i}" class="btn-group">
                            <button type="button" class="btn btn-orange defColor playlistDownBtn" onclick="DownBtnHandler(this)">
                                Download
                                <img src="./assets/down.svg" class="playlistDownBtnImg">
                            </button>
                            <button type="button" class="btn btn-orange defColor playlistPlayBtn" onclick="PlayBtnHandler(this)">
                                Play
                                <img src="./assets/play.svg" class="playlistDownBtnImg">
                            </button>
                        </a>
                        </div>
                    </div>`)
        })
        HTMLDATA.playlists.map((d, i) => {
            if (d.tracks.length != 0) {

                $("#Container").append(
                    `
                        <div class="mx-3 my-1 p-2 playlistItemList w-100 shadow border rounded ">
                        <div class="px-3 mb-1 playlistItemListInner">
                            <a type="track" index="${i}"></a>
                            <div class="imgContList">
                                <img src="${d.artwork_url ? d.artwork_url : d.user.avatar_url}"
                                class="soundBackImgList border rounded" alt="Image Not Found">
                            </div>
                            <div class="p-3">
                                <p class="soundArtist">${d.user.username}</p>
                                <p class="soundTitle">${d.title}</p>
                            </div>                            
                        </div>
                        <div class="playlistContList border rounded">${rendList(d, i)}</div>
                    </div>`)
            }
        })
    }
}



function DownBtnHandler(e) {
    if ($(e).parent().attr("type") == "track") {
        let item = HTMLDATA.tracks[$(e).parent().attr("index")]

        download(item.id, item.title, item.downloadable)
    } else if ($(e).parent().attr("type") == "playlistTrack") {
        let item = HTMLDATA.playlists[$(e).parent().attr("listIndex")].tracks[$(e).parent().attr("index")]
        download(item.id, item.title, item.downloadable)
    }

    function download(id, fileName, isDownloadAble) {
        console.log(id + ";" + fileName + ";" + isDownloadAble + ";" + "downloading")


        let link = `http://api.soundcloud.com/tracks/${id}/${isDownloadAble ? "download" : "stream"}?client_id=86b6a66bb2d863f5d64dd8a91cd8de94`
        let xhr = new XMLHttpRequest();
        xhr.overrideMimeType('application/octet-stream');
        xhr.responseType = 'blob';
        xhr.open('GET', link);
        xhr.send();
        xhr.onprogress = (event) => {
            // event.loaded returns how many bytes are downloaded
            // event.total returns the total number of bytes
            // event.total is only available if server sends `Content-Length` header
            // var pre;
            // if (pre != (event.loaded / event.total * 100 | 0)) {
            console.log((event.loaded / event.total * 100 | 0));
            //     pre != (event.loaded / event.total * 100 | 0)
            // }
        }

        xhr.onload = function (e) {
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
    }
}

function PlayBtnHandler(e) {
    if ($(e).parent().attr("type") == "track") {
        let item = HTMLDATA.tracks[$(e).parent().attr("index")]

        play(item.id, item.title, item.downloadable)
    } else if ($(e).parent().attr("type") == "playlistTrack") {
        let item = HTMLDATA.playlists[$(e).parent().attr("listIndex")].tracks[$(e).parent().attr("index")]
        play(item.id, item.title, item.downloadable)
    }
    function play(id, fileName, isDownloadAble) {
        console.log(id + ";" + fileName + ";" + isDownloadAble + ";" + "playing")
        let link = `http://api.soundcloud.com/tracks/${id}/${isDownloadAble ? "download" : "stream"}?client_id=86b6a66bb2d863f5d64dd8a91cd8de94`
        var x = document.getElementById("audioControls");
        x.src = link;
        x.play();
        // x.pause();
        // Player.src = link;
        // Player.play();
    }
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

get.playlists("quran")

