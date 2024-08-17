import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.plaid["create-link-token"]["$post"], 200>;

export const useCreateLinkToken = () => {

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.plaid["create-link-token"].$post();


      if(!response.ok) {
        throw new Error("Failed to create Link Token");
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Link Token created");
    },
    onError: () => {
      toast.error("Failed to create Link Token");
    },
  });

  return mutation;
};
