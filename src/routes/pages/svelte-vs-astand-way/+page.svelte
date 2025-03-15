<script lang="ts">
  import { P } from "$lib";
  import Button from "$lib/buttons/Button.svelte";
  import Video from "$lib/video/Video.svelte";
  import { counterState, decrement, increment } from "../../../counter.svelte";
  import { counterStore } from "../../../counterStore.svelte";
  import Divider from "../../components/aa/Divider.svelte";
  // import { removeHyphensAndCapitalize } from "../../utils/helpers";
  import H1 from "../../utils/H1.svelte";
  // import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import Page from "../theme/+page.svelte";

  //   import H2 from "../../utils/H2.svelte";

  const modules = import.meta.glob("../../md/*.md", {
    query: "?raw",
    import: "default",
    eager: true
  });

  // console.log("these are the modules: ", modules);

  //   const name = __NAME__;
  //   const svelte5uilibVersion = __VERSION__;
  //   const svelteVersion = __SVELTEVERSION__;
  //   const svelteKitVersion = __SVELTEKITVERSION__;
  //   const viteVersion = __VITEVERSION__;
</script>

<div>
  <H1>Svelte vs Astand Way</H1>

  <P>
    Svelte 5 already provides an amazing way to manage global state. Let's imagine that we want to create the classic store for a counter. For example, you could simply place this inside a file called <code>counter.svelte.ts</code>
    .
  </P>

  <HighlightCompo expanded class="mb-8" codeLang="js" code={modules["../../md/svelte-stateway.md"] as string} />

  <P>You would have something like this:</P>

  <div class="my-6 flex items-center space-x-4">
    <small class="text-orange-500">Svelte way</small>
    <Button class="" onclick={() => increment()}>Increment</Button>
    <Button class="" onclick={() => decrement()}>Decrement</Button>
    <span>Number of clicks: {counterState.count}</span>
  </div>

  <P>This approach is amazing and easier than handling subscribe methods on your own with stores.</P>

  <P>
    The goal of <strong>Astand</strong>
    in all this is to go a step further and enhance Svelte's reactive state management with additional capabilities.
  </P>

  <P>Now, let's consider the same example using Astand, but this time with TypeScript.</P>

  <HighlightCompo expanded class="mb-8" codeLang="js" code={modules["../../md/astand-stateway.md"] as string} />

  <P>
    We are writing more code to achieve the very same thing. That might not sound very appealing, but did you notice the empty <code>options</code>
    object? That's where the magic of Astand comes into play. Here,
    <strong>we can add multiple middlewares, such as debugging or validation, and persist properties, like storing the state after an update in local or session storage.</strong>
    Look how simple it is:
  </P>

  <HighlightCompo expanded class="mb-8" codeLang="js" code={modules["../../md/astand-stateway-middlewares-persist.md"] as string} />

  <div class="my-6 flex items-center space-x-4">
    <small class="text-blue-500">Astand way</small>
    <Button class="bg-blue-500" onclick={() => counterStore.increment()}>Increment</Button>
    <Button class="bg-blue-500" onclick={() => counterStore.decrement()}>Decrement</Button>
    <span>Number of clicks: {$counterStore.count}</span>
  </div>

  <P>All these features are especially helpful when managing multiple stores with complex states simultaneously.</P>

  <P>See also how this state updates through the Debug Panel in the right bottom corner</P>

  <div class="my-4 w-full overflow-hidden rounded-xl md:h-auto">
    <Video src="/videos/svelte-middlewares.mov" controls autoplay muted />
  </div>

  <P>More middlewares are being added to the Astand ecosystem, so stay tuned!</P>

  <ul>
    <li>
      -
      <a class="text-orange-600" href="/pages/middlewares/log">Log Middleware</a>
    </li>
    <li>
      -
      <a class="text-orange-600" href="/pages/middlewares/validation">Validation Middleware</a>
    </li>
  </ul>

  <Divider />

  <a class="my-8 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus-within:ring-primary-800 dark:hover:bg-primary-700" href="/pages/installation">Go back to Installation</a>
</div>
