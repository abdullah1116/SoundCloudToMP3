<?php
if ((empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") && $_SERVER['SERVER_NAME']!='localhost') {
    $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
} else {
    require_once 'home.php';
}
