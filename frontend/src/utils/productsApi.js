// src/utils/productsApi.js
import matter from "gray-matter";
import '../utils/buffer-polyfill'; // Tambahkan polyfill untuk Buffer

/** fetch the index (products.json) */
export async function fetchProductsIndex() {
  const res = await fetch("/products/products.json");
  if (!res.ok) throw new Error("Gagal memuat products.json");
  return res.json();
}

/** fetch single markdown file content and parse frontmatter + content */
export async function fetchProductMarkdown(fileName) {
  try {
    const res = await fetch(`/products/${fileName}`);
    if (!res.ok) throw new Error("Gagal memuat file md: " + fileName);
    const text = await res.text();
    
    // Parsing manual jika gray-matter gagal
    try {
      const parsed = matter(text);
      // parsed.data = frontmatter object, parsed.content = markdown content
      return { frontmatter: parsed.data, content: parsed.content };
    } catch (matterError) {
      console.error("Gray-matter error:", matterError);
      
      // Fallback: Parse manual jika gray-matter gagal
      return parseMarkdownManually(text);
    }
  } catch (error) {
    console.error("Error fetching markdown:", error);
    return { frontmatter: {}, content: "" };
  }
}

// Fungsi parsing manual sebagai fallback
function parseMarkdownManually(text) {
  // Cek apakah dimulai dengan --- untuk frontmatter
  if (!text.startsWith('---')) {
    return { frontmatter: {}, content: text };
  }

  // Cari batas frontmatter (---)
  const endFrontMatterIndex = text.indexOf('---', 3);
  if (endFrontMatterIndex === -1) {
    return { frontmatter: {}, content: text };
  }

  // Ekstrak frontmatter dan konten
  const frontMatterText = text.substring(3, endFrontMatterIndex).trim();
  const content = text.substring(endFrontMatterIndex + 3).trim();

  // Parse frontmatter sederhana
  const frontmatter = {};
  frontMatterText.split('\n').forEach(line => {
    if (line.trim()) {
      const colonIndex = line.indexOf(':');
      if (colonIndex !== -1) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Coba parse nilai numerik
        if (!isNaN(value)) {
          value = parseFloat(value);
        }
        
        // Hapus tanda kutip jika ada
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.substring(1, value.length - 1);
        }
        
        frontmatter[key] = value;
      }
    }
  });

  return { frontmatter, content };
}
