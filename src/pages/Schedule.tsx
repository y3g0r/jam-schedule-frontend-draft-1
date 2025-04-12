export function Schedule() {
    return (
        <>
            <h1>Schedule</h1>
            <form action="" onSubmit={(e) => e.preventDefault()}>
                <div >
                    <label for="name">Name: </label>
                    <input type="text" name="name" id="name" required />
                </div>
                <div>
                    <label for="start-date">Date: </label>
                    <input
                        type="date"
                        id="start-date"
                        name="start-date"
                        // value="2018-07-22"
                        min="2018-01-01"
                        max="2118-12-31" />
                </div>
                <div>
                    <label for="start-time">Start: </label>
                    <input
                        type="time"
                        id="start-time"
                        name="start-time"
                        min="09:00"
                        max="18:00"
                        required />
                </div>
                <div>
                    <label for="duration">Duration: </label>
                    <input
                        type="time"
                        id="duration"
                        name="duration"
                        // min="09:00"
                        // max="18:00"
                        required />
                </div>
                <div>
                    <input type="submit" value="Schedule!"/>
                </div>
            </form>
        </>
    )
}