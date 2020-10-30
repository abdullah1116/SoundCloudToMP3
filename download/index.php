<html lang="en">
    <head>
        <!-- meta -->

        <!-- meta -->
        <title>SoundCloud To MP3</title>
        <meta
            name="description"
            content="Download your favorite tracks to your personal storage and enjoy them even when you are offline!"
        />
        <meta
            name="Keywords"
            content="soundcloud,mp3,converter,free,online,download"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="content-language" content="en-us" />

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
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-S361HP0XG1"
        ></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag('js', new Date());

            gtag('config', 'G-S361HP0XG1');
        </script>

        <link rel="icon" href="../assets/favicon.ico" />

        <script src="../js/jquery.js?"></script>

        <link rel="stylesheet" href="../styles/bootstrap.min.css?5" />
        <link rel="stylesheet" href="../styles/index.css?5" />
        <link rel="stylesheet" href="../styles/download.css?5" />
        <link rel="stylesheet" href="../styles/loader.css?5" />

        <link
            href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
            rel="stylesheet"
        />
    </head>

    <body style="overflow: overlay; background-color: #fafafa !important">
        <!-- navebar -->
        <nav
            class="navbar navbar-dark navbar-expand-lg fixed-top navbar-light defColor"
        >
            <a class="navbar-brand font-weight-bold ml-5" href="./">
                SoundCloud To MP3
            </a>
        </nav>

        <div class="body-wrapper" style="height: 100%">
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
            <div
                class="my-5 text-center align-items-center d-flex flex-column container hideOnSearch"
                style="display: none !important"
            >
                <div class="ximgContList" style="width: 350px; height: 350px">
                    <img src="" class="image rounded" alt="Image Not Found" />
                </div>
                <div class="p-3">
                    <p class="soundArtist"></p>
                    <p class="soundTitle font-large"></p>
                    <button
                        type="button"
                        class="btn btn-orange"
                        onclick="downloadBtnHandler(this)"
                        style="background-color: #f50; width: 160px"
                    >
                        <span>
                            <span></span>
                            Download
                        </span>
                        <img
                            src="../assets/down.svg"
                            class="playlistDownBtnImg"
                        />
                    </button>
                </div>
                <div style="color: #0009">
                    <span id="fileDetails"></span>
                </div>
            </div>
        </div>
    </body>

    <script src="../js/download.js?"></script>
</html>
