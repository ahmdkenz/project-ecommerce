// src/utils/productsApi.js
import matter from "gray-matter";

/** fetch the index (products.json) */
export async function fetchProductsIndex() {
  const res = await fetch("/products/products.json");
  if (!res.ok) throw new Error("Gagal memuat products.json");
  return res.json();
}

/** fetch single markdown file content and parse frontmatter + content */
export async function fetchProductMarkdown(fileName) {
  const res = await fetch(`/products/${fileName}`);
  if (!res.ok) throw new Error("Gagal memuat file md: " + fileName);
  const text = await res.text();
  const parsed = matter(text);
  // parsed.data = frontmatter object, parsed.content = markdown content
  return { frontmatter: parsed.data, content: parsed.content };
}
