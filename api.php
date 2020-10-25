<?php
require_once('vendor/autoload.php');

function callAPI($url)
{
    $response = Mervick\CurlHelper::factory($url)->exec();

    // die(print_r($response)); // for testing

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

    return $response['content'];
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


function dd($data)
{
    // var_dump($data);
    print_r($data);
    die;
}
