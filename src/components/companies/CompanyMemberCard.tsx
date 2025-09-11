import { Avatar, AvatarFallback } from '../ui/avatar'
import { ICompanyMember } from '@/interfaces/Company'
import { Badge } from '../ui/badge'
import { useRemoveCompanyMember } from '@/services/companies'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'

interface Props {
    member: ICompanyMember
}

export const CompanyMemberCard = ({ member }: Props) => {
    const { mutate, isPending } = useRemoveCompanyMember()
    return (
        <div className="p-5 rounded-md bg-[#fff] border flex items-start justify-between gap-5">
            <Avatar className="hover:cursor-pointer">
                <AvatarFallback>{member.user.name!.split('')[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <div className="text-md font-semibold">{member.user.name}</div>
                <span className="text-sm"> {member.user.email}</span>
            </div>
            <div className="flex gap-2 items-center">
                <Badge className="p-1">{member.role}</Badge>
                <Button
                    type="button"
                    variant={'destructive'}
                    size={'sm'}
                    onClick={() => mutate(member.id)}
                    disabled={isPending}
                >
                    <Trash size={16} />
                </Button>
            </div>
        </div>
    )
}
