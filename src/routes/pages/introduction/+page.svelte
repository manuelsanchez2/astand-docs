<script lang="ts">
  import { P, Li, List } from "$lib";
  //   import { removeHyphensAndCapitalize } from "../../utils/helpers";
  import H1 from "../../utils/H1.svelte";
  import H2 from "../../utils/H2.svelte";
  import H3 from "../../utils/H3.svelte";

  //   const name = __NAME__;
  //   const svelte5uilibVersion = __VERSION__;
  //   const svelteVersion = __SVELTEVERSION__;
  //   const svelteKitVersion = __SVELTEKITVERSION__;
  //   const viteVersion = __VITEVERSION__;
</script>

<div>
  <H1>Introduction to Astand 🚀</H1>

  <P>
    <strong>Astand</strong>
    is a lightweight, reactive state management library designed specifically for Svelte 5. It simplifies state handling by leveraging Svelte's powerful reactive primitives, known as "runes," to ensure fine-grained, efficient reactivity with minimal overhead.
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

  <a class="my-8 inline-flex items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white focus-within:outline-none focus-within:ring-4 focus-within:ring-primary-300 hover:bg-primary-800 dark:bg-primary-600 dark:focus-within:ring-primary-800 dark:hover:bg-primary-700" href="/pages/installation">Go to Installation</a>
</div>
