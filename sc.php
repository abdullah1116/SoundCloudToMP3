<?php
require_once('vendor/autoload.php');
require_once('./api.php');

const API_URL = "https://api.soundcloud.com/%method%?format=json&client_id=86b6a66bb2d863f5d64dd8a91cd8de94";



$type = $_GET['type'] ?? '';

switch ($type) {
    case 'search':
        getSearch();
        break;

    case 'play':
        getPlay();
        break;

    default:
        sendError('Something went wrong...');
        break;
}


function getSearch()
{
    if (empty($_GET['search'])) sendError('Nothing searched');

    $urlTracks = str_replace('%method%', 'tracks', API_URL);
    $urlTracks = $urlTracks . '&q=' . $_GET['search'];

    $urlPlaylists = str_replace('%method%', 'playlists', API_URL);
    $urlPlaylists = $urlPlaylists . '&q=' . $_GET['search'];

    sendResponse([
        'tracks' => itemsMapper(callAPI($urlTracks)),
        'playlists' => json_decode(callAPI($urlPlaylists)),
    ]);
}

function getPlay()
{
    $url = "https://api.soundcloud.com/tracks/229936313/stream?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
    echo callAPI($url);
}


function itemsMapper($items)
{
    return array_map(function ($row) {
        return $my_style = [
            'id' => $row['id'],
            'title' => $row['title'],
            'image' => !empty($row['artwork_url'])
                ? $row['artwork_url'] //first
                : $row['user']['avatar_url'],
            'stream_url' => $row['stream_url'] ?? null,
            'user' => $row['user']['username'],
        ];
    }, $input_array = json_decode($items, true));
}
