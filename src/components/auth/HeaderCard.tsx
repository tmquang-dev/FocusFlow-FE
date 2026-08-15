import { LogoIcon } from "../common/Icons";
import { useSearchParams } from "react-router";

function HeaderCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  return (
    <div className="flex flex-col items-center gap-2.5 w-full">
      <div className="flex px-4 py-3">
        <LogoIcon className="text-primary-600" />
      </div>
      <h1 id="login-title" className="text-text-main font-text-logo">
        {title}
      </h1>
      <p className="text-text-secondary font-text-medium-20 text-center w-full">
        {description}
        {email && <span className="text-primary-600"> {email}</span>}
      </p>
    </div>
  );
}

export default HeaderCard;
