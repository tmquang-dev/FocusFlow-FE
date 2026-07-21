import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type AlertType = "success" | "warning" | "error" | "default" | "destructive";

interface IAlertMessage {
    title?: string;
    description?: string;
    type: AlertType;
}

function AlertMessage({ title, description, type }: IAlertMessage) {
    return (
        <Alert variant={type}>
            {title && <AlertTitle>{title}</AlertTitle>}
            {description &&
                <AlertDescription>
                    {description}
                </AlertDescription>}
        </Alert>
    );
}

export default AlertMessage;