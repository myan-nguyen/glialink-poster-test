/**
 * Chunk text by character count with optional overlap.
 * Memory-efficient: works on slices without copying entire strings unnecessarily.
 */
export function chunkText(text: string, chunkSize = 8_000, overlap = 500) {
  if (chunkSize <= 0) throw new Error("chunkSize must be positive");
  
  const chunks: string[] = [];
  let i = 0;
  
  while (i < text.length) {
    const end = Math.min(text.length, i + chunkSize);
    chunks.push(text.slice(i, end));
    
    // Move forward by (chunkSize - overlap) for next iteration
    i = end - overlap;
    
    // Prevent infinite loop on tiny chunks
    if (i <= 0) break;
  }
  
  // Ensure we got at least one chunk
  return chunks.length > 0 ? chunks : [text];
}
