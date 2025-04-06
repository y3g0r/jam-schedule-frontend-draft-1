import { useNavigate } from "react-router"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export function Home() {
    const navigate = useNavigate();
    return (
        <>
        <header>
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
        </header>
        <h1>Jam Schedule</h1>
        <div><button onClick={() => navigate("/schedule")}>Schedule</button></div>
        <div><button onClick={() => navigate("/jams")}>Jams</button></div>
        <div><button onClick={() => navigate("/blog")}>Blog</button></div>
        
        </>
    )
}