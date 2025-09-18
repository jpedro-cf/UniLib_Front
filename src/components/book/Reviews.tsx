import { IBookReview } from '@/interfaces/Book'
import { format } from 'date-fns'
import { Ratings } from '../ui/rating'

interface Props {
    reviews: IBookReview[]
}

export const Reviews = ({ reviews }: Props) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Avaliações dos Usuários</h2>
            <div className="space-y-4 divide-y divide-slate-200">
                {reviews.map((review: IBookReview) => (
                    <div key={review.id} className="py-3">
                        <div className="flex justify-between items-center">
                            <div className="text-gray-800 font-medium">{review.user.name}</div>
                            <Ratings rating={review.rating} variant="yellow" />
                        </div>
                        <div className="text-gray-500 text-sm mb-2">
                            {format(new Date(review.createdAt), 'dd MMMM yyy')}
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
