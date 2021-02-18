<!DOCTYPE html>
<html lang="en">
<?php
require_once "../functions/app.php";

require_once APP_PATH . "/functions/soundcloud.php";

if (
    empty($_GET['link']) ||
    empty(parse_url($_GET['link'])['path'])
) {
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ../');
    exit;
}

$_GET['type'] = 'link';
$_GET['details'] = true;

$getLink = getLink();

if (!empty($getLink['tracks'])) {
    $tracks = (object)$getLink['tracks'][0];
} else {
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ../');
    exit;
}


$tracks->link = str_replace('soundcloud.com/', "{$_SERVER['HTTP_HOST']}/download/?link=/", $tracks->link);
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
    <meta property="og:url" content="<?php echo $tracks->link ?>">
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
                "mainEntityOfPage": "https://soundcloudtomp3.live/",
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
                "mainEntityOfPage": "https://soundcloudtomp3.live/",
                "name": "Soundcloudtomp3"
            },
            "alternateName": "Soundcloudtomp3 Playlist Downloader",
            "mainEntityOfPage": "https://soundcloudtomp3.live/",
            "name": "Soundcloudtomp3"
        }
    </script>
    <link rel="icon" href="../assets/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" />
    <link rel="stylesheet" href="../styles/index.css" />
    <link rel="stylesheet" href="../styles/download.css" />
    <link rel="stylesheet" href="../styles/loader.css" />
    <link rel="stylesheet" href="../styles/bootstrap.min.css" />
</head>

<body>
    <!-- navebar -->
    <?php require_once APP_PATH . "/template/nav.php" ?>
    <div class="body-wrapper">
        <div id="header-container" style="background-color: #fdb35e">
            <!-- Search bar -->
            <div class="search-text-cont">
                <span class="title">
                    Download your favorite tracks to your personal storage
                    and enjoy them even when you are offline!
                </span>
            </div>
        </div>

        <!-- tracks Container -->
        <div class="container">
            <div class="my-5 p-5 text-center align-items-center d-flex flex-column hide-on-search bg-white">
                <p>
                <div class="sound-artist"><?php echo $tracks->user ?></div>
                <h1 class="sound-title font-large"><?php echo $tracks->title ?></h1>
                </p>
                <div style="max-width:500px">
                    <img src="<?php echo $tracks->image ?>" class="image rounded" alt="<?php echo $tracks->title ?>" />
                </div>
                <div class="mt-3"><audio controls controlslist="nodownload" src="<?php echo $tracks->stream_url ?>"></audio></div>
                <button type="button" class="btn btn-orange mt-3" onclick="FileHandler(this)" style="background-color: #f50; width: 160px">
                    <span>
                        <span id="download-percent"></span>
                        Download
                    </span>
                    <img src="../assets/down.svg" alt="Download track" style="width:20px"/>
                </button>
                <div class="mt-3" id="fileDetails">
                    <?php echo $tracks->duration ?> |
                    <?php echo $tracks->size ?>
                </div>

            </div>
        </div>
    </div>
    </div>

    <?php require_once  APP_PATH . "/template/footer.php" ?>
</body>

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

                    document.getElementById("download-percent").innerHTML = percent
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
<script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8b58e0488054c6"></script>

</html>