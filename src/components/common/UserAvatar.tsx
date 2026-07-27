import { UserIcon } from "./Icons"

function UserAvatar() {
    return (
        <div className="px-2 py-2 rounded-full cursor-pointer bg-primary-200 border border-border">
            <UserIcon />
        </div>
    )
}

export default UserAvatar