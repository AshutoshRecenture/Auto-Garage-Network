import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  console.log("Initializing Vite SSR Dev Server...");

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom"
  });

  const server = http.createServer((req, res) => {
    // Let Vite middleware handle assets, HMR, etc.
    vite.middlewares(req, res, async () => {
      const url = req.url;

      // Serve static files from public directory directly
      if (url === "/llm.txt" || url === "/robots.txt" || url === "/sitemap.xml") {
        const publicPath = path.resolve(__dirname, "public", url.substring(1));
        if (fs.existsSync(publicPath)) {
          const ext = path.extname(publicPath);
          const contentType = ext === ".xml" ? "application/xml" : "text/plain";
          res.writeHead(200, { "Content-Type": contentType });
          return res.end(fs.readFileSync(publicPath, "utf-8"));
        }
      }

      try {
        // 1. Read the source index.html template
        let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");

        // 2. Apply Vite HTML transforms (injects HMR client, CSS links, etc.)
        template = await vite.transformIndexHtml(url, template);

        // 3. Load the server entry module dynamically
        const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

        // 4. Render the React App to HTML string
        const helmetContext = {};
        const appHtml = await render(url, helmetContext);
        const { helmet } = helmetContext;

        // 5. Inject the rendered app content into the template
        let html = template.replace(/<!--\s*ssr[- ]*outlet\s*-->/, appHtml);

        // 6. Inject the dynamic SEO tags using React Helmet
        if (helmet) {
          const titleText = helmet.title.toString();
          const metaTags = helmet.meta.toString();
          const linkTags = helmet.link.toString();

          if (titleText) {
            html = html.replace(/<title>.*?<\/title>/, titleText);
          }
          const headTags = [metaTags, linkTags].filter(Boolean).join("\n");
          if (headTags) {
            html = html.replace("</head>", `${headTags}\n</head>`);
          }
        }

        // 7. Return the fully pre-rendered HTML response
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e);
        console.error("SSR Dev Server Error:", e);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(e.stack);
      }
    });
  });

  const PORT = process.env.PORT || 5173;
  server.listen(PORT, () => {
    console.log(`\n✓ Vite SSR Dev Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start Vite SSR Dev Server:", err);
  process.exit(1);
});
