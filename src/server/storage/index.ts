import fs from "node:fs/promises";
import path from "node:path";

export async function savePdfLocal(file: File, projectId: string) {
  const dir = process.env.LOCAL_UPLOAD_DIR || "./uploads";
  await fs.mkdir(dir, { recursive: true });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const key = `${projectId}-${Date.now()}.pdf`;
  const filePath = path.join(dir, key);

  await fs.writeFile(filePath, buffer);
  return { fileKey: key };
}
