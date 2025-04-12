import { Link } from "react-router";

export function Home() {
    return (
        <>
            <h1>Jam Schedule</h1>
            <p>This site will help you organize your rehearsals.</p>
            <Link to="/schedule">Schedule</Link>
        </>
    )
}