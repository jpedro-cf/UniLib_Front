export function SkeletonBook() {
  return (
    <div className="flex mx-auto bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Imagem do Livro */}
      <div className="flex justify-center items-center w-[50%]">
        <div className="w-48 h-64 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="w-[50%]">
        {/* Título */}
        <div className="mt-4 h-8 bg-gray-300 rounded"></div>

        {/* Disponibilidade */}
        <div className="mt-2 h-4 bg-gray-300 rounded w-1/4"></div>

        {/* Rating */}
        <div className="mt-2 h-5 bg-gray-300 rounded w-1/6"></div>

        {/* Descrição */}
        <div className="mt-4 h-4 bg-gray-300 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="mt-2 h-4 bg-gray-300 rounded w-4/6"></div>

        {/* Categorias */}
        <div className="flex flex-wrap mt-4 space-x-2">
          <div className="h-6 bg-gray-300 rounded w-20"></div>
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-6 bg-gray-300 rounded w-24"></div>
        </div>

        {/* Botão Obter Livro */}
        <div className="mt-6 h-10 bg-gray-300 rounded-lg"></div>
      </div>

      </div>
  )
}