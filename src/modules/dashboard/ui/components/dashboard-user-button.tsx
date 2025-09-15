import { GenerateAvatar } from "@/components/generated-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile()

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return (
      <div className="relative rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 overflow-hidden gap-2">
        {/* Avatar shimmer */}
        <div className="relative size-9 rounded-full bg-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" 
               style={{
                 animation: 'shimmer 2s linear infinite',
                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
               }} />
        </div>
        
        {/* Content shimmer */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="relative h-3.5 bg-white/10 rounded-md overflow-hidden w-24">
            <div className="absolute inset-0" 
                 style={{
                   animation: 'shimmer 2s linear infinite',
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                 }} />
          </div>
          <div className="relative h-3 bg-white/10 rounded-md overflow-hidden w-32">
            <div className="absolute inset-0"
                 style={{
                   animation: 'shimmer 2s linear infinite 0.5s',
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                 }} />
          </div>
        </div>
        
        {/* Chevron shimmer */}
        <div className="relative size-4 bg-white/10 rounded overflow-hidden shrink-0">
          <div className="absolute inset-0"
               style={{
                 animation: 'shimmer 2s linear infinite 1s',
                 background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
               }} />
        </div>
        
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    );
  }

  if(isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="relative rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden group gap-2">
          {data.user.image ? (
            <Avatar>
              <AvatarImage
                src={data.user.image}
                className="size-9 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
              />
            </Avatar>
          ) : (
            <GenerateAvatar
              seed={data.user.name}
              varient="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="outline" onClick={onLogout}>
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOutIcon className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden group gap-2">
        {data.user.image ? (
          <Avatar>
            <AvatarImage
              src={data.user.image}
              className="size-9 rounded-full object-cover ring-2 ring-white/20 shadow-lg"
            />
          </Avatar>
        ) : (
          <GenerateAvatar
            seed={data.user.name}
            varient="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm truncate font-normal text-muted-foreground">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">
          Billing <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Logout <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;