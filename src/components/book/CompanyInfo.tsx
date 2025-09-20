import { env } from '@/config/env'
import { ICompany } from '@/interfaces'

interface Props {
    company: ICompany
}
export function CompanyInfo({ company }: Props) {
    return (
        <div className="flex items-center bg-white space-x-4 mt-4">
            <img
                src={`${env.storage_url}/${company.image}`}
                alt="logo da empresa"
                className="w-[70px] h-[70px] object-cover rounded-full border border-gray-300"
            />
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{company.name}</h2>
                {/* <span className="text-gray-500">emaildaempresa@dominio.com</span> */}
            </div>
            {/* <div className="text-right hidden md:inline-block">
                <span className="block text-gray-600">
                    Livros disponíveis: <strong className="text-gray-800">99</strong>
                </span>
                <span className="block text-gray-600">
                    Livros gratuitos: <strong className="text-gray-800">99</strong>
                </span>
            </div> */}
        </div>
    )
}
