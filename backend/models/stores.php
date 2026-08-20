<?php 

class Store {
    private $id, $name;
    
    public function __construct($id, $name){
        set_name($name);
    }
    
    public function get_name() {
        return $this->name;
    }
    
    public function set_name($name){
        $this->name = $name;
    }
    
}

function list_stores(){
    global $database;
    
    
    $query = 'SELECT id, name, created_at FROM stores';
    
    $statement = $database->prepare($query);
    $statement->execute();
    
    $stores = $statement->fetchAll();
    
    $statement->closeCursor();
    
    return $stores;
}