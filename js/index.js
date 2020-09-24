HTMLDATA = {};
isGridView = true;

function searchHandler(e) {

    if ($("#SearchInput").val() != "") {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.responseType = 'json';
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.response.error) {
                    alert("error: Please try again");
                    return;
                }

                console.log("xhr done");
                HTMLDATA = this.response.content
                RenderContainer()
                $(".glowThis").removeClass("glow");
            }
        });


        xhr.open("GET", `sc.php?type=search&search=${$("#SearchInput").val()}`);

        xhr.send();
        $(".glowThis").addClass("glow");
    }
}

function RenderContainer() {
    const rendList = (d, listIndex) => {
        let html = ""
        d.tracks.map((d, i) => {
            html += `<div class="listItem  border rounded">
                        <img  src="${d.image}" class="ListSoundImg border rounded" alt="Image Not Found">
                        <p class="playlistTrackTitle">${d.title}</p>
                        <a type="playlistTrack" class="btn-group listDownBtncont" listIndex="${listIndex}" index="${i}" class="btn-group">
                            <button
                                type="button"
                                class="btn btn-orange defColor listDownBtn"
                                onclick="getBtnHandler(this,true)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn btn-orange defColor listDownBtn"
                                onclick="getBtnHandler(this,false)">
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
                                onclick="getBtnHandler(this,true)">
                                <img src="./assets/down.svg">
                            </button>
                            <button
                                type="button"
                                class="btn btn-orange defColor playBtn"
                                onclick="getBtnHandler(this,false)">
                                <img src="./assets/play.svg">
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
                </div>`)
        })

        HTMLDATA.playlists.map((d, i) => {

            if (d.tracks.length != 0) {
                $("#Container").append(
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
                </div>`)
            }
        })

    } else {

        HTMLDATA.tracks.map((d, i) => {
            $("#Container").append(
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
                        <a type="track" index="${i}" class="btn-group">
                            <button type="button" class="btn btn-orange defColor playlistDownBtn" onclick="getBtnHandler(this,true)">
                                Download
                                <img src="./assets/down.svg" class="playlistDownBtnImg">
                            </button>
                            <button type="button" class="btn btn-orange defColor playlistPlayBtn" onclick="getBtnHandler(this,false)">
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
                                <img src="${d.image}"
                                class="soundBackImgList border rounded" alt="Image Not Found">
                            </div>
                            <div class="p-3">
                                <p class="soundArtist">${d.user}</p>
                                <p class="soundTitle">${d.title}</p>
                            </div>                            
                        </div>
                        <div class="playlistContList border rounded">${rendList(d, i)}</div>
                    </div>`)
            }
        })
    }
}



function getBtnHandler(e, downlaod) {
    if ($(e).parent().attr("type") == "track") {
        let item = HTMLDATA.tracks[$(e).parent().attr("index")]
        get(item.id, item.title, downlaod)
    } else if ($(e).parent().attr("type") == "playlistTrack") {
        let item = HTMLDATA.playlists[$(e).parent().attr("listIndex")].tracks[$(e).parent().attr("index")]
        get(item.id, item.title, downlaod)
    }
    function get(id, fileName, downlaod) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.response != "") {
                if (downlaod) {
                    // let a = document.createElement('a');
                    // a.href = this.response;
                    // a.download = fileName;
                    // document.body.appendChild(a);
                    // a.click();

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
                    var x = document.getElementById("audioControls");
                    x.src = this.response;
                    x.play();
                }
            }
        });
        xhr.open("GET", `sc.php?type=audio&id=${id}`);
        xhr.send();
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

