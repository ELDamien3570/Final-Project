<?php
function list_items(){
    global $database;
    
    $query = 'SELECT id, name, store_id, quantity, checked FROM items';
    
    $statement = $database->prepare($query);
    $statement->execute();
    
    $items = $statement->fetchAll();
    
    $statement->closeCursor();
    
    return $items;
}

function list_items_by_store($store_id){
    global $database;
    
    $query = 'SELECT id, name, store_id, quantity, checked FROM items WHERE store_id = :storeID';
    
    $statement = $database->prepare($query);
    $statement->bindValue(":storeID", $store_id);
    
    $statement->execute();
    
    $items = $statement->fetchAll();
    
    $statement->closeCursor();
    
    return $items; 
}

function delete_item($item_id) {
    global $database;
    
    $query = 'delete from items where id = :itemID';
    
    $statement = $database->prepare($query);
    $statement->bindValue(":itemID", $item_id);
    
    $statement->execute();
    
    $statement->closeCursor();
}

function create_item($name, $quantity, $store_id) {
    global $database;
    
    $query = 'INSERT INTO items (name, store_id, quantity) VALUE (:name, :store_id, :quantity)';
    
    $statement = $database->prepare($query);
    $statement->bindValue(":name", $name);
    $statement->bindValue(":quantity", $quantity);
    $statement->bindValue(":store_id", $store_id);
    
    $statement->execute();
    $statement->closeCursor();
}

function update_item($id, $checked) {
    global $database;
    
    $query = 'update items set checked = :checked where id = :id';
    
    $statement = $database->prepare($query);
    $statement->bindValue(":id", $id);
    $statement->bindValue(":checked", $checked);
    
    $statement->execute();
    $statement->closeCursor();
}
