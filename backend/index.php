<?php

    header('Access-Control-Allow-Origin: *');
    
    require_once 'models/database.php';
    require_once 'models/stores.php';
    require_once 'models/items.php';
    
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['REQUEST_URI'];
    
    if ($method == 'GET' && $path == '/FinalProject/api/stores'){
        $stores = list_stores();
        
        echo json_encode($stores);
    }
    elseif ($method == 'GET' && $path == '/FinalProject/api/items'){
        $items = list_items();
        
        echo json_encode($items);
    }
    else {
        echo json_encode([
            'error' => 'Endpoint not found'
        ]);
    }


