export function dateToHtmlDateInputString(date: Date | null): string {
    if (date === null) return "";

    const result = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().split("T")[0]
    console.log(`dateToHtmlDateInputString: ${result}`)
    return result
}


export function dateToHtmlTimeInputString(date: Date | null): string {
    if (date === null) return "";

    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return `${hours}:${minutes}`
}

export interface Time {
    hours: number;
    minutes: number;

}
export function parseHtmlTimeInput(input: string): Time {
    const match = input.match(/(\d{2}):(\d{2})/)
    console.log(`parseHtmlInputTime: match: ${match}`)
    if (match === null) return {hours: 0, minutes: 0 }

    return {hours: parseInt(match[1]), minutes: parseInt(match[2]) }
}