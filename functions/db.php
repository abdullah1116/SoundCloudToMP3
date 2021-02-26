<?php

require_once 'soundcloud.php';

function db()
{
    return new MysqliDb('localhost', 'root', null, 'vdograbb_sc');
}

function addLog($type, $detail = null, $user_ip = null, $user_agent = null)
{
    try {
        $user_ip =
            isset($user_ip) ?:
            getServer('HTTP_CLIENT_IP') ?:
            getServer('HTTP_X_FORWARDED_FOR') ?:
            getServer('HTTP_X_FORWARDED') ?:
            getServer('HTTP_FORWARDED_FOR') ?:
            getServer('HTTP_FORWARDED') ?:
            getServer('REMOTE_ADDR') ?:
            "unknown";

        $user_agent = isset($user_agent) ?:
            getServer('HTTP_USER_AGENT') ?:
            "unknown";


        return db()->insert('logs', [
            'type' => $type,
            'detail' => $detail,
            'user_ip' => $user_ip,
            'user_agent' => $user_agent,
        ]);
    } catch (\Throwable $th) {
    }
}
