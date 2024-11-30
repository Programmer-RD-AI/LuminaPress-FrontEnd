import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  env: {
    ARTICLE_ID: "47504454-810e-4877-a3b4-3d94c377cf9a", // Set a default value if not defined
    USER_ID: "1804b13c-dd7f-4d19-ad43-93a3330307bd",
  },
});
