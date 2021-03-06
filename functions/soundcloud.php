<?php

require_once 'app.php';
require_once APP_PATH . '/vendor/autoload.php';
require_once APP_PATH . '/functions/api.php';
require_once APP_PATH . '/functions/mappers.php';
require_once APP_PATH . '/functions/db.php';

// const API_URL = "https://api.soundcloud.com/%method%&client_id=BVTnmQP4X7xo1VXiYwZTNAM9swaZthcP"; // soundcloud XXX

const API_URL = "https://api.soundcloud.com/%method%&client_id=" .  KEY_V1; // youtube
const GEN_API_URL = "https://www.genmp3.net/getStream.php?%method%&&apikey=" . KEY_GEN; // genmp3
const V2_API_URL = "https://api-v2.soundcloud.com/%method%&client_id=" . KEY_V2; // genmp3

function getSearch()
{
    if (empty($_GET['search'])) sendError('Nothing searched');
    $searchText = $_GET['search'];
    $urlTracks = str_replace('%method%', 'tracks?format=json', API_URL) . '&q=' . $searchText;

    $urlPlaylists = str_replace('%method%', 'playlists?format=json', API_URL) . '&q=' . $searchText;

    sendResponse([
        "title" => "Searching for \"{$searchText}\"",
        'tracks' => tracksMapper(callAPI($urlTracks)),
        'playlists' => playlistMapper(callAPI($urlPlaylists)),
    ]);
}

function getTop()
{

    $url = str_replace('%method%', "charts?kind=top&limit=12", V2_API_URL);
    sendResponse([
        "title" => "Most heard tracks",
        'tracks' => topMapper(callAPI($url)),
        'playlists' => [],
    ]);
}

function getLink()
{
    //https://api.soundcloud.com/resolve?format=json&client_id=86b6a66bb2d863f5d64dd8a91cd8de94&url=https://soundcloud.com/asif-zaman-1/sets/jamiattaranay
    if (empty(parse_url($_GET['link'])['path'])) sendError('Nothing searched');

    $link = parse_url($_GET['link'])['path'];
    $details = !empty($_GET['details']) && $_GET['details'] == 'true';
    $url = str_replace('%method%', "resolve?format=json&url=https://soundcloud.com{$link}", API_URL);

    $linkCallResponse = json_decode(callAPI(callAPI($url)), true);

    $kind = $linkCallResponse['kind'];
    if ($kind == 'track') {

        $data = $details  == true
            ? singleTrackResourceDetailed($linkCallResponse)
            : singleTrackResource($linkCallResponse);

        $title = "Searching for \"{$data['title']}\" by \"{$data['user']}\"";
        $tracks = [$data];
    } else {
        $data = singlePlaylistResource($linkCallResponse, 500);

        $count = count($data['tracks']);
        $title = "Searching for \"{$data['title']}\" by \"{$data['user']}\" tracks \"{$count}\"";
        $tracks = $data['tracks'];
    }

    return [
        "title" => $title,
        'tracks' => $tracks,
        'playlists' => [],

    ];
}

function getAudio()
{
    // $url = "https://api.soundcloud.com/tracks/229936313/stream?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
    if (empty($_GET['id'])) sendError('Nothing played');
    $id = $_GET['id'];

    echo getStreamLink($id);
}

function getStreamLink($id)
{
    if (empty($id)) return;

    $url = str_replace('%method%', "id={$id}", GEN_API_URL);
    return json_decode(callAPI($url, false), true)['link'];
}

function getSuggest()
{
    if (empty($_GET['key'])) sendError('Nothing searched');

    $key = $_GET['key'];

    $url = str_replace('%method%', "search/queries?q={$key}&limit=10", V2_API_URL);

    sendResponse(keyMapper(callAPI($url)));
}
