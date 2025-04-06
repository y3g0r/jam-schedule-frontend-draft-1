import { useNavigate } from "react-router"

export function Schedule() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Schedule</h1>
            <div><button onClick={() => navigate("/")}>Home</button></div>
        </>
    )
}