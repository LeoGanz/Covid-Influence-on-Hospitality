<template>
  <h1>About</h1>
  <p>
    This project was developed during for the course "Information Visualization" at the Ludwig-Maximilians-Universität München in the winter term 2022/2023.<br>
    Our team consists of the following members:
  </p>
  <VPTeamMembers size="medium" :members="members" />
<!--  <div class="horizontal_flex">-->
<!--    <h1>Team</h1>-->
<!--    <div class="role">-->
<!--      Frontend <br />-->
<!--      <br />-->
<!--      <br />-->
<!--      <br />-->
<!--      Backend-->
<!--    </div>-->
<!--    <div class="names">-->
<!--      Markus Stanzl <br />-->
<!--      Isabel Wanderwitz <br />-->
<!--      Quirin Müller <br />-->
<!--      <br />-->
<!--      Leonard Ganz <br />-->
<!--      Robin Löbbert <br />-->
<!--    </div>-->
<!--    <div class="subjects">-->
<!--      Medieninformatik<br />-->
<!--      Medieninformatik<br />-->
<!--      Medieninformatik<br />-->
<!--      <br />-->
<!--      Informatik <br />-->
<!--      Computerlinguistik<br />-->
<!--    </div>-->
<!--  </div>-->


</template>

<script>
import VPTeamMembers from "@/views/about/components-from-vitepress/VPTeamMembers.vue";

export default {
  name: "AboutView",
  components: {VPTeamMembers},
  data() {
    return {
      members: [
        {
          avatar: 'https://gitlab.lrz.de/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png',
          name: 'Markus Stanzl',
          title: 'Frontend',
          desc: 'Bar chart, Slider, General Styling, Research',
        },
        {
          avatar: 'https://gitlab.lrz.de/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png',
          name: 'Isabel Wanderwitz',
          title: 'Frontend',
          desc: 'Chloropleth Map: Hospitality & Incidence, Research',
        },
        {
          avatar: 'https://gitlab.lrz.de/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png',
          name: 'Quirin Müller',
          title: 'Frontend',
          desc: 'Bar chart, Slider, General Styling, Research',
          links: [
            {icon: 'linkedin', link: 'https://de.linkedin.com/in/quirin-müller-34131023b'},
          ]
        },
        {
          avatar: 'https://gitlab.lrz.de/assets/no_avatar-849f9c04a3a0d0cea2424ae97b27447dc64a7dbfae83c036c45b403392f0e8ba.png',
          name: 'Robin Löbbert',
          title: 'Frontend & Backend',
          desc: 'Line chart, Data acquisition & processing, State management, Research',
          links: [
            {icon: 'linkedin', link: 'https://de.linkedin.com/in/robinloebbert'},
          ]
        },
        {
          avatar: 'https://avatars.githubusercontent.com/u/16819813?v=4',
          name: 'Leonard Ganz',
          title: 'Mostly Backend',
          desc: 'Data acquisition & processing, State management, Some visual elements, About page, Research',
          links: [
            {icon: 'github', link: 'https://github.com/leoganz'},
          ]
        },
      ]
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 32px;
}
p {
  padding: 20px;
  text-align: center;
  font-size: 20px;
}
</style>
