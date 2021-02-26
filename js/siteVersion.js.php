<?php
require_once '../functions/soundcloud.php';
error_reporting(E_ERROR | E_PARSE);
function get_current_git_commit($branch = 'master')
{
    try {
        return substr(
            file_get_contents(
                sprintf(APP_PATH . '/.git/refs/heads/%s', $branch)
            ),
            0,
            7
        );
    } catch (ErrorException  $error) {
        return false;
    }
}
?>

currentVersion = `<?php echo get_current_git_commit() ?>`;
["",undefined, 'undefined'].indexOf(localStorage.siteVersion) == -1
? localStorage.siteVersion == currentVersion
? true
: ((localStorage.siteVersion = currentVersion),localStorage.siteVersion == currentVersion ? location.reload(true) : false)
: ((localStorage.siteVersion = currentVersion), console.error(currentVersion))