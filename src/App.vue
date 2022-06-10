<template>
  <main class="d-flex justify-content-center align-items-center">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </main>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
main {
  background-color: #ffe766;
  min-height: 100vh;
}
h2 {
  font-family: "Comfortaa", cursive;
  font-weight: 700;
  font-size: 1.25rem;
  color: #282828;
  margin-bottom: 20px;
}

section {
  background: #fff;
  border-radius: 8px;
  padding: 30px 0 60px 60px;
  position: relative;
  margin-bottom: 30px;
}
input,
select {
  border: 1px solid #483698;
  border-radius: 4px;
}
input.error,
select.error {
  border-color: #dc3545;
}
input {
  width: 100%;
  display: block;
  margin-bottom: 20px;
  padding: 3px 10px;
  font-size: 1rem;
  font-family: "Open Sans", sans-serif;
  color: #282828;
}
input.small {
  width: 80%;
}
select {
  min-width: 150px;
}
label {
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: #282828;
}
.gap-1 {
  gap: 10px;
}
.gap-3 {
  gap: 30px;
}
.detail {
  width: 80%;
  height: 20px;
}
.blue {
  background: #483698;
}
.grey {
  background: #b9b9b9;
}
.detailText {
  font-size: 1rem;
  color: #483698;
  margin-bottom: 0;
  font-family: "Open Sans", sans-serif;
}
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter {
  transform: translate3d(0, -20px, 0);
}
.v-leave-to {
  transform: translate3d(0, 20px, 0);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
@media screen and (max-width: 768px) {
  img {
    display: none;
  }

  section {
    width: 100vw;
    max-width: 100%;
    border-radius: 20px 20px 0 0;
    margin-top: 100px;
    padding: 30px 10px 10px 10px;
    overflow: hidden;
  }
  .form-container {
    width: 100%;
  }
  select {
    width: 120px;
  }
}
</style>
