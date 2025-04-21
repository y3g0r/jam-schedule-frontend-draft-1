export const JAM_QUERY_KEY = 'jam';
export const JAM_LIST_QUERY_KEY = 'jamList';

export interface JamData {
    id: number;
    name: string;
    start: Date;
    end: Date;
    createdBy: string
}

export interface NewJamData {
    name: string;
    start: Date;
    end: Date;
    userId: string
}

export const JAMS: JamData[] = [
    {id: 1, name: "Prepare to live!", start: new Date("2025-04-19T14:00"), end: new Date("2025-04-19T16:00"), createdBy: "123"},
    {id: 2, name: "Let there be rock!", start: new Date("2025-05-05T18:00"), end: new Date("2025-05-05T20:00"), createdBy: "234"}
]

export const createJam = async (data: NewJamData): Promise<JamData> => {
    console.log(`createJam called`)
    const maxId = JAMS.reduce((previous, current) => current.id > previous ? current.id : previous, JAMS.length === 0 ? 0 : JAMS[0].id)
    const newJam = {id: maxId + 1, name: data.name, start: data.start, end: data.end, createdBy: data.userId};
    JAMS.push(newJam)

    return Promise.resolve(newJam)
}

export const getJams = async (): Promise<JamData[]>  => {
    console.log(`getJams called, jams length: ${JAMS.length}`)
    return Promise.resolve(JAMS);
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
    )
  return await res.json()
}


export const getJam = async (id: string | undefined): Promise<JamData | undefined>  => {
    if (id === undefined) {
        return
    }
    
    const jamId = Number.parseInt(id)
    const jam = JAMS.find((value) => value.id == jamId)
    
    console.log(`getJam(${id}) => ${JSON.stringify(jam)}`)
    if (jam === undefined) {
        throw new Error(`Jam ${id} not found`)
    }

    return jam
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`
    )
  return await res.json()
}
