<script lang="ts">
  import { type FooterLiProps as Props, footerLi } from "./";

  let { children, liClass, aClass, href, ...restProps }: Props = $props();
  const { base, link } = $derived(footerLi());
</script>

<li class={base({ class: liClass })}>
  <a {...restProps} {href} class={link({ class: aClass })}>
    {@render children()}
  </a>
</li>

<!--
@component
[Go to docs](https://svelte-5-ui-lib.codewithshin.com/)
## Props
@props: children: any;
@props:liClass: any;
@props:aClass: any;
@props:href: any;
-->
