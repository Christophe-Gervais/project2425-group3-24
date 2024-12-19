-- CreateTable
CREATE TABLE "Game" (
    "gameCode" TEXT NOT NULL,
    "hostPlayerId" INTEGER NOT NULL,
    "cardDeckId" INTEGER NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    "maxPlayers" INTEGER NOT NULL,
    "winCondition" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("gameCode")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "gameCode" TEXT,
    "username" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerInRound" (
    "playerId" INTEGER NOT NULL,
    "roundId" INTEGER NOT NULL,
    "whiteCardId" INTEGER NOT NULL,

    CONSTRAINT "PlayerInRound_pkey" PRIMARY KEY ("playerId","roundId")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "gameCode" TEXT NOT NULL,
    "cardCzarId" INTEGER NOT NULL,
    "winnerId" INTEGER NOT NULL,
    "blackCardId" INTEGER NOT NULL,
    "roundNumber" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteCard" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "WhiteCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlackCard" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "BlackCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardInDeck" (
    "blackCardId" INTEGER NOT NULL,
    "cardDeckId" INTEGER NOT NULL,

    CONSTRAINT "CardInDeck_pkey" PRIMARY KEY ("blackCardId","cardDeckId")
);

-- CreateTable
CREATE TABLE "CardDeck" (
    "id" SERIAL NOT NULL,
    "deckName" TEXT NOT NULL,

    CONSTRAINT "CardDeck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_hostPlayerId_key" ON "Game"("hostPlayerId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_hostPlayerId_fkey" FOREIGN KEY ("hostPlayerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_cardDeckId_fkey" FOREIGN KEY ("cardDeckId") REFERENCES "CardDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_gameCode_fkey" FOREIGN KEY ("gameCode") REFERENCES "Game"("gameCode") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerInRound" ADD CONSTRAINT "PlayerInRound_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerInRound" ADD CONSTRAINT "PlayerInRound_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerInRound" ADD CONSTRAINT "PlayerInRound_whiteCardId_fkey" FOREIGN KEY ("whiteCardId") REFERENCES "WhiteCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_gameCode_fkey" FOREIGN KEY ("gameCode") REFERENCES "Game"("gameCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_cardCzarId_fkey" FOREIGN KEY ("cardCzarId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_blackCardId_fkey" FOREIGN KEY ("blackCardId") REFERENCES "BlackCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardInDeck" ADD CONSTRAINT "CardInDeck_blackCardId_fkey" FOREIGN KEY ("blackCardId") REFERENCES "BlackCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardInDeck" ADD CONSTRAINT "CardInDeck_cardDeckId_fkey" FOREIGN KEY ("cardDeckId") REFERENCES "CardDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
