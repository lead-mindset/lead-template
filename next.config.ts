import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { normalizeBasePath } from "./src/lib/basePath";

// "" at the root, or e.g. "/talent" when served by leadmain via Multi Zones.
const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

if (basePath && !/^(\/[A-Za-z0-9._~-]+)+$/.test(basePath)) {
  // Git Bash on Windows rewrites "/talent" to "C:/Program Files/Git/talent".
  // Use .env.local, PowerShell, or MSYS_NO_PATHCONV=1 to avoid that.
  throw new Error(
    `Invalid NEXT_PUBLIC_BASE_PATH "${basePath}". Expected something like "/talent".`,
  );
}

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
