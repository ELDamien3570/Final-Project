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
        <div className="store-list">
            <section className="store-controls">
                <button className={_selectedStore === null ? "control-button all-selected" : "control-button"} onClick={() => _handleAllItemsClick()}>See All Items</button>
                <button className="control-button" onClick={_handleAddStoresClick}>Add Stores</button>
            </section>
            <nav className="store-item-container">
                {_stores.map((store) => (
                    <li className="store-list-item" key={store.id}>
                        <button className={_selectedStore === store.id ? "store-button is-selected" : "store-button"} onClick={() => _handleStoreClick(store.id)}> <b> Name: {store.name} | ID: {store.id} </b> </button>
                        <button className="delete-button-store" onClick={() => _deleteStoreById(store.id)}><b>X</b></button>
                    </li>
                ))}
            </nav>
        </div>
        
    )

}