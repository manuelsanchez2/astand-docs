<script lang="ts">
  import { P } from "$lib";
  import Divider from "../../components/aa/Divider.svelte";
  import ContentSeparator from "../../components/sidebar/examples/ContentSeparator.svelte";
  // import { removeHyphensAndCapitalize } from "../../utils/helpers";
  import H1 from "../../utils/H1.svelte";
  // import HighlightCompo from "../../utils/HighlightCompo.svelte";
  import HighlightCompo from "../../utils/HighlightCompo.svelte";

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
  <H1>Installation</H1>

  <P>This works straightforward by doing:</P>

  <HighlightCompo class="mb-8" codeLang="js" code={modules["../../md/install-astand.md"] as string} />

  <P>
    Or if you prefer: <code>yarn add astand</code>
    ,
    <code>pnpm add astand</code>
    or
    <code>bun add astand</code>
  </P>

  <Divider />

  <div class="my-8 flex flex-wrap gap-2">
    <a class="inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus-within:ring-primary-800 dark:hover:bg-primary-700" href="/pages/svelte-vs-astand-way">Next section: Svelte vs Astand way</a>
  </div>
</div>
