import { OkPacket } from "mysql";
import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";
import logger from "../4-utils/logger";

async function getOneUser(id: number): Promise<UserModel> {
  const sql = `SELECT * FROM users WHERE id = ?`;
  const user = await dal.execute(sql, [id]);
  return user;
}

async function updateUser(user: UserModel): Promise<UserModel> {
  // Do validation
  const sql = `UPDATE users SET
    firstName = ?,
    lastName = ?,
    city = ?,
    address = ?
    WHERE id = ?
    `;
  const result: OkPacket = await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.city,
    user.address,
    user.id,
  ]);
  if (result.affectedRows === 0) throw new ResourceNotFoundError(user.id);
  // Log activity:
  logger.logActivity("user id:" + user.id + " has changed his details.");

  return user;
}

export default {
  updateUser,
  getOneUser,
};
