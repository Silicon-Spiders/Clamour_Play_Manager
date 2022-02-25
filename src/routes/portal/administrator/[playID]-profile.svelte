<!-- RICARDO CARRASCO | USE CASE: VIEW PLAYS -->
<script>
  import LayoutGrid, { Cell } from "@smui/layout-grid";
  import { page } from "$app/stores";
  import { plays, pageTitle } from "$lib/stores";
  import Icon from "$lib/components/Icon.svelte";
  import Button from "@smui/button";
  import Card, { Content } from "@smui/card";
  import Spinner from "$lib/components/Spinner.svelte";

  const playID = $page.params.playID;
  let play = undefined;
  $: {
    play = $plays.find((play) => play.id == playID);
    if (play) $pageTitle = `${play?.title} (Written by ${play?.authorName})`;
    console.log(play);
  }
</script>

{#if play}
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
  <Card>
    <h2>Play Info</h2>
    <h3>Play Synopsis</h3>
    <p>{play.synopsis}</p>
    <h3>Actor Count Explanation</h3>
    <p>{play.actexplain}</p>
  </Card>
  <Card>
    <h2>About the Author</h2>
    <h3>Professional Introduction</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi atque porro aliquid eum nihil et
      quia, odio incidunt quos? Magnam nihil doloribus quod molestias, debitis numquam tenetur minima quia
      eaque! Doloribus sequi voluptate voluptas eos molestias, non enim voluptatibus laudantium vel!
      Voluptates unde id non similique ea harum, commodi, magnam repellendus laudantium et iure sunt nulla
      ducimus dolore, repellat error! Cum accusantium a deleniti perferendis laborum quidem fugit beatae ab
      veniam ipsam, fuga dolore? Amet ratione magni ut ex? Dolorem consequuntur eveniet tempore numquam,
      beatae odit corrupti? At, nihil sit?
    </p>
    <h3>Personal Introduction</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam atque ratione earum ipsam dolor nisi
      incidunt, necessitatibus pariatur harum reiciendis ut dolores fuga recusandae magnam ipsum minus eos
      quos soluta. Porro, blanditiis quos. Deleniti facilis quos quasi sapiente, repellat illum quibusdam sit
      facere beatae ad magnam aliquam impedit neque at minus eaque libero fugiat! At, voluptatum. Adipisci
      quod libero repellendus. Perferendis fugiat error eius recusandae dolores totam animi non rerum
      architecto autem? Nesciunt sed eligendi numquam cum cumque dolorum, et ipsum omnis dolorem at voluptatem
      perspiciatis modi molestias, ab illo.
    </p>
  </Card>
{:else}
  <Spinner />
{/if}
