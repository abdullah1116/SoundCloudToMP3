<?php
require_once('./api.php');


// we ye chl rha hy
function singleTrackResource($row)
{
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? $row['artwork_url']
            : $row['user']['avatar_url'],
        // 'stream_url' => $row['stream_url'] ?? null,
        'user' => $row['user']['username'],
    ];
}

function tracksMapper($items)
{
    return array_map(function ($row) {
        return $my_style = singleTrackResource($row);
    }, $input_array = json_decode($items, true));
}

function singlePlaylistResource($row)
{
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? $row['artwork_url']
            : $row['user']['avatar_url'],
        // 'stream_url' => $row['stream_url'] ?? null,
        'user' => $row['user']['username'],
        'tracks' => tracksMapper(json_encode($row['tracks'])),
    ];
}

function playlistMapper($items)
{
    return array_map(function ($row) {
        return $my_style = singlePlaylistResource($row);
    }, $input_array = json_decode($items, true));
}