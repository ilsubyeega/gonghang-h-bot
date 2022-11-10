import Meal from "./interfaces/meal"

const days = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토'
]

export async function getMeal(date: string): Promise<Meal> {
    const req = await fetch(`${MEAL_API_URL}MLSV_YMD=${date}`)
    const res = await req.json() as any;
    return res?.mealServiceDietInfo?.[1].row?.[0] as Meal;
}

export function dateToArray(date: string): number[] {
    return [parseInt(date.substr(0, 4)), parseInt(date.substr(4, 2)), parseInt(date.substr(6, 2))];
}

export function pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export function getDayFromText(input: string): string {
    const datearr = dateToArray(input);
    const date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
    console.log(date)
    return days[date.getDay()];
}