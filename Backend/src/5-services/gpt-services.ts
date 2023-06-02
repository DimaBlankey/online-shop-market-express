import { OkPacket } from "mysql";
import ProductModel from "../2-models/product-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";
import logger from "../4-utils/logger";


async function getProductsForGpt(): Promise<string>{
    const sql = `
    SELECT name, productCode
    FROM products
    `
    const products = await dal.execute(sql);
    return products
}

async function generatePromptIngredients(searchValue: string): Promise<string>{
    const products = JSON.stringify(await getProductsForGpt());
    const prompt = `
    I want to cook this:
    ${searchValue}.
    based on this list of products:
    ${products}.
    list the ingredients, by name only (without productCode), needed for it.
    `
    return prompt.trim()
}


async function generatePromptInstructions(searchValue: string): Promise<string>{
    const prompt = `
    I want to cook this:
    ${searchValue}.
    write the instructions to cook it.
    `
    return prompt.trim()
}

async function generatePromptProducts(searchValue: string): Promise<string>{
    const products = JSON.stringify(await getProductsForGpt());
    const ingredients = await generatePromptIngredients(searchValue);
    const prompt = `
    based on this ingredients:
    ${ingredients}.
    and this products:
    ${products}.
    write back a valid JSON file of productsCode.
    Just the JSON without any comments or headlines.
    Example:
    [{"productCode":"z"},{"productCode":"y"},{"productCode":"x"}]
    `
    return prompt.trim()
}

export default {
    generatePromptInstructions,
    generatePromptIngredients,
    generatePromptProducts
}