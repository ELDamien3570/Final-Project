import { useState, useEffect, StrictMode } from 'react'
import './App.css'
import StoresList from './components/StoresList'
import ItemsList from './components/ItemsList'

const STORES_API = 'http://localhost/FinalProject/api/stores'
const ITEMS_API = 'http://localhost/FinalProject/api/items'


function App() {
  const [stores, setStores] = useState([])
  const [items, setItems] = useState([])

  const [storeError, setStoreError] = useState(null)
  const [itemError, setItemError] = useState(null)

  const [loadingStores, setLoadingStores] = useState(true)
  const [loadingItems, setLoadingItems] = useState(true)

  const [selectedStore, setSelectedStore] = useState(null)

  async function fetchStores() {
    try {
      const response = await fetch(STORES_API)

      const storeData = await response.json()
      setStores(storeData)
      setLoadingStores(false)
    }
    catch (requestError) {
      setStoreError(requestError.message)
      setLoadingStores(false)
    }
  }

  async function fetchItems() {
    try {
      const response = await fetch(ITEMS_API)

      const itemData = await response.json()
      setItems(itemData)
      setLoadingItems(false)
    }
    catch (requestError) {
      setItemError(requestError.message)
      setLoadingItems(false)
    }
  }

  async function fetchItemsByStore(storeID) {
    try {
      const response = await fetch(`${STORES_API}/${storeID}/items`)

      const itemData = await response.json()

      
      setItems(itemData)
      setLoadingItems(false)
    }
    catch (requestError) {
      setItemError(requestError.message)
      setLoadingItems(false)
    }
  }

  async function deleteStoreById(storeID) {
    try {
      const response = await fetch(`${STORES_API}/${storeID}`, {method: 'DELETE'})
      
      if (!response.ok) {
        throw new Error('Could not delete store')
      }
      
      const confirmationMessage = await response.json()
      alert(confirmationMessage.message)

      fetchStores()
      fetchItems()
      setSelectedStore(null)
    }
    catch (requestError) {
      setStoreError(requestError.message)
    }
  }

  async function deleteItemById(itemID){
    try {
      const response = await fetch(`${ITEMS_API}/${itemID}`, {method: 'DELETE'})
      
      if (!response.ok) {
        throw new Error('Could not delete store')
      }
      
      const confirmationMessage = await response.json()
      alert(confirmationMessage.message)
      
      if (selectedStore === null){
        fetchItems()
        fetchStores()
      }
      else 
      {
        fetchItemsByStore(selectedStore)
        fetchStores()
      }
    }
    catch (requestError) {
      setStoreError(requestError.message)
    }
  }

  async function insertStore(storeName){
    try {
      const response = await fetch(STORES_API, {method: 'POST', body: JSON.stringify({name: storeName})})
      
      if (!response.ok){
        throw new Error("Could not add store")
      }
      
      const confirmationMessage = await response.json()
      alert(confirmationMessage.message)

      fetchStores()
      fetchItems()
      setSelectedStore(null)
    }
    catch (requestError) {
      alert(requestError.message)
    }
  }

  async function insertItem(itemName, storeID, qty){
    try {
      const response = await fetch(`${STORES_API}/${storeID}/items`, {method: 'POST', body: JSON.stringify({name: itemName, quantity: qty})})
      
      if (!response.ok){
        throw new Error("Could not add item")
      }
      
      const confirmationMessage = await response.json()
      alert(confirmationMessage.message)


      if (selectedStore === null){
        fetchItems()
      }
      else 
      {
        fetchItemsByStore(selectedStore)
      }
    }
    catch (requestError) {
      alert(requestError.message)
    }
  }

  async function updateItem(itemID, checked){
    try {
      const response = await fetch(`${ITEMS_API}/${itemID}`, {method: 'PUT', body: JSON.stringify({checked: checked})})

      if (!response.ok){
        throw new Error("Could not update item")
      }

      const confirmationMessage = await response.json()
      alert(confirmationMessage.message)

      if (selectedStore === null){
        fetchItems()
      }
      else 
      {
        fetchItemsByStore(selectedStore)
      }

    }
    catch (requestError) {
      alert(requestError.message)
    }
  }
  
  function handleStoreClick(storeID) {
    setSelectedStore(storeID)
    fetchItemsByStore(storeID)
  }

  function handleAllItemsClick() {
    fetchItems()
    setSelectedStore(null)
  }

  function handleAddItemsClick() {
    if (selectedStore === null) {
      alert("Select a store to add an item")
      return
    }

    const itemName = prompt("Item Name: ")
    const quantity = prompt("Item quantity: ")

    if (itemName === null || itemName.length === 0 || quantity === 0 || quantity === null || isNaN(quantity))
    {
      if (itemName === null || itemName.length === 0)
      {
        alert("You must enter an item name")
        return
      }
      if (quantity === 0 || quantity === null || isNaN(quantity))
      {
        alert("You must enter a quantity greater than 0")
        return
      }
    }

    insertItem(itemName, selectedStore, quantity)
  }

  function handleAddStoresClick()
  {
    const storeName = prompt("Store Name: ")
    
    if (storeName === null || storeName.length === 0)
    {
      alert("You must enter a store name")
      return
    }

    insertStore(storeName)  
  }

  useEffect(() => {
  
    fetchStores()
    fetchItems()
  }, []);

  return (
    <div className="App">
      <header className="app-header"><h1>Shopping List</h1></header>

      <StoresList
        _stores={stores}
        _selectedStore={selectedStore}
        _loadingStores={loadingStores}
        _storeError={storeError}
        _handleAddStoresClick={handleAddStoresClick}
        _handleAllItemsClick={handleAllItemsClick}
        _handleStoreClick={handleStoreClick}
        _deleteStoreById={deleteStoreById}
      />

      <ItemsList
        _loadingItems={loadingItems}
        _itemError={itemError}
        _items={items}
        _deleteItemById={deleteItemById}
        _updateItem={updateItem}
        _handleAddItemsClick={handleAddItemsClick}
        _selectedStore={selectedStore}
        _stores={stores}
      />

    </div>
  )
}

export default App
