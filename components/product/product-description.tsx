import { AddToCart } from "components/cart/add-to-cart";
import { ViewItemTracker } from "components/analytics/view-item-tracker";
import { PaymentBadges } from "components/product/payment-badges";
import { EyeIcon, PuzzlePieceIcon, TrophyIcon, UserIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col pb-6 dark:border-neutral-700">
        <h1 className="mb-4 font-sans text-5xl font-bold">{product.title}</h1>
        <div className="mr-auto w-auto text-sm">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <div className="mb-12 mt-12 grid grid-cols-4 gap-2">
        {[
          { Icon: UserIcon, label: 'Solo\nChallenge' },
          { Icon: PuzzlePieceIcon, label: '120\nPieces' },
          { Icon: TrophyIcon, label: 'Leader-\nboards' },
          { Icon: EyeIcon, label: 'Hidden\nExperience' },
        ].map(({ Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-5 w-5 opacity-60" />
            <span className="whitespace-pre-line font-mono text-[8px] uppercase leading-tight tracking-widest opacity-40">
              {label}
            </span>
          </div>
        ))}
      </div>
      <ViewItemTracker product={product} />
      <AddToCart product={product} />
      <PaymentBadges />
    </>
  );
}
