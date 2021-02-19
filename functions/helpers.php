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

function write($file_path, $content, $nextline = false)
{
    try {
        fwrite(fopen(APP_PATH."/functions/logs" .$file_name, 'a'), $content . $nextline ? '\n':"");
    } catch (exception  $error) {
    }
}
