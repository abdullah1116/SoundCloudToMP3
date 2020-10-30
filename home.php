<html lang="en" class="custom-scroll home">
<?php require_once "./functions/app.php" ?>

<head>
    <!-- meta -->
    <title>SoundCloud To MP3</title>
    <meta name="description" content="Download your favorite tracks to your personal storage and enjoy them even when you are offline!" />
    <meta name="Keywords" content="soundcloud,mp3,converter,free,online,download" />
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
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S361HP0XG1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'G-S361HP0XG1');
    </script>

    <!-- js -->
    <script src="./js/jquery.js?"></script>
    <script src="./js/jquery-ui.js?"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <script src="./js/Player.js?"></script>
    <script src="./js/getBtnHandler.js?"></script>
    <script src="./js/HtmlRender.js?"></script>

    <!-- css -->
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous" />
    <link rel="stylesheet" href="./styles/index.css?5" />
    <link rel="stylesheet" href="./styles/loader.css?5" />
    <link rel="stylesheet" href="./styles/jquery-ui.css?5" />

    <link rel="icon" href="./assets/favicon.ico" />
</head>

<body style="overflow: overlay; background-color: #fafafa !important">
    <!-- navebar -->
    <!-- <nav class="navbar navbar-dark font-weight-bold shadow defColor">
            <a class="navbar-brand" href="./">SoundCloud To MP3</a>
        </nav> -->
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
    <?php require_once "./template/nav.php" ?>
    <div class="body-wrapper">
        <div id="header-container" style="background-color: #fdb35e">
            <!-- Search bar -->
            <div class="searchTextCont">
                <span class="title">
                    Download your favorite tracks to your personal storage
                    and enjoy them even when you are offline!
                </span>

                <div class="searchCont shadow w-100 p-2 mt-4">
                    <div class="input-group input-group-sm glowThis">
                        <input type="text" class="form-control" placeholder="Enter a name or url..." id="SearchInput" autofocus />
                        <div class="input-group-append">
                            <span class="input-group-text font-weight-bold defColor px-3" id="SearchBtn" onclick="searchHandler()">
                                Search
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- heading Container -->
            <div class="mt-3 hideOnSearch text-center" id="heading"></div>

            <!-- result layout selector -->
            <div class="viewBtnCont text-right hideOnSearch">
                <div class="input-group input-group-sm shadow viewSelecCont">
                    <img src="./assets/list.svg" viewType="list" class="viewSelectImg" style="margin-right: -5px" alt="" />
                    <img src="./assets/grid.svg" viewType="grid" class="viewSelectImg viewSelectImg-selected" alt="" />
                </div>
            </div>

            <!-- tracks Container -->
            <div class="mb-5 mt-2 hideOnSearch" id="Container"></div>

            <!-- how to use -->
            <div class="tipsCont" id="how-to-use">
                <div class="tips">
                    <span class="tipsTitle">How to Use</span>
                    <p class="p-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Magnam, aliquid possimus officia quasi animi
                        temporibus sit id, esse earum cupiditate veritatis
                        deleniti aspernatur fuga recusandae nam sed? Sunt,
                        laudantium alias!
                    </p>
                </div>
            </div>

            <!-- Contact us -->
            <div class="tipsCont" id="contact-us">
                <div class="tips">
                    <span class="tipsTitle">Contact us</span>
                    <p class="p-3">
                        <a href="mailto:suggestion@soundcoludtomp3.live">
                            suggestion@soundcoludtomp3.live
                        </a>
                    </p>
                </div>
            </div>

            <!-- Playlist downloader -->
            <div class="tipsCont" id="playlist-downloader">
                <div class="tips">
                    <span class="tipsTitle">Playlist downloader</span>
                    <!-- <p class="p-3">
                    Lorem ipsum
                </p> -->
                </div>
            </div>
        </div>

        <?php require_once "./template/footer.php" ?>

        <div class="p-1 col-lg-4 menu playerCont playerHide">
            <div class="playerBtn">
                <img src="./assets/UpArrow.svg" onclick="showHandler()" alt="" />
            </div>
            <div class="audioPanelCont">
                <p class="audioTitle"></p>
            </div>
            <audio noDownload controls id="audioControls" controlsList="nodownload"></audio>
            <div class="download"></div>
            <span class="playerSpace"></span>
        </div>
    </div>

    <div class="loaderBody showOnSearch">
        <div class="a" style="--n: 5">
            <div class="dot" style="--i: 0"></div>
            <div class="dot" style="--i: 1"></div>
            <div class="dot" style="--i: 2"></div>
            <div class="dot" style="--i: 3"></div>
            <div class="dot" style="--i: 4"></div>
        </div>
    </div>
</body>
<script src="./js/index.js?"></script>

</html>