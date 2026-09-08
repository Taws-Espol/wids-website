import { APP_NAME, SOCIAL_LINKS } from "@/shared/constants/app";
import { getAppUrl } from "@/shared/utils/get-app-url";

/**
 * The site-wide `Organization` document.
 *
 * `sameAs` is what lets a search engine tie this site to the social profiles it
 * already knows about, so it is built from the same `SOCIAL_LINKS` the footer
 * renders — one list, no chance of the two drifting.
 */
export function getOrganizationJsonLd(description: string) {
  const appUrl = getAppUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_NAME,
    url: appUrl.toString(),
    logo: new URL("/icon.png", appUrl).toString(),
    description,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}
