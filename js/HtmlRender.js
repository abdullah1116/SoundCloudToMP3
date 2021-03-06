function RenderContainer() {
    var HTML = '';
    const rendList = (d, listIndex) => {
        let list = '';
        d.tracks.forEach((d, i) => {
            //playlist inner list
            list += `<a href="${downloadLink(d.link)}"
            class="a_nostyle list-item rounded" target="_blank">
                <img  src="${d.image}" alt="Image Not Found"/>
                <p class="playlist-track-title">${d.title}</p>                
                <button
                    type="button"
                    class="btn def-color ${
                        HTMLDATA.playing.state
                            ? isPlaying(i, listIndex)
                                ? 'btn-playing'
                                : ''
                            : ''
                    } btn-orange listdown-btn"
                    onclick="player.playTrack(${i},${listIndex})">
                    <img src="./assets/${
                        HTMLDATA.playing.state && isPlaying(i, listIndex)
                            ? 'pause'
                            : 'play'
                    }.svg"
                    alt="Play track"
                    />
                </button>
            </a>`;
        });
        return list;
    };

    // Grid track
    if (HTMLDATA.isGridView) {
        HTMLDATA.tracks.forEach((d, i) => {
            HTML += `
            <a href="${downloadLink(d.link)}"
             class="a_nostyle item" target="_blank">
                <button
                    type="button"
                    class="btn def-color ${
                        HTMLDATA.playing.state && isPlaying(i)
                            ? 'btn-playing '
                            : ''
                    } btn-orange down-btn"
                    onclick="player.playTrack(${i})"
                >
                <span>${
                    HTMLDATA.playing.state && isPlaying(i) ? 'Pause' : 'Play'
                }</span>
                    <img
                        src="./assets/${
                            HTMLDATA.playing.state && isPlaying(i)
                                ? 'pause'
                                : 'play'
                        }.svg"
                        alt="Play track"
                    />
                </button>               
                    <span class="img-cont">
                        <img
                            src="${d.image}"
                            class="sound-back-img"
                            alt="Image Not Found"
                        />
                    </span>
                    <p class="sound-artist">${d.user}</p>
                    <p class="sound-title">${d.title}</p>
            </a>`;
        });

        HTMLDATA.playlists.forEach((d, i) => {
            if (d.tracks.length != 0) {
                HTML += `<div class="item item-link rounded">
                    <div class="img-cont">
                        <div class="list-cont custom-scroll rounded" 
                            style="background-image:url(${d.image})">
                            ${rendList(d, i)}
                        </div>
                    </div>
                    <p class="sound-artist">${d.user}</p>
                    <p class="sound-title">${d.title}</p>
                </div>`;
            }
        });
    } else {
        //ListView render
        HTMLDATA.tracks.forEach((d, i) => {
            HTML += `<a href="${downloadLink(d.link)}"
                        class="a_nostyle item-list item-link Row w-100 rounded" target="_black">
                        <div class="img-cont-list" >
                            <img src="${d.image}"
                            class="sound-back-img-list rounded" alt="Image Not Found"
                            />
                        </div>
                        <div class="col p-3">
                                <p class="sound-artist">${d.user}</p>
                                <p class="sound-title">${d.title}</p>
                        </div>                        
                        <button type="button" class="btn ${
                            HTMLDATA.playing.state && isPlaying(i)
                                ? 'btn-playing'
                                : ''
                        } btn-orange def-color down-btn playlist-down-btn" onclick="player.playTrack(${i})">
                            <span>${
                                HTMLDATA.playing.state && isPlaying(i)
                                    ? 'Pause'
                                    : 'Play'
                            }</span>
                            <img src="./assets/${
                                HTMLDATA.playing.state && isPlaying(i)
                                    ? 'pause'
                                    : 'play'
                            }.svg" alt="Play track"
                                />
                        </button>
                        </a>`;
        });

        HTMLDATA.playlists.forEach((d, i) => {
            if (d.tracks.length != 0) {
                HTML += `
                        <div class="mx-3 my-1 p-2 playlist-item-list item-link w-100 shadow rounded ">
                        <div class="mb-1 playlist-item-list-inner">
                            <a type="track" index="${i}"></a>
                            <div class="img-cont-list">
                                <img src="${d.image}"
                                class="sound-back-img-list rounded" alt="Image Not Found"
                                />
                            </div>
                            <div class="p-3">
                                <p class="sound-artist">${d.user}</p>
                                <p class="sound-title">${d.title}</p>
                            </div>
                        </div>
                        <div class="playlist-cont-list rounded">${rendList(
                            d,
                            i,
                        )}</div>
                    </div>`;
            }
        });
    }
    if (!HTML) {
        HTML = `<span class="align-self-center">
                <h4>Oops no result found with this search, try searching differently.</h4>
            </span>`;
    }

    document.getElementById('container').innerHTML = HTML;
    document.getElementById('title').innerHTML = HTMLDATA.title || '';

    typeof linkedDiv == 'function' && linkedDiv();
}
