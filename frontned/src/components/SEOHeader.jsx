import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHeader = ({
  title,
  description,
  keywords,
  canonicalPath = "",
  type = "website",
  image = "/logo-color.png",
  schema = null, // Custom schema prop
  article = null, // Custom article schema details
}) => {
  const siteUrl = "https://autogaragenetwork.com";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  // 1. Build Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Auto Garage Network",
    "url": siteUrl,
    "logo": `${siteUrl}/logo-color.png`,
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+44-7947906789",
        "contactType": "sales",
        "areaServed": "GB",
        "availableLanguage": "en"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+44-1702655556",
        "contactType": "customer support",
        "areaServed": "GB",
        "availableLanguage": "en"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/autogaragenetworkltd",
      "https://www.instagram.com/autogaragenetworkltd.uk",
      "https://x.com/autogaragent",
      "https://www.linkedin.com/company/auto-garage-network-ltd/",
      "https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
    ]
  };

  const schemasToInject = [organizationSchema];

  // 2. Build Website Schema (Only for home page)
  const isHomePage = canonicalPath === "/" || canonicalPath === "";
  if (isHomePage) {
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Auto Garage Network",
      "url": siteUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${siteUrl}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
    schemasToInject.push(websiteSchema);
  }

  // 3. Build Breadcrumb List Schema (For subpages)
  if (!isHomePage && canonicalPath) {
    const pathSegments = canonicalPath.split("/").filter(Boolean);
    const breadcrumbElements = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      }
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      // Format segment name beautifully: e.g. about-us -> About Us
      const segmentName = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      breadcrumbElements.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": segmentName,
        "item": `${siteUrl}${currentPath}`
      });
    });

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbElements
    };
    schemasToInject.push(breadcrumbSchema);
  }

  // 4. Build Article Schema (If article details are provided or type is article)
  if (article || type === "article") {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article?.headline || title || "Auto Garage Network Article",
      "image": article?.image ? `${siteUrl}${article.image}` : `${siteUrl}${image}`,
      "datePublished": article?.datePublished || new Date().toISOString(),
      "dateModified": article?.dateModified || article?.datePublished || new Date().toISOString(),
      "author": {
        "@type": "Person",
        "name": article?.authorName || "Auto Garage Network"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Auto Garage Network",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo-color.png`
        }
      }
    };
    schemasToInject.push(articleSchema);
  }

  // 5. Append generic/custom schema passed directly
  if (schema) {
    if (Array.isArray(schema)) {
      schemasToInject.push(...schema);
    } else {
      schemasToInject.push(schema);
    }
  }

  return (
    <Helmet>
      {/* Base SEO Tags */}
      <title>
        {title
          ? `${title} | Auto Garage Network`
          : "Auto Garage Network | Premium Garage Management Suite"}
      </title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={title || "Auto Garage Network"} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="Auto Garage Network" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "Auto Garage Network"} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Structured Schema Markup */}
      {schemasToInject.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHeader;
