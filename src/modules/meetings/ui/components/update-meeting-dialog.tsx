import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingsGetOne } from "../../types";
import { MeetingForm } from "./meetings-form";
interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
}

const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details."
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
