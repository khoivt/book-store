export {};

declare global {
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    results: T[];
  }

  interface IUser {
    avatar: string;
    email: string;
    fullName: string;
    id: string;
    phone: string;
    role: string;
  }

  interface ILogin {
    access_token: string;
    user: IUser;
  }

  interface IRegister {
    _id: string;
    email: string;
    fullName: string;
  }

  interface IFetchAccount {
    user: IUser
  }

}
