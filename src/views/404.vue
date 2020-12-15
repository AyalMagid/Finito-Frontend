<template>
  <div>
    <div class="not-found-container">
      <h1>404</h1>
      <p>
        You seem to be lost like our friend tasky here who wandered away from
        his board
      </p>
      <img src="../assets/images/lost.png" alt />
      <button @click="$router.push('/home')" class="btn-primary">Take me back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "notfound",
};
</script>

<style lang="scss">
.not-found-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 80px;
    font-weight: 700;
  }
  img {
    width: 300px;
  }
  p {
    text-align: center;
    max-width: 40ch;
  }
}
</style>
