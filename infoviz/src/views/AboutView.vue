<template>
  <div class="horizontal_flex">
    <h1>team</h1>
    <div class="role">
      Frontend <br />
      <br />
      <br />
      <br />
      Backend
    </div>
    <div class="names">
      Markus Stanzl <br />
      Isabel Wanderwitz <br />
      Quirin Müller <br />
      <br />
      Leonard Ganz <br />
      Robin Löbbert <br />
    </div>
    <div class="subjects">
      Medieninformatik<br />
      Medieninformatik<br />
      Medieninformatik<br />
      <br />
      Informatik <br />
      Computerlinguistik<br />
    </div>
  </div>
</template>

<style>
h1 {
  font-size: 28px;
  position: fixed;
  left: 100px;
  top: 10px;
}

.role {
  position: fixed;
  left: 10px;
  top: 70px;
  width: 200px;
}

.names {
  position: fixed;
  left: 100px;
  top: 70px;
  width: 200px;
}

.subjects {
  position: fixed;
  left: 260px;
  top: 70px;
}
.horizontal_flex {
  display: flex;
}
</style>
