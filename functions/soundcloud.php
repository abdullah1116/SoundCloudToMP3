<?php

require_once 'app.php';
require_once  APP_PATH . '/vendor/autoload.php';
require_once APP_PATH . '/functions/api.php';
require_once APP_PATH . '/functions/mappers.php';

const API_URL = "https://api.soundcloud.com/%method%&client_id=86b6a66bb2d863f5d64dd8a91cd8de94"; // youtube
// const API_URL = "https://api.soundcloud.com/%method%&client_id=BVTnmQP4X7xo1VXiYwZTNAM9swaZthcP"; // soundcloud

function getSearch()
{
    if (empty($_GET['search'])) sendError('Nothing searched');

    $urlTracks = str_replace('%method%', 'tracks?format=json', API_URL) . '&q=' . $_GET['search'];

    $urlPlaylists = str_replace('%method%', 'playlists?format=json', API_URL) . '&q=' . $_GET['search'];

    sendResponse([
        'tracks' => tracksMapper(callAPI($urlTracks)),
        'playlists' => playlistMapper(callAPI($urlPlaylists)),
    ]);
}

function getTop()
{

    $url = "https://api-v2.soundcloud.com/charts?kind=top&limit=12&client_id=BVTnmQP4X7xo1VXiYwZTNAM9swaZthcP";
    sendResponse([
        'tracks' => topMapper(callAPI($url)),
        'playlists' => [],
    ]);
}

function getLink()
{
    //https://api.soundcloud.com/resolve?format=json&client_id=86b6a66bb2d863f5d64dd8a91cd8de94&url=https://soundcloud.com/asif-zaman-1/sets/jamiattaranay
    if (empty($_GET['link'])) sendError('Nothing searched');

    $link = $_GET['link'];
    $details = !empty($_GET['details']) && $_GET['details'] == 'true';
    $url = str_replace('%method%', "resolve?format=json&url={$link}", API_URL);

    $linkCallResponse = json_decode(callAPI(callAPI($url)), true);

    $kind = $linkCallResponse['kind'];


    return [
        ($kind . 's') => [
            $kind == 'track'
                ? ($details  == true
                    ? singleTrackResourceDetailed($linkCallResponse)
                    : singleTrackResource($linkCallResponse))
                : singlePlaylistResource($linkCallResponse)
        ]
    ];
}

function getAudio()
{
    // $url = "https://api.soundcloud.com/tracks/229936313/stream?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
    if (empty($_GET['id'])) sendError('Nothing played');
    $id = $_GET['id'];
    $url =  "https://www.genmp3.net/getStream.php?id={$id}&apikey=cldvdosndmp320";

    echo json_decode(callAPI($url), true)['link'];
}


function getSuggest()
{
    if (empty($_GET['key'])) sendError('Nothing searched');

    $key = $_GET['key'];

    $url = "https://api-v2.soundcloud.com/search/queries?q={$key}&limit=10&client_id=BVTnmQP4X7xo1VXiYwZTNAM9swaZthcP";

    sendResponse(keyMapper(callAPI($url)));
}
