<!-- RICARDO CARRASCO | USE CASE: VIEW PLAYS -->
<script>
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { page } from "$app/stores";
  import { plays, pageTitle } from "$lib/stores";
  import Icon from "$lib/components/Icon.svelte";
  import Button from "@smui/button";
  import Card, { Content } from "@smui/card";
  import Spinner from "$lib/components/Spinner.svelte";

  $pageTitle = "View Plays";

  let play = undefined;
  const { playID } = $page.params;
  $: play = $plays.find((play) => play.id == playID);

  let formDataBind = {
    title: "",
    actors_men: 0,
    actors_women: 0,
    actors_neutral: 0,
    actor_explain: "",
    synopsis: "",
    play_future: "",

    person_web: "",
    work_web: "",
    prof_intro: "",
    person_intro: "",
    fname: "",
    mname: "",
    lname: "",
    country: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    province: "",
    postal_code: "",
    phone: "",
    email: "",
    meet_pref: "",
    path: "",
    npx_profile: "",
  };
</script>

{#if play}
  <h1>{play?.title} by {play.authorName}</h1>
  <Card style="padding: 0px; background-color: var(--primary-color); color:white">
    <LayoutGrid>
      <Cell align="middle" span={3}>
        Rating: {play?.rating ? play.rating : "--"}/10
      </Cell>
      <Cell align="middle" span={3}>
        Tone: {play?.tone ? play.tone : "--"}
      </Cell>
      <Cell align="middle" span={3}>
        Actors Needed: {play?.actorCount ? play.actorCount : "--"}
      </Cell>
      <Cell align="middle" span={3}>
        <Button style="background-color: white;" variant="outlined">
          <!-- INSERT OPEN PDF HERE -->
          <Icon code="open_in_new" --icon-align="middle" --icon-size="1.5em" />
          View
        </Button>
      </Cell>
    </LayoutGrid>
  </Card>
  <!-- Play Info  -->
  <Card>
    <LayoutGrid style="margin: 0px; padding: 0px">
      <Cell span={12}>
        <h2>Play Information</h2>
        <hr />
      </Cell>
      <Cell span={7}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Play Synopsis</h3>
          </Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae reiciendis architecto debitis ab
            praesentium quo recusandae eveniet soluta dolore aliquid atque, vero dolor voluptatem doloremque
            officiis tempora laboriosam, nemo consequuntur.
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={5}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Characters</h3>
          </Cell>
          <Cell span={12}>-characters</Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={7}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Actor Count Explanation</h3>
          </Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae perferendis maxime aliquid
            alias fugit quaerat ipsa iste fugiat commodi. Est ipsum veritatis voluptatibus. Officiis
            recusandae assumenda quia. Itaque, qui ad.
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={5}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Actors needed</h3>
          </Cell>
          <Cell span={12}>
            <p>actors</p>
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={6}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Next Steps in Development</h3>
          </Cell>
          <Cell span={12}>
            {play.actexplain}
          </Cell>
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </Card>
  <!-- Personal Details -->
  <Card>
    <LayoutGrid style="margin: 0px; padding: 0px">
      <Cell span={12}>
        <h2>About {play.authorName}</h2>
        <hr />
      </Cell>
      <Cell span={6}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}><h3>Professional Introduction</h3></Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi atque porro aliquid eum nihil
            et quia, odio incidunt quos? Magnam nihil doloribus quod molestias, debitis numquam tenetur minima
            quia eaque! Doloribus sequi voluptate voluptas eos molestias, non enim voluptatibus laudantium
            vel! Voluptates unde id non similique ea harum, commodi, magnam repellendus laudantium et iure
            sunt nulla ducimus dolore, repellat error! Cum accusantium a deleniti perferendis laborum quidem
            fugit beatae ab veniam ipsam, fuga dolore? Amet ratione magni ut ex? Dolorem consequuntur eveniet
            tempore numquam, beatae odit corrupti? At, nihil sit?
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={6}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Personal Introduction</h3>
          </Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque ratione earum ipsam dolor
            nisi incidunt, necessitatibus pariatur harum reiciendis ut dolores fuga recusandae magnam ipsum
            minus eos quos soluta. Porro, blanditiis quos. Deleniti facilis quos quasi sapiente, repellat
            illum quibusdam sit facere beatae ad magnam aliquam impedit neque at minus eaque libero fugiat!
            At, voluptatum. Adipisci quod libero repellendus. Perferendis fugiat error eius recusandae dolores
            totam animi non rerum architecto autem? Nesciunt sed eligendi numquam cum cumque dolorum, et ipsum
            omnis dolorem at voluptatem perspiciatis modi molestias, ab illo.
          </Cell>
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </Card>
  <!-- Contact Info -->
  <Card>
    <LayoutGrid style="margin: 0px; padding: 0px">
      <Cell span={12}>
        <h2>Contact Information</h2>
        <hr />
      </Cell>
      <Cell span={4}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}><h3>Address</h3></Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi atque porro aliquid eum nihil
            et quia, odio incidunt quos? Magnam nihil doloribus quod molestias, debitis numquam tenetur minima
            quia eaque! Doloribus sequi voluptate voluptas eos molestias, non enim voluptatibus laudantium
            vel! Voluptates unde id non similique ea harum, commodi, magnam repellendus laudantium et iure
            sunt nulla ducimus dolore, repellat error! Cum accusantium a deleniti perferendis laborum quidem
            fugit beatae ab veniam ipsam, fuga dolore? Amet ratione magni ut ex? Dolorem consequuntur eveniet
            tempore numquam, beatae odit corrupti? At, nihil sit?
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={4}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Communication</h3>
          </Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque ratione earum ipsam dolor
            nisi incidunt, necessitatibus pariatur harum reiciendis ut dolores fuga recusandae magnam ipsum
            minus eos quos soluta. Porro, blanditiis quos. Deleniti facilis quos quasi sapiente, repellat
            illum quibusdam sit facere beatae ad magnam aliquam impedit neque at minus eaque libero fugiat!
            At, voluptatum. Adipisci quod libero repellendus. Perferendis fugiat error eius recusandae dolores
            totam animi non rerum architecto autem? Nesciunt sed eligendi numquam cum cumque dolorum, et ipsum
            omnis dolorem at voluptatem perspiciatis modi molestias, ab illo.
          </Cell>
        </LayoutGrid>
      </Cell>
      <Cell span={4}>
        <LayoutGrid class="sub-content-grid">
          <Cell span={12}>
            <h3>Web Links</h3>
          </Cell>
          <Cell span={12}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque ratione earum ipsam dolor
            nisi incidunt, necessitatibus pariatur harum reiciendis ut dolores fuga recusandae magnam ipsum
            minus eos quos soluta. Porro, blanditiis quos. Deleniti facilis quos quasi sapiente, repellat
            illum quibusdam sit facere beatae ad magnam aliquam impedit neque at minus eaque libero fugiat!
            At, voluptatum. Adipisci quod libero repellendus. Perferendis fugiat error eius recusandae dolores
            totam animi non rerum architecto autem? Nesciunt sed eligendi numquam cum cumque dolorum, et ipsum
            omnis dolorem at voluptatem perspiciatis modi molestias, ab illo.
          </Cell>
        </LayoutGrid>
      </Cell>
    </LayoutGrid>
  </Card>
{:else}
  <Spinner />
{/if}

<style lang="scss">
  :global(.sub-content-grid) {
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 0px;
    h3 {
      margin-bottom: 0px;
    }
  }
</style>
