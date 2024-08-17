import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.plaid)["exchange-public-token"]["$post"]
>["json"];

export const useExchangePublicToken = () => {

 const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.plaid["exchange-public-token"].$post({
        json,
      });

      if (!response.ok) {
        throw new Error("Failed to cexchange public token");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Public Token exchanged successfully");
      //TODO: Reinvalidate the following 
      //Connect bank 
      //Summary 
      //Accounts
      //Transactions
      
    },
    onError: () => {
      toast.error("Failed to cexchange public token");
    },
  });

  return mutation;
};
