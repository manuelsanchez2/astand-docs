<script lang="ts">
  import { P } from "$lib";
  import Video from "$lib/video/Video.svelte";

  // import { removeHyphensAndCapitalize } from "../../utils/helpers";
  import H1 from "../../../utils/H1.svelte";
  import HighlightCompo from "../../../utils/HighlightCompo.svelte";

  const modules = import.meta.glob("../../../md/*.md", {
    query: "?raw",
    import: "default",
    eager: true
  });
</script>

<div>
  <H1>AstandDebug Panel</H1>

  <P>This panel allows you to get the current state of the different stores you have and even access the methods directly from there.</P>

  <div class="mb-12 mt-4 w-full overflow-hidden rounded-xl md:h-auto">
    <Video src="/videos/svelte-astanddebug.mov" controls autoplay muted />
  </div>

  <P>
    You can easily place it in a <code>+layout.svelte</code>
    file, for example.
  </P>

  <HighlightCompo expanded class="my-8" codeLang="js" code={modules["../../../md/features-astanddebug.md"] as string} />
</div>
