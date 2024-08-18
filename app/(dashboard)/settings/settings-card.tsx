"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetConnectedBank } from "@/features/plaid/api/use-get-connected-bank";
import { PlaidConnect } from "@/features/plaid/components/plaid-connect";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export const SettingCard = () => {
  const { data: connectedBank, isLoading: isLoadingConnectedBank } =
    useGetConnectedBank();

  if (isLoadingConnectedBank) {
    return (
      <Card className="border-none drop-shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl line-clamp-1">
            <Skeleton className="h-6 w-24" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full flex items-center justify-center">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl line-clamp-1 "> Settings </CardTitle>
      </CardHeader>
      <CardContent>
        <Separator />
        <div className="flex flex-col gap-y-2 lg:flex-row items-center py-4">
          <p className="text-sm font-medium w-full lg:w-[16.5rem]">
            Bank Account
          </p>
          <div className="w-full flex items-center justify-between">
            <div
              className={cn(
                "text-sm truncate flex items-center ",
                !connectedBank && "text-muted-foreground"
              )}
            >
              {connectedBank
                ? "Back account connected"
                : "No bank account connected"}
            </div>

            <PlaidConnect />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
