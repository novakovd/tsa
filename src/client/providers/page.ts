import { StatusCodes } from "http-status-codes";
import { MessagePayload, SecureIdPayload } from "../../shared/types/payload";

const getPage = async <T>(url: string, data: T): Promise<string> => {
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

export const getSavePage = async (payload: MessagePayload): Promise<string> => {
  return getPage<MessagePayload>("/save", payload);
};

export const getRevealPage = async (
  payload: SecureIdPayload
): Promise<string> => {
  return getPage<SecureIdPayload>("/reveal", payload);
};
