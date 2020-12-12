<?php
function getCurrentPath($dir){
    return str_replace(APP_PATH,'',realpath($dir ));
}


function dd($data)
{
    var_dump($data);
    // print_r($data);
    die;
}