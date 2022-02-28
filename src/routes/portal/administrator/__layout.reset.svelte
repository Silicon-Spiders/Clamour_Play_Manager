<script>
  import Drawer, { AppContent, Content, Header, Title, Subtitle } from "@smui/drawer";
  import TopAppBar, { Row, Section } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";

  import "$lib/portal-styles.scss";
  import { pageTitle, plays } from "$lib/stores";
  import AppToolbar from "$lib/components/AppToolbar.svelte";
  import { onMount } from "svelte";
  import { getPlays } from "$lib/api-functions/admin";
  import "$lib/global.scss";

  function getCookie(cname) {
    onMount(() => {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    });
  }

  async function clearCookies() {
    let logout = await fetch("/api/logout", {
      method: "POST",
    });
    location.reload();
  }

  onMount(async () => {
    const playsData = await getPlays();
    $plays = playsData;
  });

  let open = false;
</script>

<svelte:head>
  <title>{$pageTitle}</title>
</svelte:head>

<Drawer class="nav" variant="modal" bind:open>
  <Header>
    <Title>Clamour Play Manager</Title>
    <Subtitle>by Silicon Spiders</Subtitle>
  </Header>
  <Content>
    <List>
      <Item href="/portal/administrator/view-plays" on:click={() => (open = false)}>
        <Graphic class="material-icons">source</Graphic>
        <Text>View Plays</Text>
      </Item>
      <Item href="/portal/administrator/assign-plays" on:click={() => (open = false)}>
        <Graphic class="material-icons">assignment</Graphic>
        <Text>Assign Plays</Text>
      </Item>
      <Item href="/portal/administrator/manage-evaluators" on:click={() => (open = false)}>
        <Graphic class="material-icons">manage_accounts</Graphic>
        <Text>Manage Evaluators</Text>
      </Item>
      <Separator />
      <Item href="/portal/administrator/admin-profile" on:click={() => (open = false)}>
        <Graphic class="material-icons">account_circle</Graphic>
        <Text>{getCookie("user")}</Text>
      </Item>
      <Item href="/portal/administrator/admin-profile" on:click={() => (open = false)}>
        <Graphic class="material-icons">settings</Graphic>
        <Text>Admin Dashboard</Text>
      </Item>
      <Item
        on:click={() => {
          open = false;
          clearCookies();
        }}
      >
        <Graphic class="material-icons">logout</Graphic>
        <Text>Logout</Text>
      </Item>
    </List>
  </Content>
</Drawer>

<AppContent>
  <TopAppBar variant="static">
    <Row>
      <Section style="flex-basis: content;">
        <IconButton on:click={() => (open = !open)} class="material-icons">menu</IconButton>
        <AppToolbar />
      </Section>
    </Row>
  </TopAppBar>
  <div class="content">
    <slot />
  </div>
</AppContent>

<style>
  .content {
    background-color: var(--secondary-color-light);
    padding: 2% 3% 0%;
    height: 100%;
  }
</style>
