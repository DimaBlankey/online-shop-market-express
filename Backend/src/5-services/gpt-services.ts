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

async function generatePrompt(searchValue: string): Promise<string>{
    const products = JSON.stringify(await getProductsForGpt());
    const prompt = `
    I want to cook this:
    ${searchValue}.
    list the ingredients (ul list).
    write the instructions to cook it (ul list).
    then, separately, based in this list of products:
    ${products}
    write back JSON of productCode that i need to buy to make that meal.  
    `
    return prompt.trim()
}


export default {
    generatePrompt
}