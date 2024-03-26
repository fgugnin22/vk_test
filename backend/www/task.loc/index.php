<?php

use Task\Api\Api;

require 'vendor/autoload.php';

$db = require ('db.php');
$connect = mysqli_connect($db['host'], $db['username'], $db['password'], $db['database']);
if (mysqli_connect_errno())
    print_r(mysqli_connect_error());

Api::init();
