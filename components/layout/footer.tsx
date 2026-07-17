import { getMenu } from "lib/shopify";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      {/* <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>

      </div> */}
      <div className="py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:justify-center md:gap-0 md:px-4 min-[1320px]:px-0">
          <div className="flex md:flex-row">
            <p>
              <a href="https://shapereality.com/shipping">Shipping & Returns</a>
            </p>
            <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 inline-block" />
            <p>
              <a href="https://shapereality.com/privacy">Privacy</a>
            </p>
            <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 inline-block" />
            <p>
              <a href="https://shapereality.com/terms">Terms</a>
            </p>
            <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          </div>
          <p>
            &copy; {currentYear} {copyrightName}
          </p>
        </div>
      </div>
    </footer>
  );
}
