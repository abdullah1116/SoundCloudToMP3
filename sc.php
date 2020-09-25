<?php

use function PHPSTORM_META\map;

require_once('vendor/autoload.php');
require_once('./api.php');

const API_URL = "https://api.soundcloud.com/%method%&client_id=86b6a66bb2d863f5d64dd8a91cd8de94";



$type = $_GET['type'] ?? '';

switch ($type) {
    case 'search':
        getSearch();
        break;

    case 'audio':
        getAudio();
        break;

    default:
        sendError('Something went wrong...');
        break;
}


function getSearch()
{
    if (empty($_GET['search'])) sendError('Nothing searched');

    $urlTracks = str_replace('%method%', 'tracks?format=json', API_URL);
    $urlTracks = $urlTracks . '&q=' . $_GET['search'];

    $urlPlaylists = str_replace('%method%', 'playlists?format=json', API_URL);
    $urlPlaylists = $urlPlaylists . '&q=' . $_GET['search'];

    sendResponse([
        'tracks' => tracksMapper(callAPI($urlTracks)),
        'playlists' => playlistMapper(callAPI($urlPlaylists)),
    ]);
}

function getAudio()
{
    // $url = "https://api.soundcloud.com/tracks/229936313/stream?client_id=86b6a66bb2d863f5d64dd8a91cd8de94";
    if (empty($_GET['id'])) sendError('Nothing played');
    $id = $_GET['id'];
    $url = str_replace('%method%', "tracks/{$id}/stream?", API_URL);

    echo callAPI($url);
}


function tracksMapper($items)
{
    return array_map(function ($row) {
        return $my_style = [
            'id' => $row['id'],
            'title' => $row['title'],
            'image' => !empty($row['artwork_url'])
                ? $row['artwork_url']
                : $row['user']['avatar_url'],
            // 'stream_url' => $row['stream_url'] ?? null,
            'user' => $row['user']['username'],
        ];
    }, $input_array = json_decode($items, true));
}

function playlistMapper($items)
{
    return array_map(function ($row) {
        return $my_style = [
            'id' => $row['id'],
            'title' => $row['title'],
            'image' => !empty($row['artwork_url'])
                ? $row['artwork_url']
                : $row['user']['avatar_url'],
            // 'stream_url' => $row['stream_url'] ?? null,
            'user' => $row['user']['username'],
            'tracks' => tracksMapper(json_encode($row['tracks'])),
        ];
    }, $input_array = json_decode($items, true));
}
