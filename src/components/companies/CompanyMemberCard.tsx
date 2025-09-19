import { Avatar, AvatarFallback } from '../ui/avatar'
import { ICompanyMember } from '@/interfaces/Company'
import { Badge } from '../ui/badge'
import { useRemoveCompanyMember } from '@/services/companies'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { useAuth } from '@/context/auth-context'

interface Props {
    member: ICompanyMember
}

export const CompanyMemberCard = ({ member }: Props) => {
    const { mutate, isPending } = useRemoveCompanyMember()
    const { user } = useAuth()

    function handleClick() {
        mutate({
            company_id: member.companyId,
            member_id: member.id
        })
    }
    return (
        <div className="p-5 rounded-md bg-[#fff] border flex items-start justify-between gap-5">
            <Avatar className="hover:cursor-pointer">
                <AvatarFallback>{member.name!.split('')[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="max-w-full overflow-hidden">
                <div className="text-md font-semibold break-words">{member.name}</div>
                <span className="text-sm"> {member.email}</span>
            </div>
            <div className="flex gap-2 items-center">
                <Badge className="p-1">{member.role}</Badge>
                {user?.id != member.id && (
                    <Button
                        type="button"
                        variant={'destructive'}
                        size={'sm'}
                        onClick={handleClick}
                        disabled={isPending}
                    >
                        <Trash size={16} />
                    </Button>
                )}
            </div>
        </div>
    )
}
