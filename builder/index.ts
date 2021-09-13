import { resolve } from "path";
import { build } from "esbuild";
import { buildIndexHtml } from "./buildIndexHtml";
import { writeFile } from "fs/promises";

const outDir = resolve(process.cwd(), "build");
const bundleName = "bundle";

(async () => {
  await build({
    entryPoints: ["src/index.tsx"],
    bundle: true,
    minify: true,
    outfile: `${resolve(outDir, bundleName)}.js`,
  });
  console.log("Bundles are done");

  await writeFile(resolve(outDir, "index.html"), buildIndexHtml(bundleName), {
    encoding: "utf8",
  });
  console.log("HTML is done");
})();
