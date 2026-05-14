-- CreateTable
CREATE TABLE "Pilot" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jamTerbang" INTEGER NOT NULL,

    CONSTRAINT "Pilot_pkey" PRIMARY KEY ("id")
);
