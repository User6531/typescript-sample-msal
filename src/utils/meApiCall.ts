import axios from "./axios";

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  avatar: string;
};

export const meApiCall = async () =>
  await axios.get<TUser>(
    `https://bvcoworking-api.azurewebsites.net/api/v1/auth/me`
  );
