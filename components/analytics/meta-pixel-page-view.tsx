"use client";

import { trackMetaEvent } from "lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackMetaEvent("PageView");
  }, [pathname, searchParams]);

  return null;
}
