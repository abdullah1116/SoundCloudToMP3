<html lang="en">
<?php
require_once "../functions/app.php";

require_once APP_PATH . "/functions/soundcloud.php";


// var_dump(parse_url($_GET['link']));
// die;
if (
    empty($_GET['link']) ||
    empty(parse_url($_GET['link'])['host']) ||
    parse_url($_GET['link'])['host'] != 'soundcloud.com'
) {
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ../');
    exit;
}

$_GET['type'] = 'link';
$_GET['details'] = true;

// var_dump(
$getLink = getLink()
    // )
    // 
;

if (!empty($getLink['tracks'])) {
    $tracks = (object)$getLink['tracks'][0];

    // var_dump($tracks);
} else {
    die;
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ../');
    exit;
}

?>

<head>
    <!-- meta -->
    <title>Download <?php echo $tracks->title ?> | <?php echo APP_NAME ?></title>
    <meta name="description" content="Download <?php echo $tracks->title ?> your personal storage and enjoy it even when you are offline!" />
    <meta name="keywords" content="soundcloud,mp3,converter,free,online,download,<?php echo $tracks->title ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="content-language" content="en-us" />

    <meta property="og:title" content="<?php echo $tracks->title ?> | <?php echo APP_NAME ?>">
    <meta property="og:description" content="Download <?php echo $tracks->title ?> your personal storage and enjoy it even when you are offline!">
    <meta property="og:image" content="<?php echo $tracks->image ?>">
    <meta property="og:url" content="https://soundcloudtomp3.live/download/?link=<?php echo $tracks->link ?>">
    <meta name="twitter:card" content="<?php echo $tracks->image ?>">
    <meta property="og:site_name" content="<?php echo APP_NAME ?>">




    <script type="application/ld+json">
        {
            "@context": "http://schema.org/",
            "@type": "SoftwareApplication",
            "applicationCategory": "BrowserApplication",
            "operatingSystem": ["Windows", "macOS", "Android", "iOS"],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingCount": "1019",
                "reviewCount": "1019",
                "bestRating": "6",
                "ratingValue": "6",
                "worstRating": "1",
                "alternateName": "Soundcloudtomp3 live",
                "mainEntityOfPage": "http://www.soundcloudtomp3.live/",
                "name": "Soundcloudtomp3"
            },
            "alternativeHeadline": "Soundcloud Playlist Downloader",
            "copyrightYear": "2020",
            "headline": "Soundcloudtomp3",
            "keywords": "Soundcloudtomp3, download soundcloud, soundcloud downloader, soundcloud to mp3 converter, soundcloud to mp3, download from soundcloud, soundcloud converter, soundcloud mp3, soundcloud playlist downloader, soundcloud downloader playlist, download playlist soundcloud, how to download from soundcloud, how to download from soundcloud",
            "offers": {
                "@type": "Offer",
                "price": "0.0",
                "priceCurrency": "USD",
                "alternateName": "Soundcloudtomp3",
                "description": "soundcloud downloader",
                "mainEntityOfPage": "http://www.soundcloudtomp3.live/",
                "name": "Soundcloudtomp3"
            },
            "alternateName": "Soundcloudtomp3 Playlist Downloader",
            "mainEntityOfPage": "http://www.soundcloudtomp3.live/",
            "name": "Soundcloudtomp3"
        }
    </script>
    <link rel="icon" href="../assets/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" />
    <link rel="stylesheet" href="../styles/index.css?6" />
    <link rel="stylesheet" href="../styles/download.css?6" />
    <link rel="stylesheet" href="../styles/loader.css" />
    <link rel="stylesheet" href="../styles/bootstrap.min.css" />


    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S361HP0XG1"></script>
    <script src="../js/analytics.js?"></script>
    <script src="../js/jquery.js?"></script>
</head>

<body style="overflow: overlay;">
    <!-- navebar -->
    <?php require_once "../template/nav.php" ?>
    <div class="body-wrapper">
        <div id="header-container" style="background-color: #fdb35e">
            <!-- Search bar -->
            <div class="searchTextCont">
                <span class="title">
                    Download your favorite tracks to your personal storage
                    and enjoy them even when you are offline!
                </span>
            </div>
        </div>

        <!-- tracks Container -->
        <div class="my-5 text-center align-items-center d-flex flex-column container hideOnSearch">
            <div class="ximgContList" style="width: 350px; height: 350px">
                <img src="<?php echo $tracks->image ?>" class="image rounded" alt="<?php echo $tracks->title ?>" />
            </div>
            <div class="p-3">
                <p class="soundArtist"><?php echo $tracks->user ?></p>
                <p class="soundTitle font-large m-0"><?php echo $tracks->title ?></p>
                <div class="mb-3"><audio controls src="<?php echo $tracks->stream_url ?>"></audio></div>
                <button type="button" class="btn btn-orange" onclick="FileHandler(this)" style="background-color: #f50; width: 160px">
                    <span>
                        <span></span>
                        Download
                    </span>
                    <img src="../assets/down.svg" class="playlistDownBtnImg" />
                </button>
                <div style="color: #0009">
                    <span id="fileDetails">
                        <?php echo $tracks->duration ?> |
                        <?php echo $tracks->size ?>
                    </span>
                </div>
            </div>

        </div>
    </div>
    </div>

    <?php require_once "../template/footer.php" ?>
</body>

<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script>
    function FileHandler(e) {
        const id = <?php echo $tracks->id ?>;
        const fileName = `<?php echo $tracks->title ?>`;

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4 && this.response != '') {
                let downXhr = new XMLHttpRequest();
                downXhr.overrideMimeType('application/octet-stream');
                downXhr.responseType = 'blob';
                downXhr.open('GET', this.response);
                downXhr.send();
                downXhr.onprogress = event => {
                    let percent =
                        (((event.loaded / event.total) * 100) | 0).toFixed() + '%';

                    $(e).children('span').children('span').text(percent);
                };
                downXhr.onload = function(e) {
                    if (this.status == 200) {
                        var blob = this.response;
                        var a = document.createElement('a');
                        var blobUrl = window.URL.createObjectURL(
                            new Blob([blob], {
                                type: blob.type
                            }),
                        );
                        document.body.appendChild(a);
                        a.style = 'display: none';
                        a.href = blobUrl;
                        a.download = fileName + '.mp3';
                        a.click();
                    }
                };
            }
        });
        xhr.open('GET', `../sc.php?type=audio&id=${id}`);
        xhr.send();
    }
</script>
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8b58e0488054c6" async></script>

</html>