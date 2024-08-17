"use client";
import { useMount } from "react-use";
import { usePlaidLink } from "react-plaid-link";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateLinkToken } from "@/features/plaid/api/use-create-link-token";
import { useExchangePublicToken } from "@/features/plaid/api/use-exchange-public-token";

export const PlaidConnect = () => {
  const [token, setToken] = useState<string | null>(null);

  const createLinkToken = useCreateLinkToken();
  const exhcangePublicToken = useExchangePublicToken();

  useMount(() => {
    createLinkToken.mutate(undefined, {
      onSuccess: ({ data }) => {
        setToken(data);
      },
    });
  });

  const plaid = usePlaidLink({
    token: token,
    onSuccess: (publicToken) => {
      exhcangePublicToken.mutate({
        publicToken,
      });
    },
    env: process.env.NEXT_PUBLIC_PLAID_ENV || "sandbox",
  });

  const onClick = () => {
    plaid.open();
  };

  const isDisabled = !plaid.ready || exhcangePublicToken.isPending;

  return (
    <Button onClick={onClick} size="sm" disabled={isDisabled} variant="ghost">
      Connect
    </Button>
  );
};
