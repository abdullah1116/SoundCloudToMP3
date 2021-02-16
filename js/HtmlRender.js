function RenderContainer() {
    var HTML = '';
    const rendList = (d, listIndex) => {
        let list = '';
        d.tracks.forEach((d, i) => {
            //playlist inner list
            list += `<a class="list-item  rounded" href="${downloadLink(
                d.link,
            )}" target="_blank">
                <img  src="${d.image}" alt="Image Not Found"/>
                <p class="playlist-track-title">${d.title}</p>                
                <button
                    type="button"
                    class="btn def-color ${
                        HTMLDATA.playing.state
                            ? HTMLDATA.playing.id == d.id
                                ? 'btn-playing'
                                : ''
                            : ''
                    } btn-orange listdown-btn"
                    onclick="getBtnHandler(this,false,${i},${listIndex})">
                    <img src="./assets/${
                        HTMLDATA.playing.state && HTMLDATA.playing.id == d.id
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
            <div class="item"  href="./download/?link=${
                d.link
            }" target="_blank">
                <button
                    type="button"
                    class="btn def-color ${
                        HTMLDATA.playing.state
                            ? HTMLDATA.playing.id == d.id
                                ? 'btn-playing '
                                : ''
                            : ''
                    } btn-orange down-btn"
                    onclick="getBtnHandler(this,false,${i})"
                >
                <span>${
                    HTMLDATA.playing.state && HTMLDATA.playing.id == d.id
                        ? 'Pause'
                        : 'Play'
                }</span>
                    <img
                        src="./assets/${
                            HTMLDATA.playing.state &&
                            HTMLDATA.playing.id == d.id
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
            </div>`;
        });

        HTMLDATA.playlists.forEach((d, i) => {
            if (d.tracks.length != 0) {
                HTML += `<div class="item item-link rounded">
                    <div class="img-cont">
                        <div class="list-cont custom-scroll rounded" style="background-image:url(${
                            d.image
                        })">${rendList(d, i)}
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
            HTML += `<div class="item-list item-link Row w-100 rounded" href="./download/?link=${downloadLink(
                d.link,
            )}" target="_black">
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
                            HTMLDATA.playing.state &&
                            HTMLDATA.playing.id == d.id
                                ? 'btn-playing'
                                : ''
                        } btn-orange def-color down-btn playlist-down-btn" onclick="getBtnHandler(this,false,${i})">
                            <span>${
                                HTMLDATA.playing.state &&
                                HTMLDATA.playing.id == d.id
                                    ? 'Pause'
                                    : 'Play'
                            }</span>
                            <img src="./assets/${
                                HTMLDATA.playing.state &&
                                HTMLDATA.playing.id == d.id
                                    ? 'pause'
                                    : 'play'
                            }.svg" class="playlist-down-btn-img"
                                alt="Play track"
                                />
                        </button>
                        </div>
                    </div>`;
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
