"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  if (!session) {
    return;
  }

  return (
    <div>
      <p>Logged in as {session.user.name}</p>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomePage;
