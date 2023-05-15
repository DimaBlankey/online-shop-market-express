import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";
import logger from "../4-utils/logger";
import cartServices from "./cart-services";

async function refreshToken(user): Promise<string> {
  const cartId = await cartServices.getCartIdByUser(user.id);
  const refreshToken = await cyber.createRefreshToken(user, cartId);
  return refreshToken;
}

export default {
  refreshToken,
};
