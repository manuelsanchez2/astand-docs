// import { ANALYTICS_ID_RUNES_LIB } from "$env/static/private";
import type { MetaProps } from "runes-meta-tags";
import { splitAndCapitalize, removeHyphensAndCapitalize } from "./utils/helpers";
export const load = ({ url }) => {
  const title = splitAndCapitalize(url.pathname) ? `${splitAndCapitalize(url.pathname)} - ${removeHyphensAndCapitalize(__NAME__)}` : `${removeHyphensAndCapitalize(__NAME__)}`;
  const description = "Astand is the state management library for Svelte that makes it easy to create and manage state in your Svelte applications.";
  const image = "https://docs.astand.dev/images/opengraph-image.png";
  // console.log('url: ', splitAndCapitalize(url.pathname));
  const layoutMetaTags: MetaProps = {
    title,
    description,
    keywords: "svelte, runes, ui, components, library, state management, zustand, astand",
    twitter: {
      card: "summary_large_image",
      site: "@manuelsandoble",
      handle: "@manuelsandoble",
      title,
      description,
      image,
      imageAlt: title
    },
    og: {
      type: "website",
      title,
      description,
      url: url.href,
      image,
      imageAlt: title,
      siteName: "Astand",
      imageWidth: "1200",
      imageHeight: "630"
    }
  };
  return {
    layoutMetaTags
  };
};
