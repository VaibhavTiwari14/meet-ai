"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text : "Vaibhav"}));
  return (
    <div>
      
    </div>
  );
};

export default HomePage;
