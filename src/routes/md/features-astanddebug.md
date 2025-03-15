import { AstandDebug } from "astand";
import { counterStore } from "../counterStore.svelte";

<AstandDebug
  stores={[
    {
      name: "counterState",
      store: counterStore,
      actions: { increment: counterStore.increment, decrement: counterStore.decrement }
    }
  ]}
/>