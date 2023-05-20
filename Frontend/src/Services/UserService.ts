import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import refreshTokenService from "./TokenService";

class UserService {
  public async updateUser(user: UserModel): Promise<void> {
    const response = await axios.put<UserModel>(
      appConfig.userUpdateUrl + user.id,
      user
    );
    const updatedUser = response.data;

    refreshTokenService.refreshToken(user.id)
  }
}

const userService = new UserService();

export default userService;
