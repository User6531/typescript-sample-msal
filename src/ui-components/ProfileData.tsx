import List from "@material-ui/core/List";
import { useState } from "react";
import { fetchDonutGraphData, TDonutGraphItem } from "../utils/donutApiCall";

import { TUser } from "../utils/meApiCall";
import { refreshAccessToken } from "../utils/refreshAccessToken";

export const ProfileData: React.FC<{ graphData: TUser }> = ({ graphData }) => {
  const [first, setfirst] = useState<TDonutGraphItem[]>([]);
  const [error, setErorr] = useState<Error | null>(null);

  const getDonutData = async () => {
    const res = await fetchDonutGraphData();
    if (res !== undefined) {
      setfirst(res.data);
      setErorr(res.error);
    }
  };

  const setFakeToken = () => {
    localStorage.setItem(
      "accessToken",
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2ljdGVyeXVzY2hhcnRkZXYub25taWNyb3NvZnQuY29tL0NoYXJ0QXBwLURldiIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzhmOWY1NmIzLTEzODEtNDgzMS1hNThjLWRhZTJkNDE0YzQyZi8iLCJpYXQiOjE2NTkyODQ0MTUsIm5iZiI6MTY1OTI4NDQxNSwiZXhwIjoxNjU5Mjg4OTg5LCJhY3IiOiIxIiwiYWlvIjoiQVlRQWUvOFRBQUFBa01ENVZrSHhITnp2bU9KU0JiUE94SUR4eHpPaTQrMDh0Qk1xUkx0Nnp2Nnp3VkpnalMxWFJkZ1pzN1R5U0R0QUZSdzA3KzV2azRSQys2cVBZREJuazRWenovOWsrejlZdFlYRk4rZ2RqSEpDc1RmMS9wbmgwUVZBU0FrU1ZjTXBPVVVFVFZSdlBacE1wclVNZStxSGo2YzlyQWRuTWxhcnplVGlEZno0cll3PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwaWQiOiI5ZGIyOTdiZC0zN2MzLTQ1YjItOTU1NC05MTMyM2YyZDNkZjEiLCJhcHBpZGFjciI6IjAiLCJlbWFpbCI6ImFuZHJpeS5rcnl2b3J1Y2hrb0BCbGFja3Rob3JuLXZpc2lvbi5jb20iLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xODI1MzQwYy1mZmJiLTQ4YzgtYWRhNS1mNDM2MTIzZGU3NDMvIiwiaXBhZGRyIjoiMTg4LjE2My4xMTQuMjQ0IiwibmFtZSI6IkFuZHJpeSBLcnl2b3J1Y2hrbyIsIm9pZCI6Ijk1MTlmOGFhLTY5OTEtNDllOS04MDY0LTFhMmFiYmIyNDBjYiIsInJoIjoiMC5BVTRBczFhZmo0RVRNVWlsak5yaTFCVEVMNzJYc3AzRE43SkZsVlNSTWo4dFBmRk9BQ0kuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiSzVaUVlCeDNPVnFSYjBSdWx0ckFnRWVDR3F1dDhrRjZXQUpMNWI0QUEtWSIsInRpZCI6IjhmOWY1NmIzLTEzODEtNDgzMS1hNThjLWRhZTJkNDE0YzQyZiIsInVuaXF1ZV9uYW1lIjoiYW5kcml5LmtyeXZvcnVjaGtvQEJsYWNrdGhvcm4tdmlzaW9uLmNvbSIsInV0aSI6Iks2b1ZEbGRiWEV1VUV4VjRfV3FxQUEiLCJ2ZXIiOiIxLjAifQ.GSI7Xi4SqHxrBPgSQfew89jz-_CdU8N9rvVNS0bOuevXe0s0XlEj8xTFl6HUYB6uKzOJpLMf4K65L91MG5NNcd4k9Y5OTt3Bj1pydczIx23nc2MjuV5BTxxQaquamORTniub0vxNOxrGoRNk1W7KN-3X2m9PY7qWokhc9-T3Jl9JiezaFNhu_QUBK_qKaCUgpD46oT_pG--KGxFIFSCU0RKSMaSsg-ykXSKxkCU6QNabSGSiR1hgjmP0J9OVouNirExc_Rl1qHsG3NrgEbkut2JJH2XihTYm8OTWJVLTafO-5P701jlduqpxJu_E8zXJ78O4ZbWBKmKFoF0EJGFoUQ"
    );
  };

  const setRealToken = async () => await refreshAccessToken();

  return (
    <List className="profileData">
      <div>{"id:" + graphData.id}</div>
      <div>{"avatar:" + graphData.avatar}</div>
      <div>{"email:" + graphData.email}</div>
      <div>{"firstName:" + graphData.firstName}</div>
      <div>{"isAdmin:" + graphData.isAdmin}</div>
      <div>{"lastName:" + graphData.lastName}</div>
      <div> =================================================</div>
      <div>
        <button onClick={getDonutData}>get data from be</button>{" "}
        <button onClick={setFakeToken}>set fake token</button>{" "}
        <button onClick={setRealToken}>set real token</button>{" "}
      </div>
      {first.length > 0 && <div key={first[0].id}>{first[0].email}</div>}
      <div>{error && error.message}</div>{" "}
      {(error || first.length > 0) && (
        <button
          onClick={() => {
            setfirst([]);
            setErorr(null);
          }}
        >
          clear
        </button>
      )}
    </List>
  );
};
