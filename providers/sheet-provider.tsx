"use client";

import { useEffect, useState } from "react";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";
import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditCategorySheet } from "@/features/categories/components/edit-account-sheet";
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet";
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet";
export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
      <NewCategorySheet />
      <EditCategorySheet />
      <NewTransactionSheet />
    </>
  );
};
