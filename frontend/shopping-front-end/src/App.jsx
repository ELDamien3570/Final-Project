import { useState, useEffect, StrictMode } from 'react'
import './App.css'

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
      
      fetchStores()
      fetchItems()
      setSelectedStore(null)
    }
    catch (requestError) {
      setStoreError(requestError.message)
    }
  }

  useEffect(() => {
  
    fetchStores()
    fetchItems()
  }, []);
  
  function handleStoreClick(storeID) {
    setSelectedStore(storeID)
    fetchItemsByStore(storeID)
  }

  function handleAllItemsClick() {
    fetchItems()
    setSelectedStore(null)
  }

  let storeButtons

  if (loadingStores) {
    storeButtons = <p>Loading Stores...</p>
  } 
  else if (storeError) {
    storeButtons = <p>{storeError}</p>
  }
  else {
    storeButtons = (
      <ul>
        <li>
          <button className={selectedStore === null ? 'store-button is-selected' : 'store-button'} onClick={() => handleAllItemsClick()}>See All Items   
          </button>
        </li>
        {stores.map((store) => (
          <li key={store.id}><button className={selectedStore === store.id ? 'store-button is-selected' : 'store-button'} onClick={() => handleStoreClick(store.id)}>Name: {store.name} | ID: {store.id}   
          </button>
          <button onClick={() => deleteStoreById(store.id)}>Delete Store</button>
          </li>

        ))}
      </ul>
    )
  }

  let itemButtons

  if (loadingItems) {
    itemButtons = <p>Loading items</p>
  }
  else if (itemError) {
    itemButtons = <p>{itemError}</p>
  }
  else {
    if (items.length > 0) {
      itemButtons = (
        <ul>
          {items.map((item) => (
            <li key={item.id}>Item Name: {item.name} | Store ID: {item.store_id} 
            <button onClick={() => deleteItemById(item.id)}>Delete Item</button>
            </li>      
          ))}
        </ul>
      )
    }
    else {
      itemButtons = (
        <p>
          Store is empty
        </p>
      )
    }
  }

  return (
    <div className="App">
      {storeButtons}
      {itemButtons}
    </div>
  )
}

export default App
