export default function StoresList({
    _stores, 
    _selectedStore, 
    _loadingStores, 
    _storeError, 
    _handleAllItemsClick, 
    _handleAddStoresClick, 
    _handleStoreClick, 
    _deleteStoreById
})
{
    if (_loadingStores) {
        return <p>Loading Stores...</p>
    } 
    else if (_storeError) {
        return <p>{_storeError}</p>
    }

    return (
        <ul>
            <li>
            <button className={_selectedStore === null ? 'store-button is-selected' : 'store-button'} onClick={() => _handleAllItemsClick()}>See All Items</button>
            </li>
            <li>
            <button onClick={_handleAddStoresClick}>Add Stores</button>
            </li>
            {_stores.map((store) => (
            <li key={store.id}>
            <button className={_selectedStore === store.id ? 'store-button is-selected' : 'store-button'} onClick={() => _handleStoreClick(store.id)}>Name: {store.name} | ID: {store.id} </button>
            <button onClick={() => _deleteStoreById(store.id)}>Delete Store</button>
            </li>
            ))}
        </ul>
    )
    
}