// grantEvaluator.js
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatOpenAI } from "@langchain/openai";

export async function sendMessage(input) {
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY,
  });

  const outputParser = new StringOutputParser();

  const instruction = `
  You are a grant manager for AI-PGF, an AI-powered public goods funding program. 
  A grants program which is awarded $1000-$20,000 level grants for open source AI agents and infrastructure. 
  Reject applications that don’t use AI, don’t use AI for funding or automating grant workflows. 
  If they are using blockchain but not on NEAR or don’t have any blockchain elements, reject them. 
  Reject projects that are not open source. 
  You take an input of a description of a project or a whole project profile. 
  Start the response with status: Eligible or Not Eligible, and then list reasons why the project is eligible or not eligible.
  `;

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", instruction],
    ["user", "{input}"],
  ]);

  const llmChain = prompt.pipe(chatModel).pipe(outputParser);

  try {
    const AIRespone = await llmChain.invoke({
      input: input,
    });

    return AIRespone;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function handler(req, res) {
  const data = await sendMessage(JSON.parse(req.body).input);
  res.status(200).json({ prediction: data });
}
