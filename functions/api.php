<?php

use Cache\Adapter\Filesystem\FilesystemCachePool;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;

function callAPI($url, $cache = true)
{

    $pool = initCache();
    $key = preg_replace('/\W+/', '', $url);

    if ($pool->hasItem($key) && $cache) {
        $content = $pool->get($key);
    } else {
        $response = Mervick\CurlHelper::factory($url)->exec();

        if (!$response) sendError('api response error');

        if (empty($response['status'])) {
            sendError('bad response');
        }

        if ($response['status'] === 302) {
            return $response['headers']['Location'];
        }

        if ($response['status'] !== 200) {
            sendError($response['status'] . ' bad status');
        }

        if (empty($response['content'])) {
            sendError('empty content');
        }

        $content = $response['content'];


        if (!$cache) {
            return $content;
        };

        $item = $pool->getItem($key);
        $item->set($content);
        $item->expiresAfter(24 * 60 * 60);
        $pool->save($item);
    }

    return $content;
}

function initCache()
{
    $filesystemAdapter = new Local(__DIR__ . '/');
    $filesystem = new Filesystem($filesystemAdapter);
    $pool = new FilesystemCachePool($filesystem);

    return $pool;
}

function sendError($message)
{
    header('HTTP/1.1 400 Bad Request');
    header('Content-type: application/json');
    echo json_encode([
        'error' => true,
        'message' => $message,
    ]);
    die;
}

function sendResponse($content)
{
    header('Content-type: application/json');
    echo json_encode([
        'error' => false,
        'content' => $content,
    ]);
    die;
}
