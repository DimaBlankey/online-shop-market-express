class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  idCardNumber: number;
  city: string;
  address: string;
  roleId: number;
  password: string

  public constructor(user: UserModel) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.idCardNumber = user.idCardNumber;
    this.city = user.city;
    this.address = user.address;
    this.roleId = user.roleId;
    this.password = user.password
  }

//   Do Validation!

}

export default UserModel;
