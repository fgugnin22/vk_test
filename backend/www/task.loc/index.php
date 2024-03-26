<?php

use Task\Api\Api;

require 'vendor/autoload.php';

if (mysqli_connect_errno())
    print_r(mysqli_connect_error());

Api::init();
