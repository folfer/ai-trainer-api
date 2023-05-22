-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "physicalActivity" BOOLEAN NOT NULL,
    "lactose_intolerance" BOOLEAN NOT NULL,
    "gluten_intolerance" BOOLEAN NOT NULL,
    "gastritis" BOOLEAN NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "goal" TEXT NOT NULL,
    "body_fat" DOUBLE PRECISION,
    "allergy" TEXT,
    "diet_price" TEXT NOT NULL,
    "orthopedic_disfunction" TEXT NOT NULL,
    "respiratory_disfunction" TEXT NOT NULL,
    "cardio_disfunction" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout-solicitations" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "physicalActivity" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workout-solicitations_pkey" PRIMARY KEY ("id")
);

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
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "diet_price" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "diet-solicitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cardio-solicitations" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "cholesterol" DOUBLE PRECISION NOT NULL,
    "diabetes" BOOLEAN NOT NULL,
    "smoker" BOOLEAN NOT NULL,
    "orthopedic_disfunction" TEXT NOT NULL,
    "respiratory_disfunction" TEXT NOT NULL,
    "cardio_disfunction" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "cardio-solicitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "workout-solicitations" ADD CONSTRAINT "workout-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diet-solicitations" ADD CONSTRAINT "diet-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cardio-solicitations" ADD CONSTRAINT "cardio-solicitations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
