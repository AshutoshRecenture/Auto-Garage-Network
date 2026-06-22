import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

async function run() {
  // 1. Read index.html template
  const template = fs.readFileSync(toAbsolute("dist/index.html"), "utf-8");

  // 2. Import the server entry render function from compiled server bundle
  const serverEntryPath = toAbsolute("dist/server/entry-server.js");
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  // 3. List of static routes in the app
  const routes = [
    "/",
    "/about-us",
    "/pricing",
    "/garage-management-system",
    "/website-for-garages",
    "/autotech-data",
    "/mot-diary",
    "/seo",
    "/features",
    "/latest-work",
    "/blog",
    "/contact-us",
    "/login",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/admin",
    "/sitemap",
  ];

  console.log("Starting static site pre-rendering...");

  for (const url of routes) {
    const helmetContext = {};
    const appHtml = await render(url, helmetContext);
    const { helmet } = helmetContext;

    // Inject server-rendered HTML into placeholder
    let html = template.replace(/<!--\s*ssr[- ]*outlet\s*-->/, appHtml);

    // Inject SEO tags from react-helmet-async if available
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

    // Determine target output file path
    let filePath;
    if (url === "/") {
      filePath = toAbsolute("dist/index.html");
    } else {
      const dirPath = toAbsolute(`dist${url}`);
      fs.mkdirSync(dirPath, { recursive: true });
      filePath = path.join(dirPath, "index.html");
    }

    fs.writeFileSync(filePath, html);
    console.log(`✓ Pre-rendered route: ${url} -> ${path.relative(toAbsolute("."), filePath)}`);
  }

  // 4. Generate sitemap.xml dynamically based on the pre-rendered routes
  const siteUrl = "https://autogaragenetwork.com";
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const url of routes) {
    if (url === "/admin") continue; // Exclude admin dashboard from sitemap

    let changefreq = "monthly";
    let priority = "0.8";

    if (url === "/") {
      changefreq = "daily";
      priority = "1.0";
    } else if (
      url === "/features" ||
      url === "/pricing" ||
      url === "/garage-management-system" ||
      url === "/website-for-garages" ||
      url === "/blog"
    ) {
      changefreq = "weekly";
      priority = "0.9";
    } else if (url === "/latest-work") {
      changefreq = "weekly";
      priority = "0.7";
    } else if (
      url === "/privacy-policy" ||
      url === "/terms-of-service" ||
      url === "/cookie-policy"
    ) {
      changefreq = "monthly";
      priority = "0.5";
    } else if (url === "/login" || url === "/sitemap") {
      changefreq = "monthly";
      priority = "0.6";
    }

    const loc = `${siteUrl}${url === "/" ? "" : url}`;
    sitemapXml += `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  }
  sitemapXml += `</urlset>\n`;

  try {
    fs.writeFileSync(toAbsolute("dist/sitemap.xml"), sitemapXml);
    fs.writeFileSync(toAbsolute("public/sitemap.xml"), sitemapXml);
    console.log("✓ Dynamic sitemap.xml generated successfully in both dist/ and public/ directories");
  } catch (error) {
    console.warn("Could not generate sitemap.xml:", error.message);
  }

  // Clean up server-side build artifacts from dist folder
  try {
    fs.rmSync(toAbsolute("dist/server"), { recursive: true, force: true });
    console.log("✓ Cleaned up temporary server bundle directory");
  } catch (error) {
    console.warn("Could not clean up temporary server bundle:", error.message);
  }

  console.log("Static prerendering complete successfully!");
}

run().catch((err) => {
  console.error("Prerendering error:", err);
  process.exit(1);
});
