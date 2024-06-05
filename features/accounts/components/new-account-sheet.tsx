import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.infer<typeof formSchema>

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
const mutation = useCreateAccount();

const onSubmit = (values: FormValues) => {
  mutation.mutate(values, {
    onSuccess: () => {
      onClose();
    },
  });
};

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={mutation.isPending} defaultValues={{name: ''}} />
      </SheetContent>
    </Sheet>
  );
};
