"use client";

import { trackGAEvent, trackMetaEvent } from "lib/analytics";
import { Product } from "lib/shopify/types";
import { useEffect } from "react";

export function ViewItemTracker({ product }: { product: Product }) {
  useEffect(() => {
    const price = parseFloat(product.priceRange.minVariantPrice.amount);
    const currency = product.priceRange.minVariantPrice.currencyCode;

    trackGAEvent("view_item", {
      currency,
      value: price,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          price,
        },
      ],
    });

    trackMetaEvent("ViewContent", {
      content_ids: [product.id],
      content_type: "product",
      content_name: product.title,
      value: price,
      currency,
    });
  }, [product]);

  return null;
}
