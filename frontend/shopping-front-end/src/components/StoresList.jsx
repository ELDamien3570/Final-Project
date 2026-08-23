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
        <p>
            <body>
                <button className={_selectedStore === null ? 'store-button is-selected' : 'store-button'} onClick={() => _handleAllItemsClick()}>See All Items</button>
                <button className="store-button" onClick={_handleAddStoresClick}>Add Stores</button>
            </body>
            <nav>
                {_stores.map((store) => (
                    <li className="store-list-item" key={store.id}>
                        <button className={_selectedStore === store.id ? "store-button is-selected" : "store-button"} onClick={() => _handleStoreClick(store.id)}>Name: {store.name} | ID: {store.id} </button>
                        <button className="delete-button store" onClick={() => _deleteStoreById(store.id)}><b>X</b></button>
                    </li>
                ))}
            </nav>
        </p>
        
    )

}