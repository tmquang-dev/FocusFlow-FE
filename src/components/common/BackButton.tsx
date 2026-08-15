import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "./Icons";
import Button from "./Button";

function BackButton({ onClick }: { onClick?: () => void }) {
  const navigate = useNavigate();
  return (
    <Button
      variant="text"
      className="w-fit"
      onClick={onClick ?? (() => navigate(-1))}
    >
      <ChevronLeftIcon className="w-5 h-5" />
      Back
    </Button>
  );
}

export default BackButton;
