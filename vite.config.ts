import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// base "./" + JS/CSS embutidos no index.html: o dist/ abre com duplo clique (file://),
// onde o navegador bloquearia <script type="module" src> externo
export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
