<script lang="ts">
  import { Tabs, TabItem } from "$lib";
  import TableProp from "./TableProp.svelte";
  import TableDefaultRow from "./TableDefaultRow.svelte";
  import { ClipboardSolid } from "flowbite-svelte-icons";
  import { getFilteredFileNames, toKebabCase } from "./helpers";

  type TCompoData = {
    data: {
      default: {
        name?: string;
        props?: string[][];
        snippet?: string[][];
      };
    };
  };
  interface Props {
    dirName: string;
    components?: string;
  }
  let { dirName, components }: Props = $props();
  let compoData: TCompoData[] = $state([]);
  // default is find fileName using dirName
  const fileNames = getFilteredFileNames(toKebabCase(dirName));

  // console.log('dirName', dirName)
  // console.log("fileNames", fileNames);

  // if components are given (e.g. checkbox, etc in forms, typography, utils) use the components string
  let componentArray = components ? components.split(", ") : [];

  if (components) {
    // Split the components into an array
    componentArray = components.split(", ");
  }

  type ComponentData = {
    default: {
      name?: string;
      props?: string[][];
      events?: string[][];
      slots?: string[][];
      snippet?: string[][];
    };
  };

  // let importPromises: Promise<any>[] = [];
  let importPromises: Promise<{ data: ComponentData }>[] = [];

  async function processComponents() {
    if (componentArray.length > 0) {
      importPromises = componentArray.map(async (component) => {
        const module = await import(`../component-data/${component}.json`);
        return { data: module };
      });
    } else {
      importPromises = fileNames.map(async (component) => {
        const module = await import(`../component-data/${component}.json`);
        return { data: module };
      });
    }

    try {
      compoData = await Promise.all(importPromises);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  $effect(() => {
    processComponents().catch((error) => {
      console.error("Error outside of processComponents:", error);
    });
  });
</script>

{#if compoData}
  <div id="compoData">
    {#each compoData as compo}
      <h3 class="my-4 text-xl">{compo.data.default.name}</h3>
      <Tabs style="underline" class="list-none" contentClass="p-0 bg-white">
        {#if compo.data.default.props && compo.data.default.props.length > 0}
          <TabItem open>
            {#snippet titleSlot()}
              <div class="flex items-center gap-2 text-primary-900">
                <ClipboardSolid size="sm" />
                Props
              </div>
            {/snippet}
            <ul class="w-full">
              <TableProp>
                <TableDefaultRow items={compo.data.default.props} rowState="hover" />
              </TableProp>
            </ul>
          </TabItem>
        {/if}
      </Tabs>
    {/each}
  </div>
{/if}
