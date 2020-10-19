
function RenderContainer(Top) {
    var HTML = ""
    const rendList = (d, listIndex) => {
        let list = ""
        d.tracks.map((d, i) => { //playlist inner list 
            list += `<div class="listItem  rounded">
                        <img  src="${d.image}" class="ListSoundImg rounded" alt="Image Not Found">
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
                                <img src="./assets/${HTMLDATA.playing.state ? HTMLDATA.playing.id == d.id ? "pause" : "play" : "play"}.svg" >
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
                `<div class="m-3 p-2 item rounded">
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
                              class="soundBackImg rounded" 
                              alt="Image Not Found">
                    </div>
                    <p class="soundArtist">${d.user}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`);
        })

        HTMLDATA.playlists.map((d, i) => {

            if (d.tracks.length != 0) {
                HTML += (
                    `<div class="m-3 p-2 item rounded">                
                    <div class="imgCont">
                        <div class="listCont rounded">${rendList(d, i)}</div>
                        <img  src="${d.image}" class="soundBackImg rounded" alt="Image Not Found">                        
                    </div>
                    <p class="soundArtist">${d.user}</p>
                    <p class="soundTitle">${d.title}</p>
                </div>`);
            }
        })

    } else {//ListView render

        HTMLDATA.tracks.map((d, i) => {
            HTML += (
                `<div class="mx-3 my-1 p-2 itemList Row  w-100 shadow rounded ">
                        
                        <div class="imgContList">
                            <img src="${d.image}"
                            class="soundBackImgList rounded" alt="Image Not Found">
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
                        <div class="mx-3 my-1 p-2 playlistItemList w-100 shadow rounded ">
                        <div class="mb-1 playlistItemListInner">
                            <a type="track" index="${i}"></a>
                            <div class="imgContList">
                                <img src="${d.image}"
                                class="soundBackImgList rounded" alt="Image Not Found">
                            </div>
                            <div class="p-3">
                                <p class="soundArtist">${d.user}</p>
                                <p class="soundTitle">${d.title}</p>
                            </div>                            
                        </div>
                        <div class="playlistContList rounded">${rendList(d, i)}</div>
                    </div>`);
            }
        })
    }
    $("#Container")[0].innerHTML = Top == undefined || Top == "" ? HTML : Top + HTML;
}
