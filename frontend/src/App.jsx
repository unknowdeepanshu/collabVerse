import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/headers/header'
import Footer from './components/footer/footer'

function App() {
  
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
