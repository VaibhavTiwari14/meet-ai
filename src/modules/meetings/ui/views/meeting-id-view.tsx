"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import MeetingIdViewHeader from "../components/meetings-id-view-header";
import UpdateMeetingDialog from "../components/update-meeting-dialog";
import { useState } from "react";

interface Props {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const router = useRouter();

  const queryClient = useQueryClient();

  const [RemoveConfirmation, ConfirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meeting."
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await ConfirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

  const [updateMeetingDialogOpen, setupdateMeetingDialogOpen] = useState(false);

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setupdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setupdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
      </div>
    </>
  );
};

export const MeetingIdViewLoader = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting."
      description="Please try again later"
    />
  );
};

export default MeetingIdView;
