import axios from "./axios";
export type TDonutGraphItem = {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
  avatar?: string; // base64
  bookedDays?: string[];
};

export const fetchDonutGraphData = async (): Promise<{
  data: TDonutGraphItem | null;
  error: Error | null;
}> => {
  try {
    const res = await axios.get<TDonutGraphItem>(
      `https://bvcoworking-api.azurewebsites.net/api/v1/auth/me`
    );
    return {
      data: res.data || null,
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      data: null,
      error: error as Error,
    };
  }
};
