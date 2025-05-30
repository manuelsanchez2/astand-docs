<script lang="ts">
  import { RunesMetaTags, deepMerge } from "runes-meta-tags";
  import { AstandDebug } from "astand";
  import { counterStore } from "../counterStore.svelte";
  import { page } from "$app/stores";
  import "../app.pcss";
  import Footer from "./utils/Footer.svelte";
  import { Navbar, NavLi, NavBrand, NavUl, uiHelpers, Darkmode, Sidebar, SidebarGroup, SidebarItem, SidebarDropdownWrapper } from "$lib";
  import GitHub from "./utils/GitHub.svelte";
  import DynamicCodeBlockStyle from "./utils/DynamicCodeBlockStyle.svelte";
  import { counterState } from "../counter.svelte";

  const sidebarUi = uiHelpers();
  let isOpen = $state(false);
  const closeSidebar = sidebarUi.close;
  let nav = uiHelpers();
  let navStatus = $state(false);
  let toggleNav = nav.toggle;
  let closeNav = nav.close;
  let activeUrl = $state($page.url.pathname);
  const hasPath = (key: string) => activeUrl.includes(key);
  let pageStatus = $derived(hasPath("pages"));
  // let componentStatus = $derived(hasPath("components"));

  $effect(() => {
    navStatus = nav.isOpen;
    activeUrl = $page.url.pathname;
    isOpen = sidebarUi.isOpen;
    // pageStatus = hasPath("pages");
    // componentStatus = hasPath("components");
  });

  let navClass = "w-full divide-gray-200 border-gray-200 bg-gray-50 dark_bg_theme text-gray-500 dark:divide-gray-700 dark:border-gray-700 dark:transparent dark:text-gray-400 sm:px-4 flex h-full";
  let { children, data } = $props();

  // meta tags
  let metaTags = $state($page.data.pageMetaTags ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags) : data.layoutMetaTags);

  $effect(() => {
    metaTags = $page.data.pageMetaTags ? deepMerge($page.data.layoutMetaTags, $page.data.pageMetaTags) : data.layoutMetaTags;
    activeUrl = $page.url.pathname;
    $inspect("activeUrl in layout: ", activeUrl);
  });
</script>

<RunesMetaTags {...metaTags} />
<DynamicCodeBlockStyle />

<header class="sticky top-0 z-50 mx-auto h-[61px] w-full flex-none border-b border-gray-200 bg-gray-50 lg:fixed dark:border-gray-600 dark:bg-gray-950">
  <Navbar {navClass} {toggleNav} {closeNav} {navStatus} fluid div2Class="ml-auto w-full">
    {#snippet brand()}
      <button onclick={sidebarUi.toggle} type="button" class="z-50 mr-4 mt-1 lg:hidden" aria-controls="sidebar" aria-expanded={isOpen}>
        <span class="sr-only">Toggle sidebar menu</span>
        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <NavBrand siteName="Astand" spanClass="text-xl sm:text-3xl">
        <img width="30" src="/images/astand-icon.png" class="h-6 w-5 sm:h-10 sm:w-8" alt="astand icon" />
      </NavBrand>

      <div class="ml-auto flex items-center space-x-2 md:order-1 md:flex">
        <a class="inline-block whitespace-normal rounded-lg p-1 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-400 dark:hover:bg-gray-600 dark:hover:text-white" href="https://github.com/manuelsanchez2/astand-docs" aria-label="View project on GitHub">
          <GitHub class="hidden sm:block" tabindex={0} />
        </a>
        <Darkmode class="hidden sm:block" />
      </div>
    {/snippet}
    <NavUl class="md:space-x-6 lg:space-x-8" {activeUrl}>
      <!-- <NavLi href="/pages/coverage">Coverage</NavLi> -->
      <!-- <NavLi href="/pages/about">About</NavLi> -->
      <NavLi href="/pages/installation">Getting Started</NavLi>
      <NavLi class="sm:hidden" href="https://github.com/manuelsanchez2/astand-docs">Repo</NavLi>
    </NavUl>
    <div class="mt-4 flex justify-end space-x-4 sm:hidden"><Darkmode class="sm:hidden" /></div>
  </Navbar>
</header>
<div class="lg:flex" id="sidebar">
  <Sidebar {activeUrl} isSingle {isOpen} {closeSidebar} breakpoint="lg" activeClass="flex items-center p-1 text-base font-normal text-white dark:hover:text-white hover:text-gray-900 bg-primary-700 dark:bg-primary-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" nonActiveClass="p-1 hover:bg-gray-200" divClass="dark:bg-gray-900 bg-gray-50 dark:border-gray-700 border-r border-gray-200" class="top-[62px] h-screen dark:bg-gray-900">
    <SidebarGroup class="flex flex-col gap-4 pt-8">
      <SidebarDropdownWrapper label="First steps" isOpen={true} svgClass="me-4" btnClass="p-1 border">
        <!-- <SidebarItem label="About" href="/pages/about" /> -->
        <!-- <SidebarItem label="Coverage" href="/pages/coverage" /> -->
        <SidebarItem label="Installation" href="/pages/installation" />
        <SidebarItem label="Svelte vs Astand Way" href="/pages/svelte-vs-astand-way" />
      </SidebarDropdownWrapper>

      <SidebarDropdownWrapper label="Middlewares" isOpen={true} svgClass="me-4" btnClass="p-1 border">
        <SidebarItem label="Log" href="/pages/middlewares/log" />
        <SidebarItem label="Validation" href="/pages/middlewares/validation" />
      </SidebarDropdownWrapper>

      <SidebarDropdownWrapper label="Other Features" isOpen={true} svgClass="me-4" btnClass="p-1 border">
        <SidebarItem label="AstandDebug" href="/pages/features/astanddebug" />
      </SidebarDropdownWrapper>
      <!-- <SidebarDropdownWrapper label="Components" isOpen={componentStatus} svgClass="me-4" btnClass="p-1">
        <SidebarItem label="Accordion" href="/components/accordion" />
        <SidebarItem label="Alert" href="/components/alert" />
        <SidebarItem label="Avatar" href="/components/avatar" />
        <SidebarItem label="Badge" href="/components/badge" />
        <SidebarItem label="Banner" href="/components/banner" />
        <SidebarItem label="Bottom navigation" href="/components/bottom-navigation" />
        <SidebarItem label="Breadcrumb" href="/components/breadcrumb" />
        <SidebarItem label="Button" href="/components/button" />
        <SidebarItem label="Button group" href="/components/button-group" />
        <SidebarItem label="Card" href="/components/card" />
        <SidebarItem label="Carousel" href="/components/carousel" />
        <SidebarItem label="Darkmode" href="/components/darkmode" />
        <SidebarItem label="Device mockup" href="/components/device-mockup" />
        <SidebarItem label="Drawer" href="/components/drawer" />
        <SidebarItem label="Dropdown" href="/components/dropdown" />
        <SidebarItem label="Footer" href="/components/footer" />
        <SidebarItem label="Gallery" href="/components/gallery" />
        <SidebarItem label="Indicators" href="/components/indicators" />
        <SidebarItem label="Kbd" href="/components/kbd" />
        <SidebarItem label="List group" href="/components/list-group" />
        <SidebarItem label="Mega menu" href="/components/mega-menu" />
        <SidebarItem label="Modal" href="/components/modal" />
        <SidebarItem label="Navbar" href="/components/navbar" />
        <SidebarItem label="Pagination" href="/components/pagination" />
        <SidebarItem label="Popover" href="/components/popover" />
        <SidebarItem label="Progress" href="/components/progress" />
        <SidebarItem label="Rating" href="/components/rating" />
        <SidebarItem label="Sidebar" href="/components/sidebar" />
        <SidebarItem label="Skeleton" href="/components/skeleton" />
        <SidebarItem label="Speed dial" href="/components/speed-dial" />
        <SidebarItem label="Spinner" href="/components/spinner" />
        <SidebarItem label="Tab" href="/components/tabs" />
        <SidebarItem label="Table" href="/components/table" />
        <SidebarItem label="Timeline" href="/components/timeline" />
        <SidebarItem label="Toast" href="/components/toast" />
        <SidebarItem label="Tooltip" href="/components/tooltip" />
        <SidebarItem label="Video" href="/components/video" />
      </SidebarDropdownWrapper> -->
      <!-- <SidebarDropdownWrapper label="Forms" isOpen={hasPath("forms")} svgClass="me-4" btnClass="p-1">
        <SidebarItem label="Checkbox" href="/forms/checkbox" />
        <SidebarItem label="File input" href="/forms/file-input" />
        <SidebarItem label="Floating label" href="/forms/floating-label" />
        <SidebarItem label="Input field" href="/forms/input-field" />
        <SidebarItem label="Label" href="/forms/label" />
        <SidebarItem label="Radio" href="/forms/radio" />
        <SidebarItem label="Range" href="/forms/range" />
        <SidebarItem label="Search input" href="/forms/search-input" />
        <SidebarItem label="Select" href="/forms/select" />
        <SidebarItem label="Textarea" href="/forms/textarea" />
        <SidebarItem label="Toggle" href="/forms/toggle" />
      </SidebarDropdownWrapper> -->
      <!-- <SidebarDropdownWrapper label="Typography" isOpen={hasPath("typography")} svgClass="me-4" btnClass="p-1">
        <SidebarItem label="Blockquote" href="/typography/blockquote" />
        <SidebarItem label="Heading/Mark" href="/typography/heading" />
        <SidebarItem label="HR" href="/typography/hr" />
        <SidebarItem label="Image" href="/typography/image" />
        <SidebarItem label="Layout" href="/typography/layout" />
        <SidebarItem label="Link" href="/typography/link" />
        <SidebarItem label="List" href="/typography/list" />
        <SidebarItem label="Paragraph" href="/typography/paragraph" />
        <SidebarItem label="Span" href="/typography/span" />
      </SidebarDropdownWrapper> -->
      <!-- <SidebarDropdownWrapper label="Plugins" svgClass="me-4" btnClass="p-1">
        <SidebarItem label="Chart" href="/plugins/chart" />
      </SidebarDropdownWrapper> -->
    </SidebarGroup>
    <div class="mt-12">
      <Darkmode class="sm:hidden" />
    </div>
  </Sidebar>
  <main class="mx-auto min-w-0 max-w-7xl flex-auto px-8 pb-20 lg:static lg:max-h-full lg:overflow-visible lg:pl-72 lg:pt-20">
    <div id="mainContent">
      {@render children()}
    </div>
  </main>
</div>
<Footer />

<AstandDebug
  stores={[
    {
      name: "counterState",
      store: counterStore,
      actions: { increment: counterStore.increment, decrement: counterStore.decrement }
    }
  ]}
/>
