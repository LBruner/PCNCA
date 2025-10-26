'use client';
import React, { useState } from "react";

import Image from "next/image";
import { Estoque } from "@prisma/client";
import { formatToBrazilianCurrency } from "@/helpers";
import SimpleButton from "@/components/UI/SimpleButton";
import PlantDetails from "@/components/UI/PlantDetails";

interface ShowProductPageProps {
    product: Estoque
}

const ProdutoDetalhes: React.FC<ShowProductPageProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(0);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: 'Sarah Johnson',
            rating: 5,
            comment: 'These seeds germinated quickly and the flowers are absolutely stunning! The colors are so vibrant.',
            date: '2024-10-15'
        },
        {
            id: 2,
            name: 'Michael Chen',
            rating: 4,
            comment: 'Great variety of colors. About 80% germination rate for me. Very happy with the results!',
            date: '2024-10-10'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            rating: 5,
            comment: 'Perfect for my pollinator garden. The bees and butterflies love these flowers!',
            date: '2024-10-05'
        }
    ]);

    const onChangeQuantity = (newQuantity: number) => {
        console.log('newQuantity:', newQuantity);
        if (newQuantity < 0) {
            return;
        }
        setQuantity(newQuantity);
    }

    const handleSubmitReview = () => {
        if (rating === 0 || comment.trim() === '') {
            alert('Please provide a rating and comment');
            return;
        }

        const newReview = {
            id: reviews.length + 1,
            name: 'You',
            rating: rating,
            comment: comment,
            date: new Date().toISOString().split('T')[0]
        };

        setReviews([newReview, ...reviews]);
        setRating(0);
        setComment('');
    };

    const StarRating = ({ rating, interactive = false, onRate }: { rating: number, interactive?: boolean, onRate?: (rating: number) => void }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-2xl ${interactive ? 'cursor-pointer' : ''} ${star <= (interactive ? (hoverRating || rating) : rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => interactive && onRate && onRate(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className={'w-full flex flex-col items-center justify-center'}>
            <div className={'w-8/12 flex justify-center gap-16 items-center'}>
                <div className={'h-auto'}>
                    <Image src={product.imagemLink!} alt={product.descricao} height={300} width={500} />
                </div>
                <div className="flex flex-col gap-4 w-4/12">
                    <p className="text-4xl">{product.produto} Seeds</p>
                    <p> ⭐⭐⭐⭐⭐ (3)</p>
                    <p>{formatToBrazilianCurrency(product.preco)}</p>
                    <p className="font-bold">Seeds Per Pack: <span className="font-normal">{product.quantidade}</span></p>
                    <div className="flex items-center gap-2 py-2">
                        <p className="text-sm text-gray-600">Sold by:</p>
                        <p className="font-semibold text-gray-800">{product.vendor || 'Garden Seeds Co.'}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className="text-sm font-light text-gray-600">Quantity</p>
                        <div className="border border-gray-400 w-36 flex items-center justify-between">
                            <button className={'px-4 py-2'} onClick={() => onChangeQuantity(quantity - 1)}>-</button>
                            <span className={'px-4 py-2'}>{quantity}</span>
                            <button className={'px-4 py-2'} onClick={() => onChangeQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>
                    <SimpleButton text={'Add to Cart'} bgColor="bg-green-800" />
                    <SimpleButton text={'Checkout'} bgColor="bg-orange-700" />
                </div>
            </div>
            <div className="my-12 w-full flex gap-8 justify-center">
                <PlantDetails description="2 Feet" label="Mature Width" imageSrc="/images/width-ruler.svg" />
                <PlantDetails description="Full Sun and Part Shade" label="Sun / Shade" imageSrc="/images/full-sun.svg" />
                <PlantDetails description="75" label="Days to Maturity" imageSrc="/images/maturity.svg" />
                <PlantDetails description="Moist, well-drained" label="Moisture" imageSrc="/images/moisture.svg" />
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6">Descrição</h2>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{product.descricao}</p>
                </div>
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6">Detalhes do Produto</h2>
                <div className="grid grid-cols-2 gap-y-4 text-gray-700">
                    <div className="flex">
                        <span className="font-semibold w-48">Gênero:</span>
                        <span>{product.genero}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Requisitos de úmidade:</span>
                        <span>{product.requisitosDeUmidade}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48">Espécie:</span>
                        <span>{product.especie}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Requisitos de Luz:</span>
                        <span>{product.requisitosDeLuz}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48">Cor da Folhagem:</span>
                        <span>{product.corDaFolhagem}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Tipo de Solo:</span>
                        <span>{product.tipoDeSolo}</span>
                    </div>

                </div>
            </div>

            {/* Reviews Section */}
            <div className="w-8/12 my-12 mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold">Customer Reviews</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold">{averageRating.toFixed(1)}</span>
                        <div>
                            <StarRating rating={Math.round(averageRating)} />
                            <p className="text-sm text-gray-600">{reviews.length} reviews</p>
                        </div>
                    </div>
                </div>

                {/* Write a Review */}
                <div className="bg-gray-50 p-2 rounded-lg mb-8">
                    <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                        <StarRating rating={rating} interactive={true} onRate={setRating} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            placeholder="Share your experience with this product..."
                        />
                    </div>
                    <button
                        onClick={handleSubmitReview}
                        className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-900 transition-colors"
                    >
                        Submit Review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-semibold text-lg">{review.name}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700 mt-3">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ProdutoDetalhes;