-- CreateTable
CREATE TABLE "Szenario" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Szenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arbeitsschritt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "szenarioId" INTEGER NOT NULL,

    CONSTRAINT "Arbeitsschritt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charge" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "prioritaet" INTEGER NOT NULL,
    "szenarioId" INTEGER NOT NULL,

    CONSTRAINT "Charge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Maschine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ruestzeit" INTEGER NOT NULL,
    "kostenMinute" INTEGER NOT NULL,
    "ausfallWahrscheinlichkeit" INTEGER NOT NULL,
    "mitarbeiterMin" INTEGER NOT NULL,
    "mitarbeiterMax" INTEGER NOT NULL,
    "szenarioId" INTEGER NOT NULL,

    CONSTRAINT "Maschine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaschinenBefaehigung" (
    "schrittId" TEXT NOT NULL,
    "taktrate" INTEGER NOT NULL,
    "maschineId" TEXT NOT NULL,

    CONSTRAINT "MaschinenBefaehigung_pkey" PRIMARY KEY ("schrittId","maschineId")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kostenStueck" INTEGER NOT NULL,
    "szenarioId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialBedarf" (
    "materialId" TEXT NOT NULL,
    "produktId" TEXT NOT NULL,

    CONSTRAINT "MaterialBedarf_pkey" PRIMARY KEY ("materialId","produktId")
);

-- CreateTable
CREATE TABLE "Mitarbeiter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "wechselzeit" INTEGER NOT NULL,

    CONSTRAINT "Mitarbeiter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mitarbeiterbefaehigung" (
    "schrittId" TEXT NOT NULL,
    "mitarbeiterId" TEXT NOT NULL,
    "taktrate" INTEGER NOT NULL,

    CONSTRAINT "Mitarbeiterbefaehigung_pkey" PRIMARY KEY ("schrittId","mitarbeiterId")
);

-- CreateTable
CREATE TABLE "Produkt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "verkaufspreis" TEXT NOT NULL,
    "szenarioId" INTEGER NOT NULL,

    CONSTRAINT "Produkt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produktbedarf" (
    "produktId" TEXT NOT NULL,
    "chargeId" TEXT NOT NULL,
    "stueckzahl" INTEGER NOT NULL,

    CONSTRAINT "Produktbedarf_pkey" PRIMARY KEY ("produktId","chargeId")
);

-- CreateTable
CREATE TABLE "Produktionsschritt" (
    "schrittId" TEXT NOT NULL,
    "produktId" TEXT NOT NULL,
    "nummer" INTEGER NOT NULL,

    CONSTRAINT "Produktionsschritt_pkey" PRIMARY KEY ("schrittId","produktId")
);

-- AddForeignKey
ALTER TABLE "Arbeitsschritt" ADD CONSTRAINT "Arbeitsschritt_szenarioId_fkey" FOREIGN KEY ("szenarioId") REFERENCES "Szenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charge" ADD CONSTRAINT "Charge_szenarioId_fkey" FOREIGN KEY ("szenarioId") REFERENCES "Szenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maschine" ADD CONSTRAINT "Maschine_szenarioId_fkey" FOREIGN KEY ("szenarioId") REFERENCES "Szenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaschinenBefaehigung" ADD CONSTRAINT "MaschinenBefaehigung_schrittId_fkey" FOREIGN KEY ("schrittId") REFERENCES "Arbeitsschritt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaschinenBefaehigung" ADD CONSTRAINT "MaschinenBefaehigung_maschineId_fkey" FOREIGN KEY ("maschineId") REFERENCES "Maschine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_szenarioId_fkey" FOREIGN KEY ("szenarioId") REFERENCES "Szenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialBedarf" ADD CONSTRAINT "MaterialBedarf_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialBedarf" ADD CONSTRAINT "MaterialBedarf_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mitarbeiterbefaehigung" ADD CONSTRAINT "Mitarbeiterbefaehigung_schrittId_fkey" FOREIGN KEY ("schrittId") REFERENCES "Arbeitsschritt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mitarbeiterbefaehigung" ADD CONSTRAINT "Mitarbeiterbefaehigung_mitarbeiterId_fkey" FOREIGN KEY ("mitarbeiterId") REFERENCES "Mitarbeiter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produkt" ADD CONSTRAINT "Produkt_szenarioId_fkey" FOREIGN KEY ("szenarioId") REFERENCES "Szenario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produktbedarf" ADD CONSTRAINT "Produktbedarf_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produktbedarf" ADD CONSTRAINT "Produktbedarf_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produktionsschritt" ADD CONSTRAINT "Produktionsschritt_schrittId_fkey" FOREIGN KEY ("schrittId") REFERENCES "Arbeitsschritt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produktionsschritt" ADD CONSTRAINT "Produktionsschritt_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
