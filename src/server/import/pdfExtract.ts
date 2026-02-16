import fs from "node:fs/promises";
import path from "node:path";
import * as pdfParse from "pdf-parse";

export async function extractPdfTextLocal(fileKey: string) {
  const dir = process.env.LOCAL_UPLOAD_DIR || "./uploads";
  const filePath = path.join(dir, fileKey);

  const dataBuffer = await fs.readFile(filePath);

  // pdfParse is a namespace import, so call default if present
  const parsed =
    typeof pdfParse === "function"
      ? await (pdfParse as any)(dataBuffer)
      : await (pdfParse as any).default(dataBuffer);

  return {
    text: parsed.text?.slice(0, 500_000) ?? "",
    numPages: parsed.numpages ?? null,
  };
}
