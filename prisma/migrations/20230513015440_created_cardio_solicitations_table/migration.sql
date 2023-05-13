-- CreateTable
CREATE TABLE "cardio-solicitations" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "hypertension" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "orthopedic_disfunction" TEXT NOT NULL,
    "respiratory_disfunction" TEXT NOT NULL,
    "cardio_disfunction" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cardio-solicitations_pkey" PRIMARY KEY ("id")
);
