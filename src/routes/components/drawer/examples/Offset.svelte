<script lang="ts">
  import { Button, Drawer, Drawerhead, uiHelpers } from "$lib";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
  const drawerBackdrop = uiHelpers();
  let drawerStatusBackdrop = $state(false);
  const closeDrawerBackdrop = drawerBackdrop.close;

  $effect(() => {
    drawerStatusBackdrop = drawerBackdrop.isOpen;
  });
  let offsetClass = $state("");
  const changeClass = () => {
    offsetClass = offsetClass === "" ? "top-16 h-screen start-0" : "";
  };
</script>

<div class="mb-4 text-center">
  <Button onclick={drawerBackdrop.toggle}>Show drawer</Button>
</div>
<Drawer class={offsetClass} drawerStatus={drawerStatusBackdrop} closeDrawer={closeDrawerBackdrop}>
  <Drawerhead onclick={closeDrawerBackdrop} class="mb-4">
    <h5 id="drawer-label" class="inline-flex items-center text-xl font-semibold text-gray-500 dark:text-gray-400">
      <InfoCircleSolid class="me-2.5 h-5 w-5" />Drawer
    </h5>
  </Drawerhead>
  <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
    Offset: {offsetClass ? offsetClass : "none"}
  </p>
</Drawer>
<div class="flex justify-center gap-2">
  <Button color="green" onclick={changeClass}>{offsetClass ? "Remove offset" : "Add offset"}</Button>
</div>
