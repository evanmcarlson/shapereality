import Image from "next/image";

export default function LogoSquare({ size }: { size?: "sm" | undefined }) {
  return (
    <Image
      src="/wordmark2.png"
      alt="Shape Reality"
      width={160}
      height={18}
      style={{
        width: "auto",
        height: size === "sm" ? "14px" : "34px",
        filter: "invert(var(--logo-invert))",
      }}
    />
  );
}
