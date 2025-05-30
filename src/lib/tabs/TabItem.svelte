<script lang="ts">
  import { getContext } from "svelte";
  import { writable } from "svelte/store";
  import { type TabitemProps as Props, type TabCtxType, tabItem, tabs } from ".";

  let { children, titleSlot, open = false, title = "Tab title", activeClass, inactiveClass, class: className, disabled, tabStyle, ...restProps }: Props = $props();

  const ctx: TabCtxType = getContext("ctx");
  let compoTabStyle = $derived(tabStyle ? tabStyle : ctx.tabStyle || "full");

  const { active, inactive } = $derived(tabs({ tabStyle: compoTabStyle, hasDivider: true }));
  let selected = ctx.selected ?? writable<HTMLElement>();
  // Generate a unique ID for this tab button
  const tabId = `tab-${Math.random().toString(36).substring(2)}`;

  function init(node: HTMLElement) {
    selected.set(node);

    const destroy = selected.subscribe((x) => {
      if (x !== node) {
        open = false;
      }
    });

    return { destroy };
  }

  const { base, button, content } = $derived(tabItem({ open, disabled }));
</script>

<li {...restProps} class={base({ class: className })} role="presentation">
  <button
    type="button"
    onclick={() => (open = true)}
    role="tab"
    id={tabId}
    aria-controls={ctx.panelId}
    aria-selected={open}
    {disabled}
    class={button({
      class: open ? (activeClass ?? active()) : (inactiveClass ?? inactive())
    })}
  >
    {#if titleSlot}
      {@render titleSlot()}
    {:else}
      {title}
    {/if}
  </button>

  {#if open && children}
    <div class={content()}>
      <div use:init>
        {@render children()}
      </div>
    </div>
  {/if}
</li>

<!--
@component
[Go to docs](https://svelte-5-ui-lib.codewithshin.com/)
## Props
@props: children: any;
@props:titleSlot: any;
@props:open: any = false;
@props:title: any = "Tab title";
@props:activeClass: any;
@props:inactiveClass: any;
@props:class: string;
@props:disabled: any;
@props:tabStyle: any;
-->
