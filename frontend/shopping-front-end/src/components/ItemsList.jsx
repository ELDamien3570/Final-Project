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
            <button onClick={_handleAddItemsClick}>Add Item NEW</button>
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
        return <p>You haven't added items to this store's list!</p>
    }

    return (
        <ul>
            {_items.map((item) => (
                <li key={item.id}>Item Name: {item.name} | Quantity: {item.quantity} 
                <button onClick={() => _deleteItemById(item.id)}>Delete Item</button>
                <label>Checked?</label>
                <input type="checkbox" checked={Number(item.checked) === 1} onChange={(e) => _updateItem(item.id, e.target.checked ? 1 : 0)}/>
                
                </li>      
            ))}
            {addItemButton()}
        </ul>
    )


}
