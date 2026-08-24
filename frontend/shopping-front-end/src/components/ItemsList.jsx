export default function ItemsList({
    _loadingItems,
    _itemError,
    _items,
    _deleteItemById,
    _selectedStore,
    _handleAddItemsClick,
    _updateItem
})
{
    const addItemButton = () => {
        if (_selectedStore != null){
            return (
                <button className="add-item-button" onClick={_handleAddItemsClick}>Add Item</button>
            )
        }
    }

    if (_loadingItems) {
        return <p>Loading items</p>
    }
    else if (_itemError) {
        return <p>{_itemError}</p>
    }
    else if (_items.length === 0 && _selectedStore != null){
        return <h3>You haven't added items to this store's list! <br></br> {addItemButton()}</h3>
    }

    return (
        <nav className="shopping-list">
            {_items.map((item) => (
                <li className="item-list-entry" key={item.id}>
                    <div className="item-info">
                        <input 
                            className="checked-box" 
                            type="checkbox" 
                            checked={(item.checked) === 1} 
                            onChange={(e) => _updateItem(item.id, e.target.checked ? 1 : 0)}
                        />
                        <p className="item-text"><b>Item:</b> {item.name} | <b>Quantity:</b> {item.quantity} | <b>StoreID:</b> {item.store_id}</p>
                    </div>   
                    <button className="delete-button-item" onClick={() => _deleteItemById(item.id)}><b>X</b></button>
                </li>      
            ))}
            {addItemButton()}
        </nav>
    )


}
