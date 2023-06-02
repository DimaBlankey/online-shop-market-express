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
      const prompt = await gptServices.generatePrompt(searchValue);

      const body = {
        prompt,
        model: "text-davinci-003",
        max_tokens: 2500,
      };

      const gptResponse = await axios.post(appConfig.gptUrl, body, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + apiKey,
        },
      });

      const completion = gptResponse.data.choices[0].text;
      response.json(completion);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
