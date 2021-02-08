<?php
if (
    (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") && $_SERVER['SERVER_NAME'] != 'localhost'
    || substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.'
) {

    $HTTP_HOST = substr($_SERVER['HTTP_HOST'], 0, 4) === 'www.'
        ? substr($_SERVER['HTTP_HOST'], 4)
        : $_SERVER['HTTP_HOST'];

    $location = 'https://' . $HTTP_HOST . $_SERVER['REQUEST_URI'];

    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
} else {
    require_once 'home.php';
}
