<?php
if ((empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") &&
    strpos($_SERVER['HTTP_HOST'], 'localhost') !== false
) {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}
echo file_get_contents('index.html');
