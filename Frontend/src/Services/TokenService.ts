import axios from "axios";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionType, authStore } from "../Redux/AuthState";

class RefreshTokenService {
  public async refreshToken(userId: number): Promise<string> {
    const userResponse = await axios.get<UserModel>(appConfig.userInfoUrl + userId);
    const user = userResponse.data;
    try {
      const response = await axios.post<string>(appConfig.tokenUrl, user);
      const refreshToken = response.data;

      // Update the token in the state
      authStore.dispatch(this.updateTokenAction(refreshToken));

      return refreshToken;
    } catch (error) {
      throw new Error("Failed to refresh token.");
    }
  }

  private updateTokenAction(token: string): AuthAction {
    return {
      type: AuthActionType.UpdateToken,
      payload: token,
    };
  }
}
const refreshTokenService = new RefreshTokenService();

export default refreshTokenService;
