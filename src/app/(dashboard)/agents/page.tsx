import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoader,
} from "@/modules/agents/ui/views/agent-view";
import ListHeader from "@/modules/agents/ui/components/list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/params";

interface Props {
  searchParams : Promise<SearchParams>
}

const page = async ({searchParams} : Props) => {

  const filters = await loadSearchParams(searchParams);

  const session = auth.api.getSession({
    headers : await headers()
  });

  if(!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({...filters}));
  return (
    <>
    <ListHeader/>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewLoader />}>
          <ErrorBoundary fallback={<AgentsViewError />}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
