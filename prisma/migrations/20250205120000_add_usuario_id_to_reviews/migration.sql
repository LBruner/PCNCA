CREATE TABLE IF NOT EXISTS "EstoqueReview" (
    "id" SERIAL PRIMARY KEY,
    "estoque_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "reviewer_name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuario_id" TEXT
);

ALTER TABLE "EstoqueReview"
ADD COLUMN IF NOT EXISTS "usuario_id" TEXT;

DELETE FROM "EstoqueReview" WHERE "usuario_id" IS NULL;

ALTER TABLE "EstoqueReview"
ALTER COLUMN "usuario_id" SET NOT NULL;

DO $$
BEGIN
    ALTER TABLE "EstoqueReview"
        ADD CONSTRAINT "EstoqueReview_estoque_id_fkey"
        FOREIGN KEY ("estoque_id") REFERENCES "Estoque"("estoque_id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END$$;

DO $$
BEGIN
    ALTER TABLE "EstoqueReview"
        ADD CONSTRAINT "EstoqueReview_usuario_id_fkey"
        FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END$$;

CREATE INDEX IF NOT EXISTS "EstoqueReview_usuario_id_idx" ON "EstoqueReview"("usuario_id");
CREATE INDEX IF NOT EXISTS "EstoqueReview_estoque_id_idx" ON "EstoqueReview"("estoque_id");

CREATE UNIQUE INDEX IF NOT EXISTS "EstoqueReview_estoque_id_usuario_id_key" ON "EstoqueReview"("estoque_id", "usuario_id");
