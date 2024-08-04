interface IUserCommon {
  fullname: string;
  email: string;
  password: string;
}
interface IEditUser {
  _id: string;
  updatedBy: string;
  fullname?: string;
  email?: string;
  password?: string;
}
interface ICreateUser extends IUserCommon {}
export type { IEditUser, ICreateUser };
