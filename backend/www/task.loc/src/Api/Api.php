<?php

namespace Task\Api;

require_once "controllers/controllers.php";

class Api
{
  const base_path = "/products";

  const routes = [
    '/getAll' => \Task\Controllers\Get_all_products::class,
    '/get' => \Task\Controllers\Get_one_product::class,
    '/add' => \Task\Controllers\Add_product::class,
    '/edit' => \Task\Controllers\Edit_product::class,
    '/delete' => \Task\Controllers\Delete_product::class
  ];

  public static function init(): void
  {
    $uri = $_SERVER['REQUEST_URI'];

    if (str_starts_with($uri, self::base_path)) {
      $path = str_replace(self::base_path, "", $uri);

      $controller = new (self::routes[$path])();

      $response = $controller();

      header('Content-Type: application/json; charset=utf-8');

      echo $response->get_body();
    }
  }
}
