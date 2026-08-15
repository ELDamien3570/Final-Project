<?php

class Item {
    private $store_id, $name, $quantity, $checked;
    
    public function __construct($store_id, $name, $quantity, $checked){
        $this->set_storeid($store_id);
        $this->set_name($name);
        $this->set_qty($quantity);
        this->set_checked($checked);
    }
    
    public function set_storeid($store_id){
        this->store_id = $store_id;
    }
    
    public function set_name($name){
        this->name = $name;
    }
    
    public function set_qty($qty){
        this->quantity = $qty;
    }
    
    public function set_checked($checked){
        this->checked = $checked;
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