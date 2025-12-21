import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import Home from './components/home/home.jsx'
import About from './components/about/about.jsx'
import SidebarDemo from './components/dashboard/dashboard.jsx'
import Layout from './layout.jsx'
import { SignedIn } from '@clerk/clerk-react'
import Play from './components/playgroundmain for now/GameSetup/loadGame.jsx'
import ChatMessage from './components/chatmessage/chat.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      }
    ]
  },  
  {
    path:"/dashboard",
    // element:<SignedIn><Layout /></SignedIn>,
    element:<Layout />,
    children:[{
      path:"",
      element:<SidebarDemo/>
    },{
      path:"playground",
      element:<Play/>
    }
    ]
  },{
    path:"/chatmessage",
    element:<ChatMessage/>
  }
])

createRoot(document.getElementById('root')).render(
  
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router}/>  
    </ClerkProvider>
)
