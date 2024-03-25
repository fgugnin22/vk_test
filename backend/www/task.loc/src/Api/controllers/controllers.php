<?php

namespace Task\Controllers;

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
        return new Response(["asdfasdfasf"], 200);
    }
}


class Get_one_product
{
    public function __invoke()
    {
        return new Response(["asdfasdfasf"], 200);
    }
}


class Edit_product
{
    public function __invoke()
    {
        echo "good";
    }
}


class Add_product
{
    public function __invoke()
    {
        echo "good";
    }
}


class Delete_product
{
    public function __invoke()
    {
        echo "good";
    }
}



