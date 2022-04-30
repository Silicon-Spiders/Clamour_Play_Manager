<script>
  import Drawer, { AppContent, Content, Header, Title, Subtitle } from "@smui/drawer";
  import TopAppBar, { Row, Section } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  import List, { Item, Text, Graphic, Separator, Subheader } from "@smui/list";

  import "$lib/portal-styles.scss";
  import { pageTitle } from "$lib/stores";
  import AppToolbar from "$lib/components/AppToolbar.svelte";
  import { onMount } from "svelte";
  import { updatePlays } from "$lib/api-functions/admin";
  import "$lib/global.scss";
  import Alert from "$lib/components/Alert.svelte";

  function getCookie(cname) {
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
  }

  async function clearCookies() {
    let logout = await fetch("/api/logout", {
      method: "POST",
    });
    location.reload();
  }
  let user = '';

  onMount(async () => {
    user = getCookie("user");
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
      <Item >
        <Graphic class="material-icons">person</Graphic>
        <Text>Welcome {user}! </Text>
      </Item>
      <Separator />
      <Item href="/portal/evaluator/main" on:click={() => (open = false)}>
        <Graphic class="material-icons">done</Graphic>
        <Text>Evaluations Completed</Text>
      </Item>
      <Item href="/portal/evaluator/assigned-plays-new" on:click={() => (open = false)}>
        <Graphic class="material-icons">source</Graphic>
        <Text>View Assigned Plays</Text>
      </Item>
      <Item href="/portal/evaluator/view-past-plays" on:click={() => (open = false)}>
        <Graphic class="material-icons">preview</Graphic>
        <Text>View Past Assigned Plays</Text>
      </Item>
      

      <Separator />
     
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