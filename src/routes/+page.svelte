<script lang="ts">
  import { P, A, List, Li } from "$lib";
  import Divider from "./components/aa/Divider.svelte";
  import H1 from "./utils/H1.svelte";
  import H2 from "./utils/H2.svelte";
  import H3 from "./utils/H3.svelte";
  const modules = import.meta.glob("./md/*.md", {
    query: "?raw",
    import: "default",
    eager: true
  });

  import { removeHyphensAndCapitalize } from "./utils/helpers";
  const name = __NAME__;
  const version = __VERSION__;
  const githuburl = __GITHUBURL__;
</script>

<!-- <H1><a class="text-primary-500 hover:underline" href={githuburl}>{removeHyphensAndCapitalize(name)}: v{version}</a></H1> -->
<H1>Astand</H1>

<P>
  We are trying to make it easier to manage global state in Svelte. We have created a library that enhances Svelte's reactive state management with additional capabilities. This library is called <strong>Astand</strong>
  .
</P>

<P>
  The word <em>ástand</em>
  in Icelandic translates to "state" in English, but it carries a deeper connotation beyond just a static condition. In Icelandic,
  <em>ástand</em>
  can refer to a situation, condition, or overall status—whether it's about a person's well-being, the state of affairs, or even the condition of an environment. So, in the realm of Svelte, ástand isn't just about holding data—it's about shaping and reacting to the ever-changing conditions of an app's state, just like how life and circumstances are always in flux.
</P>

<H2>Why Astand?</H2>

<P>Inspired by the simplicity of Zustand and deeply integrated with Svelte's reactive system, Astand offers developers an intuitive and highly performant approach to managing global or scoped state.</P>

<H3>Key highlights of Astand:</H3>

<List>
  <Li>
    <strong>Minimal Boilerplate:</strong>
    Quickly set up and manage state without extensive configuration.
  </Li>
  <Li>
    <strong>Middleware Support:</strong>
    Easily extend state stores with middleware for logging, debugging, validation, or other cross-cutting concerns.
  </Li>
  <Li>
    <strong>Full TypeScript Integration:</strong>
    Built with TypeScript-first principles, ensuring excellent type safety and developer experience out of the box.
  </Li>
  <Li>
    <strong>Native Svelte Compatibility:</strong>
    Directly implements Svelte's store contract (subscribe method), allowing seamless integration into Svelte applications without extra wrappers or adapters.
  </Li>
</List>

<P>Compared to native Svelte stores and alternative libraries, Astand provides an enhanced developer experience through built-in support for common tasks (such as state persistence and middleware), reducing complexity and streamlining your application's state management.</P>

<Divider />

<a class="my-8 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus-within:ring-primary-800 dark:hover:bg-primary-700" href="/pages/installation">Go to Installation</a>

<!-- 

<H2>Installation</H2>

<H3>Svelte 5 Runes</H3>
<P>Installing Svelte 5:</P>

<HighlightCompo class="mb-8" codeLang="js" code={modules["./md/install-svelte.md"] as string} />

<H3>Installing Svelte-5-Ui-Lib</H3>
<P>Install `svelte-5-ui-lib` and update dependencies:</P>

<HighlightCompo class="mb-8" codeLang="sh" code={modules["./md/svelte-5-ui-lib.md"] as string} />

<H3>Tailwind</H3>
<P>Add the following to tailwind.config.js:</P>

<H3>SVG Icons</H3>
<P>If you are using any icons from <A href="https://svelte-svg-icons.codewithshin.com/">Svelte SVG Icon Sets</A>, you need to update the content in tailwind.config.js. For example, if you are using Flowbite-Svelte-Icons and Svelte-Animated-Icons:</P>

<HighlightCompo class="mb-8" codeLang="js" code={modules["./md/svg-icons.md"] as string} />

<HighlightCompo class="mb-8" codeLang="json" code={modules["./md/tailwind-config.md"] as string} /> -->
