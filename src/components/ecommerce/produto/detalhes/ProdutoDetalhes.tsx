'use client';
import React, { use, useState } from "react";

import { useCart } from "@/app/context/CartContext";
import PlantDetails from "@/components/UI/PlantDetails";
import SimpleButton from "@/components/UI/SimpleButton";
import { formatToBrazilianCurrency } from "@/helpers";
import { Estoque } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import paths from "@/paths";

interface ShowProductPageProps {
    product: Estoque
}

const ProdutoDetalhes: React.FC<ShowProductPageProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const { incrementItem } = useCart();
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

    const handleAddToCart = (product: any) => {
        console.log(quantity)
        incrementItem({
            id: product.id,
            produto: product.produto,
            preco: product.preco,
            imagemLink: product.imagemLink,
            empresaId: product.empresaId,
            vendorName: product.vendorName,
            unidadeMedida: product.unidadeMedida,
        }, quantity);
    };

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
    const router = useRouter();

    const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    return (
        <div className={'w-full flex flex-col items-center justify-center dark:bg-slate-900'}>
            <div className={'w-8/12 flex justify-center gap-16 items-center'}>
                <div className={'h-auto'}>
                    <Image
                        src={product.imagemLink!}
                        alt={product.descricao}
                        height={300}
                        width={500}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-4 w-4/12">
                    <p className="text-4xl dark:text-white">Sementes {product.produto}</p>
                    <p className="dark:text-slate-300"> ⭐⭐⭐⭐⭐ (3)</p>
                    <p className="text-2xl font-semibold dark:text-white">{formatToBrazilianCurrency(product.preco)}</p>
                    <p className="font-bold dark:text-white">
                        Sementes por pacote: <span className="font-normal dark:text-slate-300">{product.quantidade}</span>
                    </p>
                    <div className="flex items-center gap-2 py-2">
                        <p className="text-sm text-gray-600 dark:text-slate-400">Vendido Por:</p>
                        <p className="font-semibold text-gray-800 dark:text-slate-200">{product.empresaId || 'Garden Seeds Co.'}</p>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <p className="text-sm font-light text-gray-600 dark:text-slate-400">Quantidade</p>
                        <div className="border border-gray-400 dark:border-slate-600 w-36 flex items-center justify-between rounded-lg overflow-hidden dark:bg-slate-800">
                            <button
                                className={'px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white transition-colors'}
                                onClick={() => onChangeQuantity(quantity - 1)}
                            >
                                -
                            </button>
                            <span className={'px-4 py-2 dark:text-white'}>{quantity}</span>
                            <button
                                className={'px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white transition-colors'}
                                onClick={() => onChangeQuantity(quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <SimpleButton
                        onClick={handleAddToCart.bind(null, product)}
                        text={'Adicionar ao carrinho'}
                        bgColor="bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-800"
                    />
                    <SimpleButton
                        onClick={() => { router.push(paths.createVenda()) }}
                        text={'Fazer Checkout'}
                        bgColor="bg-orange-700 dark:bg-orange-600 hover:bg-orange-800 dark:hover:bg-orange-700"
                    />
                </div>
            </div>

            <div className="my-12 w-full flex gap-8 justify-center">
                <PlantDetails description="2 Feet" label="Largura Madura" imageSrc="/images/width-ruler.svg" />
                <PlantDetails description="Full Sun and Part Shade" label="Sol / Sombra" imageSrc="/images/full-sun.svg" />
                <PlantDetails description="75" label="Dias para amadurecer" imageSrc="/images/maturity.svg" />
                <PlantDetails description="Moist, well-drained" label="Umidade" imageSrc="/images/moisture.svg" />
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">Descrição</h2>
                <div className="space-y-4 text-gray-700 dark:text-slate-300 leading-relaxed">
                    <p>{product.descricao}</p>
                </div>
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">Detalhes do Produto</h2>
                <div className="grid grid-cols-2 gap-y-4 text-gray-700 dark:text-slate-300">
                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Gênero:</span>
                        <span>{product.genero}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Requisitos de úmidade:</span>
                        <span>{product.requisitosDeUmidade}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Espécie:</span>
                        <span>{product.especie}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Requisitos de Luz:</span>
                        <span>{product.requisitosDeLuz}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Cor da Folhagem:</span>
                        <span>{product.corDaFolhagem}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48 dark:text-white">Tipo de Solo:</span>
                        <span>{product.tipoDeSolo}</span>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="w-8/12 my-12 mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold dark:text-white">Reviews do produto</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold dark:text-white">{averageRating.toFixed(1)}</span>
                        <div>
                            <StarRating rating={Math.round(averageRating)} />
                            <p className="text-sm text-gray-600 dark:text-slate-400">{reviews.length} reviews</p>
                        </div>
                    </div>
                </div>

                {/* Write a Review */}
                <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg mb-8 border dark:border-slate-700">
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Escreva uma Review</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Sua Nota</label>
                        <StarRating rating={rating} interactive={true} onRate={setRating} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Seu Comentário</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-full border border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-600"
                            rows={4}
                            placeholder="Compartilhe a sua experiência com esse produto..."
                        />
                    </div>
                    <button
                        onClick={handleSubmitReview}
                        className="bg-green-800 dark:bg-green-700 text-white px-6 py-2 rounded hover:bg-green-900 dark:hover:bg-green-800 transition-colors"
                    >
                        Submit Review
                    </button>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                    {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-slate-700 pb-6">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-semibold text-lg dark:text-white">{review.name}</p>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-sm text-gray-500 dark:text-slate-400">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-700 dark:text-slate-300 mt-3">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ProdutoDetalhes;