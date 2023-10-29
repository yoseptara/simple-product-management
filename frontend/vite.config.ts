import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ViteTsconfigPaths from "vite-tsconfig-paths";
import ViteSvgPlugin from "vite-plugin-svgr";
// import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ViteTsconfigPaths(), ViteSvgPlugin()],
  assetsInclude: ["**/*.webp", "**/*.png"],
  // resolve: {
  //   alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  // },
});
