import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Browse from './pages/Browse'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/browse' element={<Browse />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
