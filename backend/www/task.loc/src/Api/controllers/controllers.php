<?php

namespace Task\Controllers;

use PDO;


$host = 'mysql';
$db = 'task';
$user = 'root';
$pass = 'secret';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
global $pdo;
$pdo = new PDO($dsn, $user, $pass, $opt);



class Query
{
    private $pdo;

    public function __construct()
    {
        $this->pdo = $GLOBALS['pdo'];
    }

    public function getAll(string $query_string)
    {
        return $this->pdo->query($query_string)->fetchAll();
    }

    public function getOne(string $query_string)
    {
        $query = $this->pdo->query($query_string);

        $res = $query->fetch();

        $query->closeCursor();

        return $res;
    }

    public function execute(string $query_string)
    {
        return $this->pdo->exec($query_string);
    }
}


class Response
{
    private $body;
    private $code;


    public function __construct(mixed $body, int $code)
    {
        $this->body = $body;
        $this->code = $code;

        http_response_code($this->code);
    }

    public function get_body(): string|bool
    {
        return json_encode($this->body);
    }
}


class Get_all_products
{
    public function __invoke()
    {
        $query = new Query();

        $sql = "SELECT * FROM `task`.`example`;";

        $products = $query->getAll($sql);

        foreach ($products as $i => $_) {
            $products[$i]["price"] = floatval($products[$i]["price"]);
        }

        return new Response($products, 200);
    }
}


class Get_one_product
{
    public function __invoke()
    {
        $product_id = isset($_GET['id']) ? $_GET['id'] : 0;

        $query = new Query();

        $sql = "SELECT * FROM `task`.`example` WHERE `id`='" . $product_id . "';";

        $product = $query->getOne($sql);

        if ($product === false || $product === null) {
            return new Response(null, 404);
        }

        $product["price"] = floatval($product["price"]);

        return new Response($product, 200);
    }
}


class Edit_product
{
    public function __invoke()
    {

        $postData = file_get_contents('php://input');

        $jsonData = json_decode($postData, true);

        if ($jsonData === null) {
            return new Response(null, 400);
        }
        if (
            !(
                isset($jsonData['id'])
                || isset($jsonData['name'])
                || isset($jsonData['supplier_email'])
                || isset($jsonData['count'])
                || isset($jsonData['price'])
            )
        ) {
            return new Response(null, 400);
        }

        $id = $jsonData['id'];
        $name = $jsonData['name'];
        $supplier_email = $jsonData['supplier_email'];
        $count = $jsonData['count'];
        $price = $jsonData['price'];


        $sql_update = "UPDATE `example` SET
                    `name` = '$name',
                    `supplier_email` = '$supplier_email',
                    `count` = '$count',
                    `price` = '$price'
                WHERE `id` = '$id';";

        $sql_retrieve = "SELECT * FROM `example` WHERE `id` = '$id';";

        $query = new Query();

        $is_success = $query->execute($sql_update);

        if ($is_success == false) {
            return new Response(null, 400);
        }

        $product = $query->getOne($sql_retrieve);

        $product["price"] = floatval($product["price"]);

        return new Response($product, 200);
    }
}


class Add_product
{
    public function __invoke()
    {

        $postData = file_get_contents('php://input');

        $jsonData = json_decode($postData, true);

        if ($jsonData === null) {
            return new Response(null, 400);
        }
        if (
            !(
                isset($jsonData['id'])
                || isset($jsonData['name'])
                || isset($jsonData['supplier_email'])
                || isset($jsonData['count'])
                || isset($jsonData['price'])
            )
        ) {
            return new Response(null, 400);
        }

        $name = $jsonData['name'];
        $supplier_email = $jsonData['supplier_email'];
        $count = $jsonData['count'];
        $price = $jsonData['price'];


        $sql_insert = "INSERT INTO `example` (`name`, `supplier_email`, `count`, `price`) VALUES ('$name', '$supplier_email', '$count', '$price')";

        $sql_retrieve = "SELECT * FROM `example` WHERE `id` = LAST_INSERT_ID();";

        $query = new Query();

        $is_success = $query->execute($sql_insert);

        if ($is_success == false) {
            return new Response(null, 400);
        }

        $product = $query->getOne($sql_retrieve);

        $product["price"] = floatval($product["price"]);

        return new Response($product, 200);
    }
}


class Delete_product
{
    public function __invoke()
    {
        $postData = file_get_contents('php://input');

        $jsonData = json_decode($postData, true);

        $product_id = $jsonData['id'];

        $bad_request_response = new Response(['isDeleted' => false, 'deletedId' => -1], 400);

        if (!is_numeric($product_id)) {
            return $bad_request_response;
        }

        $sql_delete = "DELETE FROM `example` WHERE `id` = '$product_id';";

        $query = new Query();

        $is_success = $query->execute($sql_delete);

        if ($is_success == false) {
            return $bad_request_response;
        }

        return new Response(['isDeleted' => true, 'deletedId' => $product_id], 200);
    }
}



