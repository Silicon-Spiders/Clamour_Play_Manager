<!-- RICARDO CARRASCO | USE CASE: VIEW PLAYS -->
<script>
  import { page } from "$app/stores";
  import Icon from "$lib/components/Icon.svelte";
  import Spinner from "$lib/components/Spinner.svelte";
  import { onMount } from "svelte";
  // console.log($page.params.playID);
  const playID = $page.params.playID;

  async function getData() {
    const res = await fetch("../../server/admin/plays.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const plays = await res.json();
    if (res.ok) {
      return plays;
    } else {
      console.error("Something went wrong with (get) plays in admin/view-plays");
      return;
    }
  }
  let loading = true;
  let play = {
    id: 0,
    title: "",
    rating: 0,
    tone: "",
    actorCount: 5,
    pages: 38,
    authorName: "",
    authorGender: "",
    authorEthnicity: "",
    authorRegion: "",
  };
  onMount(async () => {
    let plays = [];
    const data = await getData();
    data.forEach((value) => {
      const {
        _id: id,
        title = "Unknown",
        rating = 0,
        tone = "Drama",
        actorCount = 0,
        length: pages = 0,
        authorName = "Unknown",
        authorGender = "Unknown",
        authorEthnicity = "Unknown",
        authorRegion = "Unknown",
      } = value;
      plays = [
        ...plays,
        {
          id,
          title,
          rating,
          tone,
          actorCount,
          pages,
          authorName,
          authorGender,
          authorEthnicity,
          authorRegion,
        },
      ];
    });
    play = plays.find((play) => play.id == playID);
    loading = false;
  });
</script>

{#if loading}
  <Spinner />
{:else}
  <h1>
    <a class="back-button" href="./view-plays"><Icon code="arrow_back" /></a>
    <span class="title"> <em>{play.title}</em>&nbsp;&nbsp;(Written by {play.authorName})</span>
  </h1>
  <div class="profile-bar">
    <div class="profile-bar--info">
      <div class="profile-bar--item">
        Rating: {play.rating ? play.rating : "--"}/10
        <Icon code="star" --icon-size="1.2em" />
      </div>
      <div class="profile-bar--item">
        Tone: {play.tone ? play.tone : "--"}
      </div>
      <div class="profile-bar--item">
        Actors Needed: {play.actorCount ? play.actorCount : "--"}
      </div>
    </div>
    <div class="profile-bar--buttons">
      <a class="profile-bar--item" href="../../../test.pdf" target="_blank">
        <!-- INSERT OPEN PDF HERE -->
        <!-- INSERT OPEN PDF HERE -->
        <!-- INSERT OPEN PDF HERE -->
        <!-- INSERT OPEN PDF HERE -->
        <!-- INSERT OPEN PDF HERE -->
        <Icon code="open_in_new" --icon-align="middle" --icon-size="1.5em" />
        View
      </a>
    </div>
  </div>
  <div class="profile-content">
    <h2>Play Info</h2>
    <hr />
    <h3>Play Synopsis</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates consectetur consequuntur suscipit
      iste corporis, voluptatem ullam explicabo laborum illo culpa? Quaerat illum natus sequi quod, optio
      assumenda beatae amet soluta! Ducimus nostrum quia dolorem pariatur consequatur unde! Est, quis ea harum
      rem repudiandae nihil ipsum atque molestias maxime eius accusamus placeat vitae amet ut, error tenetur
      facere voluptas, iure cupiditate? Possimus nisi esse, facilis, corrupti eius mollitia repellat nihil
      recusandae non magni voluptas repudiandae eligendi voluptatem eos molestiae. Odio voluptates odit itaque
      iusto sequi earum eveniet quasi inventore ex? Voluptatibus?
    </p>
    <h3>Actor Count Explanation</h3>
    <p>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem sunt quod, impedit nostrum
      quibusdam itaque explicabo labore rerum doloribus aspernatur enim repellat harum deleniti, eius
      blanditiis qui ducimus consequuntur minus. Qui recusandae, expedita atque saepe ut dicta commodi
      sapiente nihil modi necessitatibus adipisci laborum, totam id, laudantium at quae doloribus incidunt
      facere quaerat neque culpa similique vitae? Aut, aperiam illum.
    </p>
    <h2>About the Author</h2>
    <hr />
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
  </div>
{/if}

<style lang="scss">
  /* ================= Header ================= */
  h1 {
    margin-top: 0px;
    display: flex;
    align-items: center;
  }
  .back-button {
    padding: 1%;
    border-radius: 10px;
    margin-right: 2%;
    background-color: white;
    cursor: pointer;
    transition: all 0.3s ease-out;
  }
  .back-button:hover {
    box-shadow: 0px 0px 5px grey;
  }

  /* ================= Bar ================= */
  .profile-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0px 2%;
    background-color: var(--primary-color);
    height: 10%;
    border-radius: 15px;
    &--info {
      display: flex;
      flex-wrap: wrap;
      height: 70%;
      column-gap: 2%;
      flex: 2 2 auto;
    }
    &--buttons {
      display: flex;
      flex-wrap: wrap;
      height: 70%;
    }
    &--item {
      height: 100%;
      display: flex;
      align-items: center;
      align-self: center;
      border-radius: 10px;
      background-color: white;
      padding: 0px 20px;
    }
  }

  /* ================= Content ================= */
  .profile-content {
    overflow-y: scroll;
    height: 75%;
  }
</style>
