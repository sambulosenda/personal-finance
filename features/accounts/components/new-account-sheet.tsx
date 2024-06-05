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

const formSchema = insertAccountSchema.pick({
  name: true,
})

type FormValues = z.infer<typeof formSchema>

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

const onSubmit = (values: FormValues) => {
  console.log({values})
}
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} disabled={false} defaultValues={{name: ''}} />
      </SheetContent>
    </Sheet>
  );
};
