import { NextRequest } from "next/server";

import {
  GoogleGenerativeAI,
  GenerateContentRequest,
  Tool,
  GoogleSearchRetrievalTool,
  Content,
  POSSIBLE_ROLES,
  TextPart,
  DynamicRetrievalMode,
} from "@google/generative-ai";
import { error } from "console";

const googleSearchRetrievalTool: GoogleSearchRetrievalTool = {
  googleSearchRetrieval: {
    dynamicRetrievalConfig: {
      mode: DynamicRetrievalMode.MODE_UNSPECIFIED,
      dynamicThreshold: 0.5,
    },
  },
};

const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

// type GenerativeAIGame = {
//     domain: string
// }


// AI System Task
// Given a description of their brand, target, audience, and product they're selling, create an opening screen for a game and coupon content using this info

// Ask user to write about their brand
// target market audience for specific campaign 
// info about their product they're trying to sell (this includes product specs)




// Ask user to to upload a doc about their brand (Coming)
// Ask user to enter domain (Coming)

export async function GET(request: NextRequest) {
  //   const authHeader = request.headers.get("authorization");
  //   if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return new Response("Unauthorized", {
  //       status: 401,
  //     });
  //   }

  //   const domain: string = await request.json();

  const userPrompt: TextPart = { text: "What does wiply.com do" };

  const prompt: Content = {
    role: POSSIBLE_ROLES[0],
    parts: [userPrompt],
  };

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  //   const model = genAI.getGenerativeModel(
  //     {
  //       model: "models/gemini-1.5-flash",
  //       tools: [
  //         {
  //           googleSearchRetrieval: {
  //             dynamicRetrievalConfig: {
  //               mode: DynamicRetrievalMode.MODE_DYNAMIC,
  //               dynamicThreshold: 0.7,
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     { apiVersion: "v1beta" }
  //   );

  const content = `{"contents":
          [{"parts": [{"text": "What is the current Google stock price?"}]}],
      "tools": [{"google_search_retrieval": {
                  "dynamic_retrieval_config": {
                    "mode": "MODE_DYNAMIC",
                    "dynamic_threshold": 1,
                }
            }
        }
    ]
}`;

  fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-002:generateContent?key=${GOOGLE_API_KEY}`,
    {
      method: "POST",
      body: content,
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data", data);
    })
    .catch((error) => {
      console.log("error", error);
    });

  //   const contentRequest: GenerateContentRequest = {
  //     contents: [prompt],
  //   };

  //   const result = await model.generateContent("What does wiply.com do");
  //   console.log("result", result);
  //   console.log(result.response.text());

  return Response.json({ success: true });
}
