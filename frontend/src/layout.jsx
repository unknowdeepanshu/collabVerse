import { Outlet } from 'react-router-dom'
import RoomContextProvider from './context/roomContextProvide'
export default function Layout() {
    return (
        <RoomContextProvider>
            <Outlet />
        </RoomContextProvider>
    )
}