import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { JAM_LIST_QUERY_KEY, NewJamData, createJam } from "../api/jams";
import { useAuth, useUser } from "@clerk/clerk-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { dateToHtmlDateInputString, dateToHtmlTimeInputString, parseHtmlTimeInput } from "../utils/dateUtils";

interface IFormInput {
    name: string;
    startDate?: Date | null;
    startTime?: number | null;
    durationHours: number;
    durationMinutes: number;
    location: string;
    organizerWillJoin: boolean;
    participant: string;
}

interface IParticipant {
    id: string;
}

interface IFormState {
    name: string;
    startLocalDateTime: Date;
    isStartTimeSet: boolean;
    totalDurationInMinutes: number;
    location: string;
    organizerWillJoin: boolean;
    participants: IParticipant[];
    addParticipantInput: string;
}

function inititalState(): IFormState {
    const newDate = new Date();
    newDate.setSeconds(0);
    return {
        name: "",
        startLocalDateTime: newDate,
        isStartTimeSet: false,
        totalDurationInMinutes: 120,
        location: "",
        organizerWillJoin: true,
        participants: [],
        addParticipantInput: "",
    }
}

export function Schedule() {
    const [ state, setState ] = useState<IFormState>(inititalState());
    const { user } = useUser()
    const { getToken } = useAuth()
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (data: NewJamData) => createJam(data, getToken),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [JAM_LIST_QUERY_KEY] })
            // queryClient.refetchQueries({ queryKey: [JAM_LIST_QUERY_KEY] }); // Force refetch

            console.log("Schedule.mutation.onSuccess finished")
        }
    })
    const { register, handleSubmit } = useForm<IFormInput>()
    const changeDuration = (delta: number) => {
        const duration = Math.max( state.totalDurationInMinutes + delta, 0)
        setState({...state, totalDurationInMinutes: duration})
    }
    const onDurationHoursInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = Number.parseInt(e.target.value);
        const minutes = state.totalDurationInMinutes % 60;
        setState({...state, totalDurationInMinutes: hours * 60 + minutes})
    }
    const onDurationMinutesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hours = Math.floor(state.totalDurationInMinutes / 60);
        const minutes = Number.parseInt(e.target.value);
        setState({...state, totalDurationInMinutes: hours * 60 + minutes})
    }
    const schedule: SubmitHandler<IFormInput> = (formData) => {
        if (user === undefined || user === null) {
            throw new Error("user is not available")
        }
        console.log(formData)
        mutation.mutate({
            name: formData.name,
            start: state.startLocalDateTime,
            end: state.startLocalDateTime,
            userId: user.id
        })
    }

    return (
        <>
            <h2>Schedule</h2>
            <form onSubmit={handleSubmit(schedule)}>
                <div >
                    <label>
                        Name: 
                        <input 
                            type="text" 
                            {...register("name")}
                            value={state.name}
                            onChange={(e) => setState({...state, name: e.target.value})}
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
                            value={dateToHtmlDateInputString(state.startLocalDateTime)}
                            onChange={(e) => {
                                const input = e.target.value
                                console.log(`startDate.onChange.e.target.value: ${input}`)
                                if (input === "") return // TODO - better handling

                                const inputDate = new Date(input)
                                if (state.isStartTimeSet) {
                                    inputDate.setHours(state.startLocalDateTime.getHours())
                                    inputDate.setMinutes(state.startLocalDateTime.getMinutes())
                                }
                                setState({...state, startLocalDateTime: inputDate})
                            }}
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
                            value={state.isStartTimeSet ? dateToHtmlTimeInputString(state.startLocalDateTime) : ""}
                            onChange={(e) => {
                                console.log(`startTime.onChange: ${e.target.value}`)
                                if (e.target.value !== "") {
                                    const {hours, minutes} = parseHtmlTimeInput(e.target.value)
                                    const newStartDateTime = new Date(state.startLocalDateTime)
                                    newStartDateTime.setHours(hours)
                                    newStartDateTime.setMinutes(minutes)
                                    setState({
                                        ...state, 
                                        startLocalDateTime: newStartDateTime,
                                        isStartTimeSet: true
                                    })
                                }
                                else {
                                    setState({
                                        ...state, 
                                        isStartTimeSet: false
                                    })
                                }
                            }}
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
                            value={Math.floor(state.totalDurationInMinutes / 60)}
                            onChange={onDurationHoursInputChange}
                            required />
                        <input
                            type="number"
                            {...register("durationMinutes")}
                            min="0"
                            max="59"
                            value={state.totalDurationInMinutes % 60}
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
                            type="text"
                            {...register("location")}
                            value={state.location}
                            onChange={(e) => setState({...state, location: e.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        I will join:
                        <input type="checkbox" 
                            {...register("organizerWillJoin")} 
                            checked={state.organizerWillJoin} 
                            onChange={() => setState({...state, organizerWillJoin: !state.organizerWillJoin})}
                        />
                    </label>
                </div>
                <div>
                    <div>Participants:</div>
                    <ul>
                        {state.participants.map((participant, i) => (
                            <li key={i}>
                                <input type="text" value={participant.id} onChange={(e) => {
                                    const {participants: items} = state;
                                    setState({...state, participants: [...items.slice(0, i), {id: e.target.value}, ...items.slice(i+1, items.length)]})
                                }}/>
                                <button type="button" value={participant.id} onClick={() => setState({...state, participants: state.participants.filter((_, index) => i !== index)})}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <input type="email" 
                        {...register("participant")}
                        value={state.addParticipantInput}
                        placeholder="email address"
                        onChange={(e) => setState({...state, addParticipantInput: e.target.value})}
                    />
                    <button type="button" disabled={state.addParticipantInput.length === 0} onClick={() => {
                        if (state.addParticipantInput.length === 0) return
                            setState({
                                ...state, 
                                participants: [...state.participants, {id: state.addParticipantInput}], 
                                addParticipantInput: ""
                            })
                        }}>Add</button>
                    <button type="button" disabled={state.addParticipantInput.length === 0} onClick={() => setState({...state, addParticipantInput: ""})}>Clear</button>
                </div>
                <div>
                    <input type="submit" value="Schedule!"/>
                </div>
            </form>
        </>
    )
}