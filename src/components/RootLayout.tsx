import { Outlet } from "react-router";
import { UserHeader } from "./UserHeader";

export function RootLayout() {
    return (
        <>
            <UserHeader />
            {/* <NavBar /> */}
            <Outlet />
        </>
    )
}