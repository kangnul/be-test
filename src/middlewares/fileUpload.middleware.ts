import { Request, Response, NextFunction } from "express";

//Middleware untuk file upload

// Untuk upload filee dari raw multipart/form-data
export function rawFileUpload(req: Request, res: Response, next: NextFunction) {
  const contentType = req.headers["content-type"];
  const boundary = contentType?.split("boundary=")[1];

  if (!boundary) return res.status(400).json({ message: "Invalid multipart format" });

  const chunks: Uint8Array[] = [];
  req.on("data", chunk => chunks.push(chunk));
  req.on("end", () => {
    const buffer = Buffer.concat(chunks);
    const raw = buffer.toString("binary");

    const startIndex = raw.indexOf("filename=");
    if (startIndex === -1) return res.status(400).json({ message: "No file uploaded" });

    const filenameMatch = raw.match(/filename="(.+?)"/); // Ambil nama file
    const filename = filenameMatch?.[1] ?? "unknown.xlsx";

    const fileStart = raw.indexOf("\r\n\r\n", startIndex) + 4;
    const fileEnd = raw.lastIndexOf(`--${boundary}--`);
    const fileContent = buffer.subarray(fileStart, fileEnd - 2); // remove trailing \r\n

    // Tambahkan properti uploadedFile ke req.body agar bisa digunakan di controller
    req.body.uploadedFile = {
      filename,
      mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: fileContent.length,
      buffer: fileContent,
    };

    next();
  });
}