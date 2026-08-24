<?php 
function list_stores(){
    global $database;
    
    $query = 'SELECT id, name, created_at FROM stores';
    
    $statement = $database->prepare($query);
    $statement->execute();
    
    $stores = $statement->fetchAll();
    
    $statement->closeCursor();
    
    return $stores;
}

function delete_store($store_id) {
    global $database;
    
    $query = 'delete from stores where id = :storeID';
    
    $statement = $database->prepare($query);
    $statement->bindValue(":storeID", $store_id);
    
    $statement->execute();
    
    $statement->closeCursor();
}

function create_store($store_name) {
    global $database;
    
    $query = "INSERT INTO stores (name) VALUES (:name)";
    
    $statement = $database->prepare($query);
    $statement->bindValue(":name", $store_name);
    
    $statement->execute();
    
    $statement->closeCursor();
}