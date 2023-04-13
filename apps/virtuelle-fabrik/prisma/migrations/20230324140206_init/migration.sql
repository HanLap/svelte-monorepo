/*
  Warnings:

  - You are about to drop the `MaschinenBefaehigung` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaterialBedarf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaschinenBefaehigung" DROP CONSTRAINT "MaschinenBefaehigung_maschineId_fkey";

-- DropForeignKey
ALTER TABLE "MaschinenBefaehigung" DROP CONSTRAINT "MaschinenBefaehigung_schrittId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialBedarf" DROP CONSTRAINT "MaterialBedarf_materialId_fkey";

-- DropForeignKey
ALTER TABLE "MaterialBedarf" DROP CONSTRAINT "MaterialBedarf_produktId_fkey";

-- DropTable
DROP TABLE "MaschinenBefaehigung";

-- DropTable
DROP TABLE "MaterialBedarf";

-- CreateTable
CREATE TABLE "Maschinenbefaehigung" (
    "schrittId" TEXT NOT NULL,
    "taktrate" INTEGER NOT NULL,
    "maschineId" TEXT NOT NULL,

    CONSTRAINT "Maschinenbefaehigung_pkey" PRIMARY KEY ("schrittId","maschineId")
);

-- CreateTable
CREATE TABLE "Materialbedarf" (
    "materialId" TEXT NOT NULL,
    "produktId" TEXT NOT NULL,

    CONSTRAINT "Materialbedarf_pkey" PRIMARY KEY ("materialId","produktId")
);

-- AddForeignKey
ALTER TABLE "Maschinenbefaehigung" ADD CONSTRAINT "Maschinenbefaehigung_schrittId_fkey" FOREIGN KEY ("schrittId") REFERENCES "Arbeitsschritt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maschinenbefaehigung" ADD CONSTRAINT "Maschinenbefaehigung_maschineId_fkey" FOREIGN KEY ("maschineId") REFERENCES "Maschine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materialbedarf" ADD CONSTRAINT "Materialbedarf_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materialbedarf" ADD CONSTRAINT "Materialbedarf_produktId_fkey" FOREIGN KEY ("produktId") REFERENCES "Produkt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
