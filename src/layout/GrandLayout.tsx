import DesktopLayout from "./desktop"
import { Outlet } from "react-router-dom"

export const GrandLayout = () => {
  return (
    <DesktopLayout>
        <Outlet />
    </DesktopLayout>
  )
}
