import axios from "./axios";
export type TDonutGraphItem = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

export const fetchDonutGraphData = async (): Promise<{
  data: TDonutGraphItem[];
  error: Error | null;
}> => {
  try {
    const res = await axios.get<TDonutGraphItem[]>(
      `https://bvcoworking-api.azurewebsites.net/api/v1/users`
    );
    return {
      data: res.data || [],
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      data: [],
      error: error as Error,
    };
  }
};
