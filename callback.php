// callback.php
<?php
session_start();
require_once 'vendor/autoload.php';
$config = require 'config.php';

if (isset($_GET['state']) && $_GET['state'] !== $_SESSION['oauth2state']) {
    unset($_SESSION['oauth2state']);
    exit('Invalid state');
}

$oauthClient = new \League\OAuth2\Client\Provider\GenericProvider([
    'clientId'                => $config['clientId'],
    'clientSecret'            => $config['clientSecret'],
    'redirectUri'             => $config['redirectUri'],
    'urlAuthorize'            => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    'urlAccessToken'          => 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    'urlResourceOwnerDetails' => '',
    'scopes'                  => $config['scopes'],
]);

try {
    $accessToken = $oauthClient->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    $_SESSION['accessToken'] = $accessToken->getToken();
    header('Location: select-file.php');
    exit;

} catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
    exit($e->getMessage());
}
