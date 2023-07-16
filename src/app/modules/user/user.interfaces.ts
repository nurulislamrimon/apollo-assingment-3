type IUserRoles = "buyer" | "seller";

interface IUser {
  phoneNumber: string;
  role: IUserRoles;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
}

export default IUser;
