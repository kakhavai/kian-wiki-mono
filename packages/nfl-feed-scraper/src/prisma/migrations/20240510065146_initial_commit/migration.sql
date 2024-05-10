-- CreateTable
CREATE TABLE "Player" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "remoteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "jerseyNumber" INTEGER NOT NULL,
    "position" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "abv" TEXT NOT NULL,
    "wins" INTEGER NOT NULL,
    "losses" INTEGER NOT NULL,
    "pa" INTEGER NOT NULL,
    "pf" INTEGER NOT NULL,
    "tie" INTEGER NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMatchStats" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerId" UUID NOT NULL,
    "targets" INTEGER NOT NULL,
    "receptions" INTEGER NOT NULL,
    "yards" INTEGER NOT NULL,
    "touchdowns" INTEGER NOT NULL,
    "carries" INTEGER NOT NULL,
    "passes" INTEGER NOT NULL,
    "completions" INTEGER NOT NULL,
    "passingYards" INTEGER NOT NULL,
    "passingTds" INTEGER NOT NULL,
    "interceptions" INTEGER NOT NULL,
    "fumbles" INTEGER NOT NULL,
    "opponentTeamId" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerMatchStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_remoteId_key" ON "Player"("remoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Team_abv_key" ON "Team"("abv");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("abv") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMatchStats" ADD CONSTRAINT "PlayerMatchStats_opponentTeamId_fkey" FOREIGN KEY ("opponentTeamId") REFERENCES "Team"("abv") ON DELETE RESTRICT ON UPDATE CASCADE;
