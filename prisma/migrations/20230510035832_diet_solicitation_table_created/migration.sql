-- CreateTable
CREATE TABLE "diet-solicitations" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "body_fat" DOUBLE PRECISION,
    "allergy" TEXT,
    "lactose_intolerance" BOOLEAN NOT NULL,
    "gluten_intolerance" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "hypertension" BOOLEAN NOT NULL,
    "gastritis" BOOLEAN NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "vegan" BOOLEAN NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "diet-solicitations_pkey" PRIMARY KEY ("id")
);
