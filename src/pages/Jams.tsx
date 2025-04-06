import { useNavigate } from "react-router"

export function Jams() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Jams</h1>
            <div><button onClick={() => navigate("/")}>Home</button></div>
        </>
    )
}