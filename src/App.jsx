import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Browse from './pages/Browse'
import ProductPage from './pages/ProductPage'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='browse' element={<Browse />}>
            <Route path=":productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
