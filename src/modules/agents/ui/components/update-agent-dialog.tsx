import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsGetOne } from "../../types";
import { AgentForm } from "./agent-form";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentsGetOne;
}

const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details."
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateAgentDialog;
