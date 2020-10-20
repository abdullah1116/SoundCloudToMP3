HTMLDATA = {

    playing: {
        id: "",
        src: "",
        state: false,
    },
    searched: {},
    isGridView: false,

};

function searchHandler(searchText) {

    HTMLDATA.searched.link = `../sc.php?type=link&link=${searchText}`

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.responseType = 'json';
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.response != null && !this.response.error) {
            HTMLDATA.tracks = [];
            HTMLDATA.playlists = [];
            HTMLDATA = { ...HTMLDATA, ...this.response.content };
            // RenderContainer();
            renderDownload()
            // $(".glowThis").removeClass("glow");
            // $("body").removeClass("searching");
        }
    });
    xhr.open("GET", HTMLDATA.searched.link);
    xhr.send();


    // $(".glowThis").addClass("glow");
    // $("body").addClass("searching");
}

$(() => {
    let para = new URL(window.location.href).searchParams.get('link');
    if (para != null) {
        searchHandler(para);
    } else {
        window.location = window.origin;
    }
}
)
function renderDownload() {
    $(".soundTitle").text(HTMLDATA.tracks[0].title);
    $(".soundArtist").text(HTMLDATA.tracks[0].user);
    $(".image")[0].src = (HTMLDATA.tracks[0].image.replace("-large", "-t500x500"));
    $('.hideOnSearch').show()

}

function downloadBtnHandler() {
    FileHandler(HTMLDATA.tracks[0].id, HTMLDATA.tracks[0].title)
}

function FileHandler(id, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.response != "") {
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

        }
    });
    xhr.open("GET", `../sc.php?type=audio&id=${id}`);
    xhr.send();
}