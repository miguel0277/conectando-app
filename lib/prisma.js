// lib/prisma.js
const { PrismaClient } = require("@prisma/client");

// versión simple para scripts Node (seed, etc.)
const prisma = new PrismaClient({
  log: ["error", "warn"],
});

module.exports = { prisma };
