<!DOCTYPE html>
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



    <script src="./js/jquery.js"></script>

    <!-- css -->
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./styles/bootstrap.min.css" />
    <link rel="stylesheet" href="./styles/index.css?v=4" />
    <link rel="stylesheet" href="./styles/loader.css" />
    <link rel="stylesheet" href="./styles/jquery-ui.css" />

    <link rel="icon" href="./assets/favicon.ico" />
</head>

<body>
    <!-- navebar -->
    <!-- <nav class="navbar navbar-dark font-weight-bold shadow def-color">
            <a class="navbar-brand" href="./">SoundCloud To MP3</a>
        </nav> -->
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
    <?php require_once "./template/nav.php" ?>
    <div class="body-wrapper">
        <div id="header-container" style="background-color: #fdb35e">
            <!-- Search bar -->
            <div class="search-text-cont">
                <span class="title">
                    Download your favorite tracks to your personal storage
                    and enjoy them even when you are offline!
                </span>

                <div class="search-cont shadow w-100 p-2 mt-4">
                    <div class="input-group input-group-sm glow-this">
                        <input type="text" class="form-control" placeholder="Enter a name or url..." id="search-input" autofocus />
                        <label for="search-input" class="lighthouse-hidden">Search</label>
                        <div class="input-group-append">
                            <span class="input-group-text font-weight-bold def-color px-3" id="search-btn" onclick="searchHandler()">
                                Search
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- heading Container -->
            <div class="mt-3 hide-on-search text-center" id="title"></div>

            <!-- result layout selector -->
            <div class="view-btn-cont text-right hide-on-search d-none d-md-flex">
                <div class="input-group input-group-sm shadow view-selec-cont">
                    <img src="./assets/list.svg" viewType="list" class="view-select-img" style="margin-right: -5px" alt="Show list view" />
                    <img src="./assets/grid.svg" viewType="grid" class="view-select-img view-select-img-selected" alt="Show grid view" />
                </div>
            </div>

            <!-- tracks Container -->
            <div class="mb-5 mt-2 hide-on-search" id="container"></div>

            <!-- how to use -->
            <div class="tips-cont" id="how-to-use">
                <div class="tips">
                    <span class="tips-title">How to Use</span>
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
            <div class="tips-cont" id="contact-us">
                <div class="tips">
                    <span class="tips-title">Contact us</span>
                    <p class="p-3">
                        <?php require_once  APP_PATH . "/content/contact-us.html" ?>
                    </p>
                </div>
            </div>

            <!-- Playlist downloader -->
            <div class="tips-cont" id="playlist-downloader">
                <div class="tips">
                    <span class="tips-title">Playlist downloader</span>
                    <!-- <p class="p-3">
                    Lorem ipsum
                </p> -->
                </div>
            </div>
        </div>


        <div class="p-1 col-lg-4 menu player-cont player-hide">
            <div class="player-btn">
                <img src="./assets/UpArrow.svg" onclick="showHandler()" alt="Show player" />
            </div>
            <div class="audioPanelCont">
                <p class="audio-title"></p>
            </div>
            <audio noDownload controls id="audio-controls" controlsList="nodownload"></audio>
            <div class="download"></div>
            <span class="playerSpace"></span>
        </div>
    </div>
    <?php require_once "./template/footer.php" ?>


    <div class="loaderBody show-on-search">
        <div class="a" style="--n: 5">
            <div class="dot" style="--i: 0"></div>
            <div class="dot" style="--i: 1"></div>
            <div class="dot" style="--i: 2"></div>
            <div class="dot" style="--i: 3"></div>
            <div class="dot" style="--i: 4"></div>
        </div>
    </div>
</body>


<!-- js -->

<script async src="./js/Player.js?v=4"></script>
<script async src="./js/getBtnHandler.js?v=4"></script>
<script async src="./js/suggest.js?v=4"></script>
<script async src="./js/HtmlRender.js?v=4"></script>
<script async src="./js/localStorage-cache-api.js?v=4"></script>
<script async src="./js/modal.js"></script>

<script async src="./js/jquery-ui.js"></script>
<script async src="./js/index.js?v=4"></script>
<script async src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5f8b58e0488054c6"></script>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-S361HP0XG1"></script>
<script>
    document.onreadystatechange = function() {
        if (document.readyState === 'complete') {
            loadSearchParams();

            window.addEventListener('popstate', loadSearchParams);

            document
                .getElementById('search-input')
                .addEventListener('keyup', openSuggestions);

            $('.view-select-img').click(selectGridView);
            $('#search-input').googleSuggest();

            // if (screen.width < 1000) {
            //     $('.view-select-img').toggleClass('view-select-img-selected');
            //     HTMLDATA.isGridView = false;
            // }
        }
    };

    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-S361HP0XG1');
</script>

</html>