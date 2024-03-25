import { useSession } from "@/lib/auth/use-session";
import SignOut from "./signout";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";

export default async function AccountWidget() {
  const session = await useSession();
  if (!session) return;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          className="text-foreground w-full items-start px-2 hover:no-underline"
          variant="link"
        >
          <div className="flex flex-col items-start group">
            <p>Account Information</p>
            {/* <p className="group-hover:underline">{session?.user?.name}</p> */}
            <p className="text-xs text-muted-foreground">
              {session.user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top">
        <DropdownMenuLabel className="text-xs">
          {session.user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <SignOut>
          <DropdownMenuItem className="cursor-pointer">
            Log out
          </DropdownMenuItem>
        </SignOut>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
