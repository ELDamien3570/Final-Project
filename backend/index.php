<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, DELETE');
    
    
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
    elseif ($method == 'DELETE'
            && count($path_parts) == 5
            && $path_parts[2] == 'api'
            && $path_parts[3] == 'stores'
            && is_numeric($path_parts[4]))
    {
        $store_id = $path_parts[4];
        delete_store($store_id);
        
        echo json_encode([
            "message" => "Store {$path_parts[4]} Deleted"
        ]);
    }
    elseif ($method == 'DELETE'
            && count($path_parts) == 5
            && $path_parts[2] == 'api'
            && $path_parts[3] == 'items'
            && is_numeric($path_parts[4]))
    {
        $item_id = $path_parts[4];
        delete_item($item_id);
        
        echo json_encode([
            "message" => "Item {$path_parts[4]} Deleted"
        ]);
    }
    else {
        echo json_encode([
            'error' => 'Endpoint not found'
        ]);
    }
    
    
    


