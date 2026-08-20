<?php

    header('Access-Control-Allow-Origin: *');
    
    require_once 'models/database.php';
    require_once 'models/stores.php';
    require_once 'models/items.php';
    
    $method = $_SERVER['REQUEST_METHOD'];
    $path = $_SERVER['REQUEST_URI'];
    $path_parts = explode('/', $path);
    
    if ($method == 'GET' && $path == '/FinalProject/api/stores'){
        $stores = list_stores();
        
        echo json_encode($stores);
    }
    elseif ($method == 'GET' && $path == '/FinalProject/api/items'){
        $items = list_items();
        
        echo json_encode($items);
    }
    elseif ($method == 'GET' 
            && count($path_parts) == 6
            && $path_parts[2] == 'api'
            && $path_parts[3] == 'stores'
            && is_numeric($path_parts[4])
            && $path_parts[5] == 'items')
    {
        $store_id = $path_parts[4];
        $items = list_items_by_store($store_id);
        
        echo json_encode($items);
    }
    else {
        echo json_encode([
            'error' => 'Endpoint not found'
        ]);
    }
    
    
    


