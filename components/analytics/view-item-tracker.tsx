"use client";

import { trackEvent } from "lib/analytics";
import { Product } from "lib/shopify/types";
import { useEffect } from "react";

export function ViewItemTracker({ product }: { product: Product }) {
  useEffect(() => {
    trackEvent("view_item", {
      currency: product.priceRange.minVariantPrice.currencyCode,
      value: parseFloat(product.priceRange.minVariantPrice.amount),
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price: parseFloat(product.priceRange.minVariantPrice.amount),
        },
      ],
    });
  }, [product]);

  return null;
}
