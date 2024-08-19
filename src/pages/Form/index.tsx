import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"

export default function Form(){
    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Cadastro de Livros</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                Título
              </label>
              <Input id="title" type="text" placeholder="Título do Livro" required />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700 font-semibold mb-2">
                Autor
              </label>
              <Input id="author" type="text" placeholder="Nome do Autor" required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Descrição
              </label>
              <Textarea id="description" placeholder="Descrição do Livro" rows={4} />
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                Categoria
              </label>
              <Input id="category" type="text" placeholder="Categoria do Livro" />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    )
}