'use client';

import React, { useEffect, useMemo, useState } from "react";

import { useCart } from "@/app/context/CartContext";
import type { EstoqueComEmpresa } from "@/actions/estoques";
import type { ReviewWithUser } from "@/actions/reviews";
import PlantDetails from "@/components/UI/PlantDetails";
import SimpleButton from "@/components/UI/SimpleButton";
import { formatToBrazilianCurrency } from "@/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import paths from "@/paths";

type ReviewClient = Omit<ReviewWithUser, "createdAt"> & {
    createdAt: string;
};

interface ProdutoDetalhesProps {
    product: EstoqueComEmpresa;
    initialReviews: ReviewClient[];
}

const ProdutoDetalhes: React.FC<ProdutoDetalhesProps> = ({ product, initialReviews }) => {
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState<ReviewClient[]>(initialReviews);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { incrementItem } = useCart();
    const router = useRouter();
    const { data: session, status } = useSession();
    const currentUserId = session?.user?.id ?? null;

    const existingReview = useMemo(() => {
        if (!currentUserId) return undefined;
        return reviews.find((review) => review.usuarioId === currentUserId);
    }, [currentUserId, reviews]);

    useEffect(() => {
        if (!currentUserId) {
            setRating(0);
            setComment("");
            return;
        }

        if (existingReview) {
            setRating(existingReview.rating);
            setComment(existingReview.comment);
        } else {
            setRating(0);
            setComment("");
        }
    }, [currentUserId, existingReview?.id, existingReview?.rating, existingReview?.comment, existingReview]);

    const onChangeQuantity = (newQuantity: number) => {
        if (newQuantity <= 0) return;
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        incrementItem(
            {
                id: product.id,
                produto: product.produto,
                preco: product.preco,
                imagemLink: product.imagemLink!,
                empresaId: product.empresaId,
                vendorName: product.empresa?.nome ?? undefined,
                unidadeMedida: product.unidadeMedida,
            },
            quantity,
        );
    };

    const normalizeReview = (data: any): ReviewClient => ({
        id: data.id,
        estoqueId: data.estoqueId,
        usuarioId: data.usuarioId,
        rating: data.rating,
        comment: data.comment,
        reviewerName: data.reviewerName,
        createdAt: typeof data.createdAt === "string" ? data.createdAt : new Date(data.createdAt).toISOString(),
        usuario: data.usuario,
    });

    const handleSubmitReview = async () => {
        if (!currentUserId) {
            setErrorMessage("É necessário estar autenticado para avaliar este produto.");
            router.push(`/auth/login?callbackUrl=${encodeURIComponent(`/ecommerce/produto/${product.id}`)}`);
            return;
        }

        if (rating === 0 || comment.trim().length === 0) {
            setErrorMessage("Informe uma nota e um comentário antes de enviar.");
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const endpoint = existingReview
                ? `/api/ecommerce/reviews/${existingReview.id}`
                : `/api/ecommerce/produtos/${product.id}/reviews`;

            const response = await fetch(endpoint, {
                method: existingReview ? "PATCH" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ rating, comment }),
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => ({}));
                throw new Error(typeof payload?.message === "string" ? payload.message : "Não foi possível salvar a review.");
            }

            const saved = normalizeReview(await response.json());

            setReviews((prev) => {
                if (existingReview) {
                    return prev.map((review) => (review.id === saved.id ? saved : review));
                }
                return [saved, ...prev];
            });
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : "Erro ao enviar review.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteReview = async () => {
        if (!existingReview) return;

        setIsDeleting(true);
        setErrorMessage(null);

        try {
            const response = await fetch(`/api/ecommerce/reviews/${existingReview.id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const payload = await response.json().catch(() => ({}));
                throw new Error(typeof payload?.message === "string" ? payload.message : "Não foi possível remover a review.");
            }

            setReviews((prev) => prev.filter((review) => review.id !== existingReview.id));
            setRating(0);
            setComment("");
        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : "Erro ao remover review.");
        } finally {
            setIsDeleting(false);
        }
    };

    const averageRating = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const StarRating = ({
        rating: value,
        interactive = false,
        onRate,
    }: {
        rating: number;
        interactive?: boolean;
        onRate?: (rating: number) => void;
    }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-2xl ${interactive ? "cursor-pointer" : ""} ${star <= (interactive ? hoverRating || value : value) ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => interactive && onRate?.(star)}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                >
                    ★
                </span>
            ))}
        </div>
    );

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "medium",
        }).format(date);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center dark:bg-customDarkBg">
            <div className="w-8/12 flex justify-center gap-16 items-center">
                <div className="h-auto">
                    {product.imagemLink ? (
                        <Image src={product.imagemLink} alt={product.descricao} height={300} width={500} className="rounded-xl object-cover" />
                    ) : (
                        <div className="flex h-[300px] w-[500px] items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            Sem imagem
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-4 w-4/12">
                    <p className="text-4xl dark:text-white">Sementes {product.produto}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{"★".repeat(Math.round(averageRating)).padEnd(5, "☆")}</span>
                        <span>({reviews.length})</span>
                    </div>
                    <p className="dark:text-white">{formatToBrazilianCurrency(product.preco)}</p>
                    <p className="font-bold dark:text-white">
                        Sementes por pacote: <span className="font-normal">{product.quantidade}</span>
                    </p>
                    <div className="flex items-center gap-2 py-2">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Vendido Por:</p>
                        <p className="font-semibold text-gray-800 dark:text-gray-200">{product.empresa?.nome ?? "Garden Seeds Co."}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-light text-gray-600 dark:text-gray-400">Quantidade</p>
                        <div className="border border-gray-400 dark:border-gray-600 w-36 flex items-center justify-between rounded-lg dark:bg-gray-800">
                            <button className="px-4 py-2 dark:text-white disabled:opacity-50" onClick={() => onChangeQuantity(quantity - 1)} disabled={quantity <= 0}>
                                -
                            </button>
                            <span className="px-4 py-2 dark:text-white">{quantity}</span>
                            <button className="px-4 py-2 dark:text-white" onClick={() => onChangeQuantity(quantity + 1)}>
                                +
                            </button>
                        </div>
                    </div>
                    <SimpleButton onClick={handleAddToCart} text="Adicionar ao carrinho" bgColor="bg-green-800" />
                    <SimpleButton disabled={quantity <= 0} onClick={() => router.push(paths.createVenda())} text="Fazer Checkout" bgColor="bg-orange-700" />
                </div>
            </div>

            <div className="my-10 w-full flex gap-8 justify-center">
                <PlantDetails description="2 Feet" label="Largura Madura" imageSrc="/images/width-ruler.svg" />
                <PlantDetails description="Full Sun and Part Shade" label="Sol / Sombra" imageSrc="/images/full-sun.svg" />
                <PlantDetails description="75" label="Dias para amadurecer" imageSrc="/images/maturity.svg" />
                <PlantDetails description="Moist, well-drained" label="Umidade" imageSrc="/images/moisture.svg" />
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">Descrição</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <p>{product.descricao}</p>
                </div>
            </div>

            <div className="w-8/12 my-12">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">Detalhes do Produto</h2>
                <div className="grid grid-cols-2 gap-y-4 text-gray-700 dark:text-gray-300">
                    <div className="flex">
                        <span className="font-semibold w-48">Gênero:</span>
                        <span>{product.genero ?? "-"}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Requisitos de umidade:</span>
                        <span>{product.requisitosDeUmidade ?? "-"}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48">Espécie:</span>
                        <span>{product.especie ?? "-"}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Requisitos de Luz:</span>
                        <span>{product.requisitosDeLuz ?? "-"}</span>
                    </div>

                    <div className="flex">
                        <span className="font-semibold w-48">Cor da Folhagem:</span>
                        <span>{product.corDaFolhagem ?? "-"}</span>
                    </div>
                    <div className="flex">
                        <span className="font-semibold w-48">Tipo de Solo:</span>
                        <span>{product.tipoDeSolo ?? "-"}</span>
                    </div>
                </div>
            </div>

            <div className="w-8/12 my-12 mb-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold dark:text-white">Reviews do produto</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold dark:text-white">{averageRating.toFixed(1)}</span>
                        <div>
                            <StarRating rating={Math.round(averageRating)} />
                            <p className="text-sm text-gray-600 dark:text-gray-400">{reviews.length} reviews</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-8">
                    {errorMessage && (
                        <p className="mb-3 text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
                    )}
                    <h3 className="text-xl font-semibold mb-4 dark:text-white">Escreva uma Review</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sua Nota</label>
                        <StarRating rating={rating} interactive={true} onRate={setRating} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Seu Comentário</label>
                        <textarea
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 text-sm focus:border-green-600 dark:focus:border-green-500 focus:outline-none"
                            rows={4}
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            placeholder="Compartilhe sua experiência com este produto"
                            disabled={status === "loading"}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <SimpleButton
                            onClick={handleSubmitReview}
                            text={existingReview ? "Atualizar Review" : "Enviar Review"}
                            bgColor="bg-green-700"
                            disabled={isSubmitting || status === "loading"}
                        />
                        {existingReview && (
                            <button
                                onClick={handleDeleteReview}
                                disabled={isDeleting}
                                className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isDeleting ? "Removendo..." : "Remover minha review"}
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {reviews.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Este produto ainda não possui reviews. Seja o primeiro a compartilhar sua experiência!</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {review.usuario?.nome ?? review.reviewerName ?? "Cliente"}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(review.createdAt)}</p>
                                    </div>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProdutoDetalhes;
