import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash-lite",
    temperature: 0
});

const TABLE_SCHEMA = z.object({
    company_name: z.string().describe("The name of the company."),
    position: z.string().describe("The position that the company is hiring for."),
    pay_range: z.string().describe("The pay range for the position. Write as $low-$high or write 'N/A' if not available."),
    about: z.string().describe("Write a brief description about the company and the position."),
    notes: z.string().optional().describe("Any additional notes about the company or position that are important for anyone applying."),
    website_application_link: z.string().describe("The website or application link for the position."),
});


const modelConvertToTableSchema = model.withStructuredOutput(TABLE_SCHEMA);
export default modelConvertToTableSchema;

