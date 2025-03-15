<script lang="ts">
  import { P } from "$lib";
  import Video from "$lib/video/Video.svelte";

  // import { removeHyphensAndCapitalize } from "../../utils/helpers";
  import H1 from "../../../utils/H1.svelte";
  import HighlightCompo from "../../../utils/HighlightCompo.svelte";

  //   import H2 from "../../utils/H2.svelte";

  const modules = import.meta.glob("../../../md/*.md", {
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
  <H1>Log Middleware</H1>

  <P>This middleware logs store state changes to the console. It is useful for debugging and tracking state changes over time.</P>

  <div class="mb-12 mt-4 w-full overflow-hidden rounded-xl md:h-auto">
    <Video src="/videos/svelte-middlewares-log.mov" controls autoplay muted />
  </div>

  <HighlightCompo expanded class="my-8" codeLang="js" code={modules["../../../md/astand-log-middleware.md"] as string} />
</div>
