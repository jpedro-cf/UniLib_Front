import { IUser } from '@/interfaces/User'
import { Avatar, AvatarFallback } from '../ui/avatar'

interface Props {
    user: IUser
}

export const UserCard = ({ user }: Props) => {
    return (
        <div className="p-5 rounded-md bg-[#fff] border flex gap-5">
            <Avatar className="hover:cursor-pointer">
                <AvatarFallback>{user.name.split('')[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <div className="text-lg font-semibold">{user.name}</div>
                {user.email}
            </div>
        </div>
    )
}
