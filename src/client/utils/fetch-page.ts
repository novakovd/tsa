import { StatusCodes } from "http-status-codes";

export const fetchPage = async <T>(url: string, data: T): Promise<string> => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.status !== StatusCodes.OK) throw new Error("Invalid request");

      return res;
    })
    .then((res) => res.json())
    .then((json) => json.html);
};
