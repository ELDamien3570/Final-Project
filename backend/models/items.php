<?php

class Item {
    private $store_id, $name, $quantity, $checked;
    
    public function __construct($store_id, $name, $quantity, $checked){
        $this->set_storeid($store_id);
        $this->set_name($name);
        $this->set_qty($quantity);
        $this->set_checked($checked);
    }
    
    public function set_storeid($store_id){
        $this->store_id = $store_id;
    }
    
    public function set_name($name){
        $this->name = $name;
    }
    
    public function set_qty($qty){
        $this->quantity = $qty;
    }
    
    public function set_checked($checked){
        $this->checked = $checked;
    }
    
    public function get_storeid(){
        return $this->store_id;
    }
    
    public function get_name(){
        return $this->name;
    }
    
    public function get_qty(){
        return $this->quantity;
    }
    
    public function get_checked(){
        return $this->checked;
    }
    
}

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
