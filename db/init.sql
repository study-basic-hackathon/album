CREATE TABLE "Photo" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW()
);
