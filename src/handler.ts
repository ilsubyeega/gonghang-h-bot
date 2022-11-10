import { getMeal, dateToArray, getDayFromText, pad } from "./function";
export async function handleRequest(request: Request): Promise<Response> {
  console.log("REQ!");
  return new Response(`request method: ${request.method} holy booa`);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function handleScheduled(event: ScheduledEvent): Promise<void> {
  console.log("SCHEDULED!");

  const datetime = new Date(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" }),
    ).getTime() +
    1000 * 60 * 60 * 24,
  );
  const datetext = `${datetime.getFullYear()}${pad(datetime.getMonth() + 1)}${pad(datetime.getDate())}`;

  const meal = await getMeal(datetext);
  if (meal == null) {
    console.log("No meal today");
    return;
  }

  const resdate = dateToArray(meal.MLSV_YMD);
  const textarr = [
    `> __${resdate[0]}년 ${resdate[1]}월 ${resdate[2]}일 (${getDayFromText(meal.MLSV_YMD)})__`,
  ];

  meal.DDISH_NM.split("<br/>")
    .map((a) => `> ${a}`)
    .map((a) => a.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"))
    .forEach((a) => textarr.push(a));

  await fetch(DISCORD_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({
      content: textarr.join("\n"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((a) => console.log("Returned With", a.status));
}
