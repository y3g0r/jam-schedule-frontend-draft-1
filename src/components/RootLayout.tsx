import { Outlet } from "react-router";
import { NavBar } from "./NavBar";
import { UserHeader } from "./UserHeader";

export function RootLayout() {
    return (
        <>
            <UserHeader />
            <NavBar />
            <Outlet />
        </>
    )
}