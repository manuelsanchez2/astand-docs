import type { HTMLOlAttributes, HTMLLiAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

interface ActivityType {
  name: HTMLElement | string;
  date: Date | string;
  src: string;
  alt: string;
  activity?: HTMLElement | string;
}

interface GroupTimelineType {
  name: string | HTMLElement;
  src: string;
  alt: string;
  href?: string;
  isPrivate?: boolean;
  comment?: string | HTMLElement;
}

interface ActivityProps extends HTMLOlAttributes {
  children: Snippet;
}

interface ActivityItemProps extends HTMLLiAttributes {
  activities: ActivityType[];
  liClass?: string;
  spanClass?: string;
  imgClass?: string;
  outerDivClass?: string;
  innerDivClass?: string;
  timeClass?: string;
  titleClass?: string;
  textClass?: string;
}

interface GroupProps extends HTMLOlAttributes {
  children: Snippet;
  divClass?: string;
  timeClass?: string;
  date?: Date | string;
  olClass?: string;
}

interface GroupItemProps extends HTMLLiAttributes {
  timelines: GroupTimelineType[];
  aClass?: string;
  imgClass?: string;
  divClass?: string;
  titleClass?: string;
  spanClass?: string;
}

type DateFormat = "year" | "month-year" | "full-date";

interface TimelineProps extends HTMLOlAttributes {
  children: Snippet;
  order?: "default" | "vertical" | "horizontal" | "activity" | "group";
}

interface TimelineItemProps extends HTMLLiAttributes {
  children: Snippet;
  orientationSlot?: Snippet;
  title: string;
  date: string;
  svgClass?: string;
  liClass?: string;
  divClass?: string;
  timeClass?: string;
  h3Class?: string;
  dateFormat?: DateFormat;
}

export type { ActivityType, ActivityProps, ActivityItemProps, GroupTimelineType, GroupProps, GroupItemProps, TimelineProps, TimelineItemProps, DateFormat };
