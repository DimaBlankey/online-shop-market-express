class AppConfig {
  public signupUrl = "http://localhost:4000/api/signup/";
  public loginUrl = "http://localhost:4000/api/login/";
  public userUpdateUrl = "http://localhost:4000/api/user-update/";
  public userInfoUrl = "http://localhost:4000/api/user-info/";
  public productsUrl = "http://localhost:4000/api/products/";
  public cartUrl = "http://localhost:4000/api/cart"
}

const appConfig = new AppConfig();

export default appConfig;
