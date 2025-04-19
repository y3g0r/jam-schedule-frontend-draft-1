import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { JAM_LIST_QUERY_KEY, schedule } from "../api/jams";
import { useUser } from "@clerk/clerk-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
    name: string;
    startDate?: Date;
    startTime?: number;
    durationHours: number;
    durationMinutes: number;
    location: string;
  }

export function Schedule() {
    const [name, setName] = useState("")
    const [duration, setDuration] = useState(120);
    const [date, setDate] = useState(new Date());
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0];
    console.log(date)
    const { user } = useUser()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: schedule,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JAM_LIST_QUERY_KEY] })
        }
    })
    const { register, handleSubmit } = useForm<IFormInput>()
    const changeDuration = (delta: number) => {
        if (duration + delta < 0) {
            setDuration(0)
            return
        }
        setDuration(duration + delta)
    }
    const onDurationHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = Number.parseInt(e.target.value);
        const minutes = duration % 60;
        setDuration(hours * 60 + minutes);
    }

    const onDurationMinutesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = Math.floor(duration / 60);
        const minutes = Number.parseInt(e.target.value);
        setDuration(hours * 60 + minutes);
    }

    const reset = () => {
        setName("")
        setDuration(120)
        setDate(new Date())
    }
    const newJam: SubmitHandler<IFormInput> = (formData) => {
        if (user === undefined || user === null) {
            throw new Error("user is not available")
        }
        console.log(formData)
        mutation.mutate({
            name: formData.name,
            start: new Date(),
            end: new Date(),
            userId: user.id
        })
        reset()
    }

    return (
        <>
            <h1>Schedule</h1>
            <form onSubmit={handleSubmit(newJam)}>
                <div >
                    <label>
                        Name: 
                        <input 
                            type="text" 
                            {...register("name")}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="i.e. Best band regular rehearsal"
                            required 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Date: 
                        <input
                            type="date"
                            {...register("startDate")}
                            value={dateString}
                            onChange={e => setDate(new Date(e.target.value))}
                            min="2018-01-01"
                            max="2118-12-31" 
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Start: 
                        <input
                            type="time"
                            {...register("startTime")}
                            min="09:00"
                            max="18:00"
                            required />
                    </label>
                </div>
                <div>
                    <label>
                        Duration: 

                        <input 
                            type="button"
                            value="-15m"
                            onClick={() => changeDuration(-15)}
                        />
                        <input 
                            type="button"
                            value="-1h"
                            onClick={() => changeDuration(-60)}
                        />
                        <input
                            type="number"
                            {...register("durationHours")}
                            min="0"
                            value={Math.floor(duration / 60)}
                            onChange={onDurationHoursInputChange}
                            required />
                        <input
                            type="number"
                            {...register("durationMinutes")}
                            min="0"
                            max="59"
                            value={Math.floor(duration % 60)}
                            onChange={onDurationMinutesInputChange}
                            required />
                        <input 
                            type="button"
                            value="+1h"
                            onClick={() => changeDuration(60)}
                        />
                        <input 
                            type="button"
                            value="+15m"
                            onClick={() => changeDuration(15)}
                        />  
                    </label>
                </div>
                <div>
                    <label>
                        Location:

                        <input
                            {...register("location")}
                            type="text"
                        />
                    </label>
                </div>
                <div>
                    <input type="submit" value="Schedule!"/>
                </div>
            </form>
        </>
    )
}