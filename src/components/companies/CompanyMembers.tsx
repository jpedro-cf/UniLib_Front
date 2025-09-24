import { ICompanyMember } from '@/interfaces/Company'
import { useCompanyMembers } from '@/services/companies'
import { CompanyMemberCard } from './CompanyMemberCard'
import { CompanyMemberDialog } from '../dialogs/CompanyMemberDialog'
import { Button } from '../ui/button'

interface Props {
    company_id: string
}
export function CompanyMembers({ company_id }: Props) {
    const members = useCompanyMembers(company_id)
    return (
        <>
            {!members.isLoading && !members.isError && (
                <div className="mt-8">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold mb-3">Equipe</h2>
                        <CompanyMemberDialog company_id={company_id}>
                            <Button type="button" variant={'blue'} size={'sm'}>
                                Adicionar Membro
                            </Button>
                        </CompanyMemberDialog>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {members.data?.map((member: ICompanyMember) => (
                            <CompanyMemberCard member={member} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
