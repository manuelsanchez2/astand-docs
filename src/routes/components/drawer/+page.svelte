<script lang="ts">
  import { Drawer, Drawerhead, Button, uiHelpers, Label, Radio, type DrawerProps } from "$lib";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  import { blur, fly, slide, scale, fade } from "svelte/transition";
  import type { FlyParams, BlurParams, SlideParams, ScaleParams } from "svelte/transition";
  import { linear, sineIn } from "svelte/easing";
  import DynamicCodeBlockHighlight from "../../utils/DynamicCodeBlockHighlight.svelte";
  import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import CodeWrapper from "../../utils/CodeWrapper.svelte";
  import H1 from "../../utils/H1.svelte";
  import H2 from "../../utils/H2.svelte";
  import { isGeneratedCodeOverflow } from "../../utils/helpers";
  // for Props table
  import CompoAttributesViewer from "../../utils/CompoAttributesViewer.svelte";
  const dirName = "drawer";

  // for examples section that dynamically changes the svelte component and svelteCode content
  import * as ExampleComponents from "./examples";
  const exampleModules = import.meta.glob("./examples/*.svelte", {
    query: "?raw",
    import: "default",
    eager: true
  }) as Record<string, string>;

  const drawerTransition = uiHelpers();
  let drawerStatusTransition = $state(false);
  const closeDrawerTransition = drawerTransition.close;

  $effect(() => {
    drawerStatusTransition = drawerTransition.isOpen;
  });

  // transition
  type TransitionOption = {
    name: string;
    transition: typeof fly | typeof blur | typeof slide | typeof scale;
    params: FlyParams | BlurParams | SlideParams | ScaleParams;
    // color: Drawer['color'];
  };

  const transitions: TransitionOption[] = [
    { name: "Fly", transition: fly, params: { duration: 300, easing: linear, x: -150 } },
    { name: "Blur", transition: blur, params: { duration: 400, easing: sineIn } },
    { name: "Slide", transition: slide, params: { duration: 200, easing: linear } },
    { name: "Scale", transition: scale, params: { duration: 300, easing: sineIn } },
    { name: "Fade", transition: fade, params: { duration: 400, easing: linear } }
  ];

  let selectedTransition = $state("Fly");
  let currentTransition = $derived(transitions.find((t) => t.name === selectedTransition) || transitions[0]);

  const placements = [
    { name: "Left", placement: "left", params: { x: -320, duration: 300, easing: sineIn }, width: "default" },
    { name: "Top", placement: "top", params: { y: -320, duration: 300, easing: sineIn }, width: "full" },
    { name: "Right", placement: "right", params: { x: 320, duration: 300, easing: sineIn }, width: "default" },
    { name: "Bottom", placement: "bottom", params: { y: 320, duration: 300, easing: sineIn }, width: "full" }
  ];

  let selectedPlacement = $state("Left");
  let currentPlacement = $derived(placements.find((p) => p.name === selectedPlacement) || placements[0]);

  // backdrop
  let backdropStatus = $state(true);
  const changeBackdropStatus = () => {
    backdropStatus = !backdropStatus;
  };
  // outsideclick
  let outsideclickStatus = $state(true);
  const changeOutsideclickStatus = () => {
    outsideclickStatus = !outsideclickStatus;
  };

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      if (!backdropStatus) props.push(" backdrop={false}");
      if (!outsideclickStatus) props.push(" activateClickOutside={false}");
      if (currentPlacement.width !== "default") props.push(` width="${currentPlacement.width}"`);
      if (currentTransition !== transitions[0]) {
        props.push(` transition={${currentTransition.transition.name}}`);

        // Generate params string without quotes and handle functions
        let paramValues = currentPlacement.placement === "left" ? currentTransition.params : currentPlacement.params;
        const paramsString = Object.entries(paramValues)
          .map(([key, value]) => {
            if (typeof value === "function") {
              return `${key}:${value.name}`;
            }
            return `${key}:${value}`;
          })
          .join(",");
        props.push(` params={{${paramsString}}}`);
      }
      // placement
      if (currentPlacement !== placements[0]) {
        props.push(` placement="${currentPlacement.placement}"`);
      }

      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join("") + "\n" : "";

      return `<Button onclick={drawer.toggle}>Drawer</Button>
<Drawer drawerStatus={drawerStatus} closeDrawer={closeDrawer}${propsString}>
  <Drawerhead onclick={closeDrawer} class="mb-4>
    <h5 id="drawer-label" class="inline-flex items-center text-xl font-semibold text-gray-500 dark:text-gray-400">
        <InfoCircleSolid class="me-2.5 h-5 w-5" />${selectedTransition} drawer
      </h5>
  </Drawerhead>
    My Drawer
</Drawer>`;
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

<H1>Drawer</H1>

<H2>Setup</H2>
<HighlightCompo code={exampleModules[`./examples/Setup.svelte`] as string} />

<H2>Interactive Drawer Builder</H2>
<CodeWrapper>
  <div class="text-center">
    <Button onclick={drawerTransition.toggle}>Drawer</Button>
  </div>
  <Drawer drawerStatus={drawerStatusTransition} closeDrawer={closeDrawerTransition} transition={currentTransition.transition} placement={currentPlacement.placement as DrawerProps["placement"]} width={currentPlacement.width as DrawerProps["width"]} params={currentPlacement.placement === "left" ? currentTransition.params : currentPlacement.params} backdrop={backdropStatus} activateClickOutside={outsideclickStatus}>
    <Drawerhead onclick={closeDrawerTransition} class="mb-4">
      <h5 id="drawer-label" class="inline-flex items-center text-xl font-semibold text-gray-500 dark:text-gray-400">
        <InfoCircleSolid class="me-2.5 h-5 w-5" />{selectedTransition} drawer
      </h5>
    </Drawerhead>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">Content</p>
    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Backdrop: {backdropStatus ? "true" : "false"}
      <br />
      Outsideclick: {outsideclickStatus ? "true" : "false"}
    </p>
  </Drawer>
  <div class="mb-4 flex flex-wrap space-x-2">
    <Label class="mb-4 w-full font-bold">Transition</Label>
    {#each transitions as transition}
      <Radio labelClass="w-16 my-1" name="interactive_transition" bind:group={selectedTransition} value={transition.name}>{transition.name}</Radio>
    {/each}
  </div>
  <div class="mb-4 flex flex-wrap space-x-2">
    <Label class="mb-4 w-full font-bold">Placement</Label>
    {#each placements as placement}
      <Radio labelClass="w-16 my-1" name="interactive_placement" bind:group={selectedPlacement} value={placement.name}>{placement.name}</Radio>
    {/each}
  </div>
  <div class="flex flex-wrap justify-center gap-2 md:justify-start">
    <Button class="w-48" color="primary" onclick={changeBackdropStatus}>{backdropStatus ? "Hide backdrop" : "Show backdrop"}</Button>
    <Button class="w-48" color="secondary" onclick={changeOutsideclickStatus}>{outsideclickStatus ? "Disable outsideclick" : "Enable outsideclick"}</Button>
  </div>
  {#snippet codeblock()}
    <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
  {/snippet}
</CodeWrapper>

<H2>Form elements</H2>
<CodeWrapper>
  <ExampleComponents.FormElements />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/FormElements.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Contact form</H2>
<CodeWrapper>
  <ExampleComponents.ContactForm />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/ContactForm.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Drawer navigation</H2>
<CodeWrapper>
  <ExampleComponents.DrawerNavigation />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/DrawerNavigation.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Offset</H2>
<CodeWrapper>
  <ExampleComponents.Offset />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/Offset.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Onmouseenter</H2>
<CodeWrapper>
  <ExampleComponents.Onmouseenter />
  {#snippet codeblock()}
    <HighlightCompo codeLang="ts" code={exampleModules["./examples/Onmouseenter.svelte"] as string} />
  {/snippet}
</CodeWrapper>

<H2>Component data</H2>
<CompoAttributesViewer {dirName} />
