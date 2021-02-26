<?php

use function PHPSTORM_META\map;

require_once './functions/app.php';
require_once APP_PATH . '/functions/soundcloud.php';




$type = $_GET['type'] ?? '';

switch ($type) {
    case 'search':
        getSearch();
        break;

    case 'top':
        getTop();
        break;

    case 'audio':
        getAudio();
        addLog('play', json_encode($_GET));
        break;

    case 'link':
        sendResponse(getLink());
        break;

    case 'keySuggest':
        getSuggest();
        break;

    default:
        sendError('Something went wrong...');
        break;
}
