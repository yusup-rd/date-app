/// <reference types="node" />

import axios from "axios";

export const handler = async (event: { body: string }) => {
  try {
    const body = JSON.parse(event.body);

    const { food, date, time } = body;

    const message = `
💌 New Date Planned

🍔 Food: ${food}
📅 Date: ${date}
⏰ Time: ${time}
`;

    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: message,
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";

    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  }
};
