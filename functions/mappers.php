<?php

function singleTrackResource($row, $size = 500)
{
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? largeImage($row['artwork_url'], $size)
            : largeImage($row['user']['avatar_url'], $size),
        // 'stream_url' => $row['stream_url'] ?? null,
        'user' => $row['user']['username'],
        'link' => $row['permalink_url'],
    ];
}

function singleTrackResourceDetailed($row)
{
    // return $row;
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? largeImage($row['artwork_url'])
            : largeImage($row['user']['avatar_url']),
        'user' => $row['user']['username'],
        'duration' => 'Duration: ' . preg_replace('/(^00:)+/', '', gmdate("H:i:s", $row['duration'] / 1000)) . ' minutes',
        'size' => 'File size: ' . number_format($row['duration'] / 65675.2, 2, ".", "") . ' MB',
        'link' => $row['permalink_url'],
        'stream_url' => getStreamLink($row['id']),


    ];
}

function tracksMapper($items, $size = 500)
{
    return array_map(function ($row) use ($size) {
        return $my_style = singleTrackResource($row, $size);
    }, $input_array = json_decode($items, true));
}

function singlePlaylistResource($row, $size = 50)
{
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? largeImage($row['artwork_url'])
            : largeImage($row['user']['avatar_url']),
        // 'stream_url' => $row['stream_url'] ?? null,
        'user' => $row['user']['username'],
        'tracks' => tracksMapper(json_encode($row['tracks']), $size),
    ];
}

function playlistMapper($items)
{
    return array_map(function ($row) {
        return $my_style = singlePlaylistResource($row);
    }, $input_array = json_decode($items, true));
}


function topMapper($items)
{
    return array_map(function ($row) {
        return $my_style = singleTrackResource($row['track']);
    }, $input_array = json_decode($items, true)['collection']);
}

function keyMapper($items)
{
    // return json_decode($items, true)['collection'];
    return array_map(function ($row) {
        return $my_style =  $row['output'];
    }, $input_array = json_decode($items, true)['collection']);
}

function largeImage($src, $size = "500")
{
    return str_replace(
        'large.jpg',
        "t{$size}x{$size}.jpg",
        $src
    );
}
