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
    else if (_items.length === 0){
        return <p>You haven't added items to this store's list! {addItemButton()} </p> 
    }

    return (
        <nav>
            {_items.map((item) => (
                <li key={item.id}>
                    <h3>
                    <input className="checked-box" type="checkbox" checked={Number(item.checked) === 1} onChange={(e) => _updateItem(item.id, e.target.checked ? 1 : 0)}/>
                    <b>{item.name}</b> | Quantity: {item.quantity}             
                    <button className="delete-button" onClick={() => _deleteItemById(item.id)}><b>X</b></button>
                    </h3>   
                </li>      
            ))}
            {addItemButton()}
        </nav>
    )


}
