import Button from "@/components/common/Button";

interface TaskDetailFooterProps {
    onCancel: () => void;
}

function TaskDetailFooter({ onCancel }: TaskDetailFooterProps) {
    return (
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button
                className="px-5 py-2 text-sm font-medium border border-border rounded-lg hover:bg-gray-100"
                onClick={onCancel}
                type="button"
                variant="text"
            >
                Cancel
            </Button>
            <Button
                className="px-5 py-2 text-sm font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-sm"
                type="submit"
            >
                Save Changes
            </Button>
        </div>
    );
}

export default TaskDetailFooter;
