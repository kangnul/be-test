import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function uploadFile(req: Request, res: Response) {
  const file = req.body.uploadedFile;

  if (!file) return res.status(400).json({ message: "No file found" });

  await prisma.uploadedFile.create({
    data: {
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      data: file.buffer,
    },
  });

  return res.json({ message: "File uploaded successfully!" });
}

export async function listFiles(req: Request, res: Response) {
  let filters = {};

  // Handle buat kalau mau pake filter berdasarkan filename doang
  if (req.query.filters) {
    try {
      const parsed = JSON.parse(req.query.filters as string);

      if (parsed.filename) {
        filters = {
          ...filters,
          filename: {
            contains: parsed.filename // Partial match, dan musti case sensitive
          },
        };
      }
    } catch (err) {
      return res.status(400).json({ message: "Invalid filters format" });
    }
  }

  const files = await prisma.uploadedFile.findMany({
    where: filters,
    select: {
      id: true,
      filename: true,
      mimetype: true,
      size: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return res.json({ files });
}