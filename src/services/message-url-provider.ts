import * as dotenv from "dotenv";

export const generateMessageUrl = (secureId: string) => {
  return `${process.env.APP_PROTO ?? "http"}://${
    process.env.APP_HOSTNAME ?? "localhost"
  }/t/${secureId}`;
};
