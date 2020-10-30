<?php

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
        'link' => $row['permalink_url'],
    ];
}

function singleTrackResourceDetailed($row)
{
    return [
        'id' => $row['id'],
        'title' => $row['title'],
        'image' => !empty($row['artwork_url'])
            ? largeImage($row['artwork_url'])
            : largeImage($row['user']['avatar_url']),
        'user' => $row['user']['username'],
        'duration' => 'Duration: ' . number_format($row['duration'] / 60000, 2, ".", "") . ' minutes',
        'size' => 'File size: ' . number_format($row['duration'] / 65675.2, 2, ".", "") . ' MB',
        'link' => $row['permalink_url'],

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
            ? largeImage($row['artwork_url'])
            : largeImage($row['user']['avatar_url']),
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

function largeImage($src)
{
    return str_replace(
        'large.jpg',
        't500x500.jpg',
        $src
    );
}