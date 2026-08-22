<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, DELETE, POST, PUT');
    
    
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
            && $path_parts[3] == 'stores'
            && is_numeric($path_parts[4]))
    {
        $store_id = $path_parts[4];
        delete_store($store_id);
        
        echo json_encode([
            "message" => "Store {$path_parts[4]} Deleted"
        ]);
    }
    elseif($method == 'POST' && $path == '/FinalProject/api/stores')
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        
        create_store($data['name']);
        
        echo json_encode([
            "message" => "Store {$data['name']} added to database"
        ]);
    }
    elseif($method == 'POST' 
            && count($path_parts) == 6
            && $path_parts[3] == 'stores'
            && is_numeric($path_parts[4])
            && $path_parts[5] == 'items')
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        
        create_item($data['name'], $data['quantity'], $path_parts[4]);
        
        echo json_encode([
           "message" => "Item {$data['name']} added to database" 
        ]);
    }
    elseif($method == 'PUT' 
            && $path_parts[3] == 'items'
            && is_numeric($path_parts[4]))
    {
        $body = file_get_contents('php://input');
        $data = json_decode($body, true);
        
        update_item($path_parts[4], $data['checked']);
        
        echo json_encode([
           "message" => "Item {$path_parts[4]} has been updated" 
        ]);
    }
    elseif ($method == 'DELETE'
            && count($path_parts) == 5
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
    
    
    


