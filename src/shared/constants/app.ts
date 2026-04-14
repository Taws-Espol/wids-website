import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@hugeicons/core-free-icons";

import { COLORS } from "@/shared/constants/colors";

export const APP_NAME = "WiDS Guayaquil";

export const NAVIGATION_ITEMS = [
  {
    key: "nav.conference",
    href: "/conference",
    color: COLORS.green_light,
  },
  {
    key: "nav.learn",
    href: "/learn",
    color: COLORS.blue,
    children: [
      {
        key: "nav.learn-datathon",
        href: "/learn/datathon",
      },
      {
        key: "nav.learn-nextgen",
        href: "/learn/nextgen",
      },
    ],
  },
  {
    key: "nav.blog",
    href: "/blog",
    color: COLORS.yellow,
  },
  {
    key: "nav.about",
    href: "/about",
    color: COLORS.green_dark,
  },
];

export const SOCIAL_LINKS = [
  {
    platform: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/widsespol",
    icon: FacebookIcon,
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/widsespol/",
    icon: InstagramIcon,
  },
  {
    platform: "x",
    label: "X",
    href: "https://x.com/widsespol",
    icon: TwitterIcon,
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wids-guayaquil",
    icon: LinkedinIcon,
  },
];
