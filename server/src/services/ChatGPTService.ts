import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const parseQuickTodo = async (rawText: string) => {

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "todo_refinement",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            description: { type: "string" },
            category: { type: "string" },
            priority: { type: "string" }
          },
          required: ["title", "description", "category"],
          additionalProperties: false
        }
      }
    },
    messages: [
      {
        role: "system",
        content:
          `
          
          You rewrite messy todo input into a polished, helpful todo item.

          RULES:
          - DO NOT ignore any detail from the user's input.
          - If they mention multiple sub-points,
            include ALL of those details in the description.
          - Create a short but meaningful title.
          - Create a clear description that includes every relevant detail, even if implied.
          - Assign a practical category (e.g. Personal, Shopping, Household, Work, Errands, Pet Care, Health, etc.).
          - Assign a practical priority depending on the todo at hand (e.g. High, Medium, Low).

          Output ONLY the JSON structure defined in the schema.

          `,
      },
      {
        role: "user",
        content: rawText
      }
    ]
  });

  const json = JSON.parse(response.choices[0].message.content as string);
  return json;
};
