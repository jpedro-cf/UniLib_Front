export const CompanyInfo = () => {
    return (
        <div className="flex items-center bg-white space-x-4 mt-4">
            <img
                src="/public/images/logos/logo5.svg"
                alt="logo da empresa"
                className="w-20 h-20 object-cover rounded-full border border-gray-300"
            />
            <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">Nome da empresa</h2>
                <span className="text-gray-500">emaildaempresa@dominio.com</span>
            </div>
            <div className="text-right">
                <span className="block text-gray-600">Livros disponíveis: <strong className="text-gray-800">99</strong></span>
                <span className="block text-gray-600">Livros gratuitos: <strong className="text-gray-800">99</strong></span>
            </div>
        </div>

    )
}