-- CreateTable
CREATE TABLE "horoscope" (
    "id" SERIAL NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "horoscope_pkey" PRIMARY KEY ("id")
);
