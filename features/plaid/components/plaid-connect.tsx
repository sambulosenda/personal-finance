"use client";
import { useMount } from "react-use";


import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateLinkToken } from "../api/use-create-link-token";

export const PlaidConnect = () => {

  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = useCreateLinkToken()

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({data}) => {
      setToken(data)
      }
    })
    
})
  return (
    <Button size="sm" disabled={!token} variant="ghost">
      Connect
    </Button>
  );
};
