export interface InlineWorkspaceRenameInputProps {
  workspaceId: string;
  initialName: string;
  onCancel: () => void;
  onSuccess?: () => void;
}
