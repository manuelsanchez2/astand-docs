<script lang="ts">
  import { Card, card, Button, Toggle, Label, Radio, uiHelpers, type RadioColorType, type CardProps, type ImgType } from "$lib";
  import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import DynamicCodeBlockHighlight from "../../utils/DynamicCodeBlockHighlight.svelte";
  import CodeWrapper from "../../utils/CodeWrapper.svelte";
  import H1 from "../../utils/H1.svelte";
  import H2 from "../../utils/H2.svelte";
  import { isGeneratedCodeOverflow } from "../../utils/helpers";
  // for Props table
  import CompoAttributesViewer from "../../utils/CompoAttributesViewer.svelte";
  const dirName = "card";

  let reverse = $state(false);
  // for examples section that dynamically changes the svelte component and svelteCode content
  import * as ExampleComponents from "./examples";
  const exampleModules = import.meta.glob("./examples/*.svelte", {
    query: "?raw",
    import: "default",
    eager: true
  }) as Record<string, string>;

  const sizes = Object.keys(card.variants.size);
  let cardSize: CardProps["size"] = $state("sm");
  const colors = Object.keys(card.variants.color);
  let color: CardProps["color"] = $state("gray");
  const paddings = Object.keys(card.variants.padding);
  let cardPadding: CardProps["padding"] = $state("lg");
  const shadows = Object.keys(card.variants.shadow);
  let cardShadow: CardProps["shadow"] = $state("md");
  let horizontal = $state(false);
  const changeImgLayout = () => {
    horizontal = !horizontal;
  };
  let link = $state("");
  const changeLink = () => {
    link = link === "" ? "/" : "";
  };
  let cardClass: CardProps["class"] = $state("");
  const changeClass = () => {
    cardClass = cardClass === "" ? "pl-10" : "";
  };
  let cardImage = $state<ImgType | undefined>(undefined);
  const changeImage = () => {
    cardImage = !cardImage
      ? {
          src: "/images/image-1.webp",
          alt: "my image"
        }
      : undefined;
  };

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      if (cardSize !== "sm") props.push(` size="${cardSize}"`);
      if (color !== "gray") props.push(` color="${color}"`);
      if (cardShadow !== "md") props.push(` shadow="${cardShadow}"`);
      if (cardClass) props.push(` class="${cardClass}"`);
      if (cardPadding !== "lg") props.push(` padding="${cardPadding}"`);
      if (link) props.push(` href="${link}"`);
      if (horizontal) props.push(` horizontal`);
      if (reverse) props.push(` reverse`);
      if (cardImage && typeof cardImage === "object") {
        const imgString = Object.entries(cardImage)
          .map(([key, value]) => `${key}:"${value}"`)
          .join(",");
        props.push(` img={{${imgString}}}`);
      }

      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join("") + "\n" : "";

      return `<Card${propsString}>My Card</Card>`;
    })()
  );
  // for interactive builder
  let builder = uiHelpers();
  let builderExpand = $state(false);
  let showBuilderExpandButton = $derived(isGeneratedCodeOverflow(generatedCode));
  const handleBuilderExpandClick = () => {
    builderExpand = !builderExpand;
  };

  // end of DynamicCodeBlock setup
  $effect(() => {
    builderExpand = builder.isOpen;
  });

  // helper function
  const hasImageContent = (img: ImgType | undefined): boolean => {
    return !!img && !!img.src;
  };
</script>

<H1>Cards</H1>

<H2>Setup</H2>
<HighlightCompo code={exampleModules[`./examples/Setup.svelte`] as string} />

<H2>Interactive Card Builder</H2>
<CodeWrapper>
  <div class="flex justify-center">
    <Card size={cardSize} {color} padding={cardPadding} shadow={cardShadow} href={link ? link : ""} class={cardClass} img={cardImage} {horizontal} {reverse}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions</h5>
      <p class="font-normal leading-tight text-gray-700 dark:text-gray-300">Here are the biggest enterprise technology acquisitions of so far, in reverse chronological order.</p>
    </Card>
  </div>
  <div class="my-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Size</Label>
    {#each sizes as size}
      <Radio labelClass="w-16 my-1" name="interactive_card_size" bind:group={cardSize} value={size}>{size}</Radio>
    {/each}
  </div>
  <div class="flex flex-wrap space-x-2">
    <Label class="mb-4 w-full font-bold">Color</Label>
    {#each colors as colorOption}
      <Radio labelClass="w-24 my-1" name="alert_reactive" bind:group={color} color={colorOption as RadioColorType} value={colorOption}>{colorOption}</Radio>
    {/each}
  </div>
  <div class="my-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Padding</Label>
    {#each paddings as padding}
      <Radio labelClass="w-16 my-1" name="interactive_card_padding" bind:group={cardPadding} value={padding}>{padding}</Radio>
    {/each}
  </div>
  <div class="my-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Shadow</Label>
    {#each shadows as shadow}
      <Radio labelClass="w-16 my-1" name="interactive_card_shadow" bind:group={cardShadow} value={shadow}>{shadow}</Radio>
    {/each}
  </div>
  <div class="flex flex-wrap justify-center gap-2 md:justify-start">
    <Button class="w-40" color="sky" onclick={changeLink}>{link === "" ? "Add link" : "Remove link"}</Button>
    <Button class="w-40" color="green" onclick={changeClass}>{cardClass ? "Remove class" : "Add class"}</Button>

    <Button class="w-40" color="blue" onclick={changeImage}>
      {hasImageContent(cardImage) ? "Remove image" : "Add image"}
    </Button>

    <Button disabled={!hasImageContent(cardImage)} class="w-40" color="violet" onclick={changeImgLayout}>
      {horizontal ? "Vertical" : "Horizontal"}
    </Button>

    <Toggle bind:checked={reverse} labelClass="italic dark:text-gray-500 {!hasImageContent(cardImage) ? 'opacity-50 cursor-not-allowed' : ''}" disabled={!hasImageContent(cardImage)}>
      Reverse: {reverse}
    </Toggle>
  </div>
  {#snippet codeblock()}
    <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
  {/snippet}
</CodeWrapper>

<H2>Custom size</H2>
<CodeWrapper>
  <ExampleComponents.CustomSize />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/CustomSize.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Call to action card</H2>
<CodeWrapper>
  <ExampleComponents.CallToActionCard />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/CallToActionCard.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Card with action button</H2>
<CodeWrapper>
  <ExampleComponents.CardWithActionButton />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/CardWithActionButton.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Component data</H2>
<CompoAttributesViewer {dirName} />
