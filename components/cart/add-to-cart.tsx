"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem, buyNow } from "components/cart/actions";
import { trackEvent } from "lib/analytics";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const addToCartClasses =
    "relative flex w-full items-center justify-center rounded-full border border-current bg-transparent p-4 tracking-wide uppercase";
  const buyNowClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white uppercase";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buyNowClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <div className="flex flex-col gap-2">
        <button
          aria-label="Please select an option"
          disabled
          className={clsx(addToCartClasses, disabledClasses)}
        >
          <div className="absolute left-0 ml-4">
            <PlusIcon className="h-5" />
          </div>
          Add To Cart
        </button>
        <button disabled className={clsx(buyNowClasses, disabledClasses)}>
          Buy It Now
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        aria-label="Add to cart"
        className={clsx(addToCartClasses, "cursor-pointer hover:opacity-60")}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
      <button
        aria-label="Buy it now"
        formAction={() => buyNow(selectedVariantId)}
        className={clsx(buyNowClasses, "cursor-pointer hover:opacity-90")}
      >
        Buy It Now
      </button>
    </div>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  return (
    <form
      action={async () => {
        trackEvent("add_to_cart", {
          currency: finalVariant.price.currencyCode,
          value: parseFloat(finalVariant.price.amount),
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              item_variant: finalVariant.id,
              price: parseFloat(finalVariant.price.amount),
              quantity: 1,
            },
          ],
        });
        addCartItem(finalVariant, product);
        addItemAction();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
