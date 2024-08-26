import { useParams } from "react-router-dom";
import { IBook } from "@/interfaces/Book";
import { useBook } from "@/services/books";
import { ICategory } from "@/interfaces/Category";
import { SkeletonBook } from "@/components/skeleton/SkeletonBook";

export const BookPage = () => {
    const { id } = useParams<{ id: IBook["id"] }>();
    if (id) {
        const book = useBook(id);
        return (
            <>
                {(book.isLoading) && (
                    <SkeletonBook />
                )}
                {(book.isError) && (
                    <h1>Livro não encontrado!</h1>)}
                {book.isSuccess && (
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-center">
                            <img src={book.data.image} alt={book.data.title} className="w-48 h-64 object-cover rounded-lg" />
                        </div>
                        <h1 className="text-3xl font-semibold mt-4">{book.data.title}</h1>
                        <p className="text-sm mt-2">
                            {book.data.available ? (
                                <span className="text-green-600">Disponível</span>
                            ) : (
                                <span className="text-red-600">Indisponível</span>
                            )}
                        </p>
                        <div className="flex items-center mt-2">
                            <p className="text-yellow-500 font-semibold">{book.data.rating} / 5</p>
                            <div className="ml-2 flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <svg
                                        key={i}
                                        className={`w-5 h-5 ${i < book.data.rating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.386 4.26a1 1 0 00.95.69h4.488c.97 0 1.371 1.24.588 1.81l-3.63 2.57a1 1 0 00-.363 1.118l1.386 4.26c.3.921-.755 1.688-1.539 1.118l-3.63-2.57a1 1 0 00-1.175 0l-3.63 2.57c-.783.57-1.838-.197-1.539-1.118l1.386-4.26a1 1 0 00-.363-1.118l-3.63-2.57c-.783-.57-.382-1.81.588-1.81h4.488a1 1 0 00.95-.69l1.386-4.26z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <p className="mt-4 text-gray-700">{book.data.description}</p>
                        <div className="flex flex-wrap mt-4">
                            {book.data.categories.map((category: ICategory, index: number) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                >
                                    {category.title}
                                </span>
                            ))}
                        </div>
                        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
                            Obter Livro
                        </button>
                    </div >
                )}
            </>
        );
    } else {
        <h1>Livro não encontrado</h1>
    }
}