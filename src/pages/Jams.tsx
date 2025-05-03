import { JamList } from "../components/jam/JamList";
import { Schedule } from "./Schedule";
import { SignedIn, SignedOut, SignInButton} from "@clerk/clerk-react";

// TODO: add fallback content when there is no internet connection
export function Jams() {
    return (
        <>
            <h1>Jams</h1>
            <SignedOut>
                <span>Sign in to be able to create and see your jams</span>
                <div>
                    <SignInButton />
                </div>
            </SignedOut>
            <SignedIn>
                <Schedule />
                <JamList />
            </SignedIn>
        </>
    )
}