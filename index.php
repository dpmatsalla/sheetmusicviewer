// index.php
<?php
session_start();
require_once 'vendor/autoload.php';
$config = require 'config.php';

$oauthClient = new \League\OAuth2\Client\Provider\GenericProvider([
    'clientId'                => $config['clientId'],
    'clientSecret'            => $config['clientSecret'],
    'redirectUri'             => $config['redirectUri'],
    'urlAuthorize'            => 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    'urlAccessToken'          => 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    'urlResourceOwnerDetails' => '',
    'scopes'                  => $config['scopes'],
]);

$authorizationUrl = $oauthClient->getAuthorizationUrl();
$_SESSION['oauth2state'] = $oauthClient->getState();

header('Location: ' . $authorizationUrl);
exit;
