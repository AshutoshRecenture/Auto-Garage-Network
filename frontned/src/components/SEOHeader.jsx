import React from "react";
import { Helmet } from "react-helmet-async";

const SEOHeader = ({
  title,
  description,
  keywords,
  canonicalPath = "",
  type = "website",
  image = "/logo-color.png"
}) => {
  const siteUrl = "https://autogaragenetwork.com";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return (
    <Helmet>
      {/* Base SEO Tags */}
      <title>{title ? `${title} | Auto Garage Network` : "Auto Garage Network | Premium Garage Management Suite"}</title>
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
    </Helmet>
  );
};

export default SEOHeader;
