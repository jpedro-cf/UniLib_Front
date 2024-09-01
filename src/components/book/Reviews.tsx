import { StarIcon } from "@radix-ui/react-icons";

export const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "João Silva",
      rating: 4,
      comment: "Ótimo livro! Muito informativo e bem escrito.",
      date: "20/08/2024",
    },
    {
      id: 2,
      name: "Maria Souza",
      rating: 5,
      comment: "Adorei! Recomendo para todos.",
      date: "18/08/2024",
    },
    {
      id: 3,
      name: "Carlos Pereira",
      rating: 3,
      comment: "Bom, mas poderia ter mais exemplos práticos.",
      date: "15/08/2024",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Avaliações dos Usuários</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-800 font-medium">{review.name}</div>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
            <div className="text-gray-500 text-sm mb-2">{review.date}</div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
