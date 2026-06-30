import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { LogoProvider } from "./utils/LogoContext.jsx";

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export async function render(url, helmetContext = {}) {
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <LogoProvider>
          <App />
        </LogoProvider>
      </StaticRouter>
    </HelmetProvider>
  );
  
  return await streamToString(prelude);
}
