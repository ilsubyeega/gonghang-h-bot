export async function getMeal(date: string): Promise<Meal> {
    const req = await fetch(`${MEAL_API_URL}MLSV_YMD=${date}`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await req.json() as any;
    return res?.mealServiceDietInfo?.[1].row?.[0] as Meal;
}
export function dateToArray(date: string): number[] {
    return [parseInt(date.substr(0, 4)), parseInt(date.substr(4, 2)), parseInt(date.substr(6, 2))];
}
export function pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}
const days = [
    '일',
    '월',
    '화',
    '수',
    '목',
    '금',
    '토'
]
export function getDayFromText(input: string): string {
    const datearr = dateToArray(input);
    const date = new Date(datearr[0], datearr[1] - 1, datearr[2]);
    console.log(date)
    return days[date.getDay()];
}
interface Meal {
    ATPT_OFCDC_SC_CODE: string;
    ATPT_OFCDC_SC_NM: string;
    SD_SCHUL_CODE: string;
    SCHUL_NM: string;
    MMEAL_SC_CODE: string;
    MMEAL_SC_NM: string;
    MLSV_YMD: string;
    MLSV_FGR: string;
    DDISH_NM: string;
    ORPLC_INFO: string;
    CAL_INFO: string;
    NTR_INFO: string;
    MLSV_FROM_YMD: string;
    MLSV_TO_YMD: string;
}