<script lang="ts">
  import { Badge, badge, Button, Radio, Label, type BadgeProps, uiHelpers } from "$lib";
  import { ClockSolid } from "flowbite-svelte-icons";
  import { blur, fly, slide, scale } from "svelte/transition";
  import type { FlyParams, BlurParams, SlideParams, ScaleParams } from "svelte/transition";
  import { linear } from "svelte/easing";
  import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import DynamicCodeBlockHighlight from "../../utils/DynamicCodeBlockHighlight.svelte";
  import CodeWrapper from "../../utils/CodeWrapper.svelte";
  import H1 from "../../utils/H1.svelte";
  import H2 from "../../utils/H2.svelte";
  import { isGeneratedCodeOverflow } from "../../utils/helpers";
  // for Props table
  import CompoAttributesViewer from "../../utils/CompoAttributesViewer.svelte";
  const dirName = "badge";

  // for examples section that dynamically changes the svelte component and svelteCode content
  import * as ExampleComponents from "./examples";
  const exampleModules = import.meta.glob("./examples/*.svelte", {
    query: "?raw",
    import: "default",
    eager: true
  }) as Record<string, string>;

  // interactive example
  const colors = Object.keys(badge.variants.color);
  let color: BadgeProps["color"] = $state("primary");
  let badgeSize: BadgeProps["large"] = $state(false);
  const changeSize = () => {
    badgeSize = !badgeSize;
  };
  let badgeDismissable: BadgeProps["dismissable"] = $state(false);
  const changeDismissable = () => {
    badgeDismissable = !badgeDismissable;
  };
  let badgeClass: BadgeProps["class"] = $state("");
  const changeClass = () => {
    badgeClass = badgeClass === "" ? "w-40 p-2" : "";
  };
  let badgeStatus2 = $state(true);
  const changeStatus = () => {
    badgeStatus2 = true;
  };
  let border: BadgeProps["border"] = $state(false);
  const changeBorder = () => {
    border = !border;
  };
  let rounded: BadgeProps["rounded"] = $state(false);
  const changeRounded = () => {
    rounded = !rounded;
  };
  let link = $state("");
  const changeLink = () => {
    link = link === "" ? "/" : "";
  };
  let iconSlot = $state(false);
  const changeIconSlot = () => {
    iconSlot = !iconSlot;
  };

  // transition example
  type TransitionOption = {
    name: string;
    transition: typeof fly | typeof blur | typeof slide | typeof scale;
    params: FlyParams | BlurParams | SlideParams | ScaleParams;
    color: BadgeProps["color"];
  };

  const transitions: TransitionOption[] = [
    { name: "Fly", transition: fly, params: { duration: 500, easing: linear, x: 150 }, color: "blue" },
    { name: "Blur", transition: blur, params: { duration: 500, easing: linear }, color: "lime" },
    { name: "Slide", transition: slide, params: { duration: 500, easing: linear, x: -150 }, color: "violet" },
    { name: "Scale", transition: scale, params: { duration: 500, easing: linear }, color: "pink" }
  ];

  let selectedTransition = $state("Fly");
  let currentTransition = $derived(transitions.find((t) => t.name === selectedTransition) || transitions[0]);

  let generatedCode = $derived(
    (() => {
      let props = [];
      if (color !== "primary") props.push(` color="${color}"`);
      if (badgeSize) props.push(" large");
      if (badgeDismissable) props.push(" dismissable");
      if (badgeClass) props.push(` class="${badgeClass}"`);
      if (!badgeStatus2) props.push(" badgeStatus={false}");
      if (border) props.push(" border");
      if (link) props.push(` href="${link}"`);
      if (rounded) props.push(" rounded");
      if (currentTransition !== transitions[0] && badgeDismissable) {
        props.push(` transition={${currentTransition.transition.name}}`);
        // Generate params string without quotes and handle functions
        const paramsString = Object.entries(currentTransition.params)
          .map(([key, value]) => {
            if (typeof value === "function") {
              return `${key}:${value.name}`;
            }
            return `${key}:${value}`;
          })
          .join(",");

        props.push(` params={{${paramsString}}}`);
      }

      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join("") + "\n" : "";

      if (iconSlot) {
        return `<Badge${propsString}>
  <ClockSolid class="me-1.5 h-3 w-3" />
  My Badge
</Badge>`;
      } else {
        return `<Badge${propsString}>My Badge</Badge>`;
      }
    })()
  );
  // for interactive builder
  let builder = uiHelpers();
  let builderExpand = $state(false);
  let showBuilderExpandButton = $derived(isGeneratedCodeOverflow(generatedCode));
  const handleBuilderExpandClick = () => {
    builderExpand = !builderExpand;
  };

  $effect(() => {
    builderExpand = builder.isOpen;
  });
</script>

<H1>Badge</H1>
<H2>Setup</H2>
<HighlightCompo code={exampleModules[`./examples/Setup.svelte`] as string} />

<H2>Interactive Badge Builder</H2>
<CodeWrapper>
  <div class="mb-4 h-10">
    <Badge {color} large={badgeSize} dismissable={badgeDismissable} class={badgeClass} bind:badgeStatus={badgeStatus2} {border} {rounded} transition={currentTransition.transition} params={currentTransition.params} href={link}>
      {#if iconSlot}
        <ClockSolid class="my-1 me-1.5 h-2.5 w-2.5" />
      {/if}
      My Badge
    </Badge>
  </div>
  <div class="mb-4 h-12">
    <Button disabled={badgeStatus2 ? true : false} onclick={changeStatus}>Open badge</Button>
  </div>
  <div class="flex flex-wrap space-x-2">
    <Label class="mb-4 w-full font-bold">Color</Label>
    {#each colors as colorOption}
      <Radio labelClass="w-24 my-1" name="color" bind:group={color} color={colorOption as BadgeProps["color"]} value={colorOption}>{colorOption}</Radio>
    {/each}
  </div>
  <div class="mb-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Transition</Label>
    {#each transitions as transition}
      <Radio disabled={badgeDismissable ? false : true} labelClass="w-16 my-1 {badgeDismissable ? '' : 'opacity-30 cursor-not-allowed'}" name="transition_interactive" bind:group={selectedTransition} value={transition.name}>{transition.name}</Radio>
    {/each}
  </div>
  <div class="flex flex-wrap justify-center gap-2 md:justify-start">
    <Button class="w-40" color="blue" onclick={changeSize}>{badgeSize ? "Small" : "Large"}</Button>
    <Button class="w-40" color="green" onclick={changeDismissable}>{badgeDismissable ? "Not dismissable" : "Dismissable"}</Button>
    <Button class="w-40" color="purple" onclick={changeClass}>{badgeClass ? "Remove class" : "Add class"}</Button>
    <Button class="w-40" color="yellow" onclick={changeBorder}>{border ? "Remove border" : "Add border"}</Button>
    <Button class="w-40" color="dark" onclick={changeRounded}>{rounded ? "Remove rounded" : "Add rounded"}</Button>
    <Button class="w-40" color="pink" onclick={changeLink}>{link ? "Remove href" : "Add href"}</Button>
    <Button class="w-40" color="teal" onclick={changeIconSlot}>{iconSlot ? "Remove icon" : "Add icon"}</Button>
  </div>
  {#snippet codeblock()}
    <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
  {/snippet}
</CodeWrapper>

<H2>Dismissing with custom icon</H2>
<CodeWrapper>
  <ExampleComponents.DismissingWithCustomIcon />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/DismissingWithCustomIcon.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Dismissing with events</H2>
<CodeWrapper>
  <ExampleComponents.DismissingWithEvents />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/DismissingWithEvents.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Notification badge</H2>
<CodeWrapper>
  <ExampleComponents.NotificationBadge />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/NotificationBadge.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Button with badge</H2>
<CodeWrapper>
  <ExampleComponents.ButtonWithBadge />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/ButtonWithBadge.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Badge with icon only</H2>
<CodeWrapper>
  <ExampleComponents.BadgeWithIconOnly />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/BadgeWithIconOnly.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Opening badge</H2>
<CodeWrapper>
  <ExampleComponents.OpeningBadge />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/OpeningBadge.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Dynamic color</H2>
<CodeWrapper>
  <ExampleComponents.DynamicColor />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/DynamicColor.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Component data</H2>
<CompoAttributesViewer {dirName} />
