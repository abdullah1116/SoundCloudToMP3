<?php
function getCurrentPath($dir)
{
    return str_replace(APP_PATH, '', realpath($dir));
}


function dd($data)
{
    print_r(json_encode($data));
    die;
}


function getServer($key = null)
{
    return $key
        ? (isset($_SERVER[$key])
            ? $_SERVER[$key]
            : null)
        : $_SERVER;
}
