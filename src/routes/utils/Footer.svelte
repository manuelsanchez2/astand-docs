<script lang="ts">
  import { Footer, FooterBrand, FooterLi, FooterUl } from "$lib";
</script>

<Footer class="rounded-none border-t border-gray-200 shadow-none dark:border-gray-600 dark:bg-gray-950" footerType="logo">
  <div class="max-w-screen-xlsm:flex ml-auto w-full sm:items-center sm:justify-between">
    <FooterUl class="mt-3 flex w-full flex-wrap items-center justify-end text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
      <!-- <FooterLi href="https://github.com/shinokada/svelte-5-ui-lib">Repo</FooterLi> -->
      <FooterLi href="/pages/installation">Installation</FooterLi>
    </FooterUl>
  </div>
</Footer>
