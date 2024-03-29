
import express, { Request, Response, NextFunction } from "express";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import gptServices from "../5-services/gpt-services";
import appConfig from "../4-utils/app-config";
import apiKey from "../4-utils/gptApiKey";
import axios from "axios";

const router = express.Router();

router.post(
  "/gpt/:searchValue",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const searchValue = request.params.searchValue;

      // Generate prompts
      const promptIngredients = await gptServices.generatePromptIngredients(searchValue);
      const promptInstructions = await gptServices.generatePromptInstructions(searchValue);
      const promptProducts = await gptServices.generatePromptProducts(promptIngredients);

      // Prepare request body for chat completion
      const bodyIngredients = {
        messages: [{ role: "user", content: promptIngredients }],
        model: "gpt-4",
        max_tokens: 3000,
      };

      const bodyInstructions = {
        messages: [{ role: "user", content: promptInstructions }],
        model: "gpt-4",
        max_tokens: 3000,
      };

      const bodyProducts = {
        messages: [{ role: "user", content: promptProducts }],
        model: "gpt-4",
        max_tokens: 3000,
      };

      // Make requests
      const gptResponseIngredients = await axios.post(appConfig.gptUrl, bodyIngredients, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      const gptResponseInstructions = await axios.post(appConfig.gptUrl, bodyInstructions, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      const gptResponseProducts = await axios.post(appConfig.gptUrl, bodyProducts, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      // Extract responses from chat completion
      const ingredients = gptResponseIngredients.data.choices[0].message.content;
      const instructions = gptResponseInstructions.data.choices[0].message.content;
      const products = gptResponseProducts.data.choices[0].message.content;

      // Return response with three values
      response.json({ ingredients, instructions, products });

    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
















































// import express, { Request, Response, NextFunction } from "express";
// import verifyLoggedIn from "../3-middleware/verify-logged-in";
// import gptServices from "../5-services/gpt-services";
// import appConfig from "../4-utils/app-config";
// import apiKey from "../4-utils/gptApiKey";
// import axios from "axios";

// const router = express.Router();


// router.post(
//   "/gpt/:searchValue",
//   verifyLoggedIn,
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const searchValue = request.params.searchValue;

//       // Generate prompts
//       const promptIngredients = await gptServices.generatePromptIngredients(searchValue);
//       const promptInstructions = await gptServices.generatePromptInstructions(searchValue);
//       const promptProducts = await gptServices.generatePromptProducts(promptIngredients);

//       // Prepare request body
//       const bodyIngredients = {
//         prompt: promptIngredients,
//         model: "text-davinci-003",
//         max_tokens: 3000,
//       };

//       const bodyInstructions = {
//         prompt: promptInstructions,
//         model: "text-davinci-003",
//         max_tokens: 3000,
//       };

//       const bodyProducts = {
//         prompt: promptProducts,
//         model: "text-davinci-003",
//         max_tokens: 3000,
//       };

//       // Make requests
//       const gptResponseIngredients = await axios.post(appConfig.gptUrl, bodyIngredients, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + apiKey,
//         },
//       });

//       const gptResponseInstructions = await axios.post(appConfig.gptUrl, bodyInstructions, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + apiKey,
//         },
//       });

//       const gptResponseProducts = await axios.post(appConfig.gptUrl, bodyProducts, {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: "Bearer " + apiKey,
//         },
//       });

//       // Gather responses
//       const ingredients = gptResponseIngredients.data.choices[0].text;
//       const instructions = gptResponseInstructions.data.choices[0].text;
//       const products = gptResponseProducts.data.choices[0].text;

//       // Return response with three values
//       response.json({ingredients, instructions, products});
      
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );


// export default router;
