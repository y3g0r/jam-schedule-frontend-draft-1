import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'


export function UserHeader() {
    return (
        <>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </>
    )
}