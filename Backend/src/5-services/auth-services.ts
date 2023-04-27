import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";
import logger from "../4-utils/logger";
import cartServices from "./cart-services";

// Register new user:
async function register(user: UserModel): Promise<string> {
  // Do Validation

  // Is username taken:
  const isTaken = await isUserEmailTakenOrIdTaken(user.email, user.idCardNumber);
  if (isTaken) throw new ValidationError(`Email ${user.email} Or ID ${user.idCardNumber} already taken`);

  // Hash password:
  user.password = cyber.hashPassword(user.password);

  // Set role as a regular user:
  user.roleId = 2;

  // Create query:
  const sql = `INSERT INTO users VALUES(
        DEFAULT,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?)`;

  // Execute:
  const result: OkPacket = await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.email,
    user.idCardNumber,
    user.city,
    user.address,
    user.roleId,
    user.password,
  ]);

  // Set back auto-increment id:
  user.id = result.insertId;

    // Create Cart
  user.cartId = await cartServices.createNewCart(user.id)
 
  // Create token:
  const token = cyber.createToken(user);

  // Log activity:
  logger.logActivity(user.email + " has signed up");

 
  // Return token:
  return token 
}

async function isUserEmailTakenOrIdTaken(email: string, idCardNumber: number): Promise<boolean> {
  // Create query:
  const sql = `SELECT EXISTS(SELECT * FROM users WHERE email = ? OR idCardNumber = ?) AS isTaken`;

  // Execute:
  const arr = await dal.execute(sql, [email, idCardNumber]);

  // Get is taken value:
  const isTaken: number = arr[0].isTaken;

  // Return true if username taken:
  return isTaken === 1;
}

// Login:
async function login(credentials: CredentialsModel): Promise<string> {
  credentials.validateCredentials();

  // Hash password:
  credentials.password = cyber.hashPassword(credentials.password);

  // Query:
  const sql = `SELECT * FROM users WHERE
        email = ? AND
        password = ? `;

  // Execute:
  const users = await dal.execute(sql, [
    credentials.email,
    credentials.password,
  ]);

  // Extract user:
  const user = users[0];

  // If user not exist:
  if (!user) throw new UnauthorizedError("Incorrect email or password");

   // Get Cart
   user.cartId = await cartServices.getCartIdByUser(user.id)

  // Create token:
  const token = cyber.createToken(user);

  // Log activity:
  logger.logActivity(credentials.email + " has logged in.");

  // Return token:
  return token;
}

export default {
  register,
  login,
};
