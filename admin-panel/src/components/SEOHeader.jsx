import React, { useEffect } from "react";

const SEOHeader = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | AGN Admin` : "AGN Admin Control Suite";
  }, [title]);

  return null;
};

export default SEOHeader;
