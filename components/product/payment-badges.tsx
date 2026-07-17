import { siAmericanexpress, siApplepay, siPaypal, siVisa } from "simple-icons";

const card =
  "shrink-0 flex h-7 w-11 items-center justify-center overflow-hidden rounded-[3px] border border-neutral-200 bg-white";

function ApplePayBadge() {
  return (
    <div
      className="shrink-0 flex h-7 w-11 items-center justify-center overflow-hidden rounded-[3px] bg-white"
      role="img"
      aria-label="Apple Pay"
    >
      <svg
        viewBox="1.2 5.5 21.6 13"
        className="h-full w-full"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={siApplepay.path} fillRule="evenodd" />
      </svg>
    </div>
  );
}

function VisaBadge() {
  return (
    <div className={card} role="img" aria-label="Visa">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-auto"
        fill="#1A1F71"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={siVisa.path} />
      </svg>
    </div>
  );
}

function MastercardBadge() {
  // Centers at (9,12) and (15,12) with r=7; d=6, h=√40≈6.32
  // Intersection points: (12, 5.68) and (12, 18.32)
  // Orange lens: right arc of C1 then left arc of C2, both clockwise
  return (
    <div className={card} role="img" aria-label="Mastercard">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9" cy="12" r="7" fill="#EB001B" />
        <circle cx="15" cy="12" r="7" fill="#F79E1B" />
        <path
          d="M12 5.68 A 7 7 0 0 1 12 18.32 A 7 7 0 0 1 12 5.68 Z"
          fill="#FF5F00"
        />
      </svg>
    </div>
  );
}

function PayPalBadge() {
  return (
    <div className={card} role="img" aria-label="PayPal">
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-auto"
        fill="#002991"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={siPaypal.path} />
      </svg>
    </div>
  );
}

function AmexBadge() {
  return (
    <div
      className="shrink-0 flex h-7 w-11 items-center justify-center overflow-hidden rounded-[3px] bg-[#2E77BC]"
      role="img"
      aria-label="American Express"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-auto"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={siAmericanexpress.path} />
      </svg>
    </div>
  );
}

export function PaymentBadges() {
  return (
    <div className="mt-6 flex items-center justify-center gap-1.5">
      <ApplePayBadge />
      <PayPalBadge />
      <VisaBadge />
      <MastercardBadge />
      <AmexBadge />
    </div>
  );
}
