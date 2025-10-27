-- AlterTable
ALTER TABLE "Estoque" ADD COLUMN     "bloom_color" VARCHAR(200),
ADD COLUMN     "bloom_end" VARCHAR(50),
ADD COLUMN     "bloom_start" VARCHAR(50),
ADD COLUMN     "days_to_maturity" INTEGER,
ADD COLUMN     "empresa_id" INTEGER,
ADD COLUMN     "foliage_color" VARCHAR(100),
ADD COLUMN     "full_description" TEXT,
ADD COLUMN     "genus" VARCHAR(100),
ADD COLUMN     "germination_days" VARCHAR(50),
ADD COLUMN     "habit" VARCHAR(100),
ADD COLUMN     "heirloom" BOOLEAN DEFAULT false,
ADD COLUMN     "light_requirements" VARCHAR(100),
ADD COLUMN     "mature_height" VARCHAR(50),
ADD COLUMN     "mature_width" VARCHAR(50),
ADD COLUMN     "moisture_requirements" VARCHAR(100),
ADD COLUMN     "non_gmo" BOOLEAN DEFAULT false,
ADD COLUMN     "organic_seed" BOOLEAN DEFAULT false,
ADD COLUMN     "planting_depth" VARCHAR(50),
ADD COLUMN     "soil_type" VARCHAR(200),
ADD COLUMN     "spacing" VARCHAR(50),
ADD COLUMN     "species" VARCHAR(100),
ADD COLUMN     "sun_shade_info" VARCHAR(200),
ADD COLUMN     "uses" VARCHAR(300),
ADD COLUMN     "variety" VARCHAR(100),
ADD COLUMN     "vendor_name" VARCHAR(100),
ADD COLUMN     "zone_hardiness" VARCHAR(50);

-- CreateTable
CREATE TABLE "EstoqueReview" (
    "id" SERIAL NOT NULL,
    "estoque_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewer_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EstoqueReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EstoqueReview_estoque_id_idx" ON "EstoqueReview"("estoque_id");

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("empresa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstoqueReview" ADD CONSTRAINT "EstoqueReview_estoque_id_fkey" FOREIGN KEY ("estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE CASCADE ON UPDATE CASCADE;
