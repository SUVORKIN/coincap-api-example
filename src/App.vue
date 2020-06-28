<template>
  <div id="app">
    <v-app>
      <v-toolbar>
        <v-toolbar-title class="mr-3">coincap API Example</v-toolbar-title>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn to="/" flat>Exchanges</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <div>
          <v-layout
            v-if="message"
            class="my-3 px-3 message"
            width="200px"
            justify-space-between
            align-center
          >
            <v-flex>{{message}}</v-flex>
            <v-flex shrink>
              <v-btn @click="$store.dispatch('message', '')" small icon>
                <v-icon>close</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </div>
        <router-view />
      </v-container>
    </v-app>
  </div>
</template>

<script>
export default {
  computed: {
    message () {
      return this.$store.getters.message
    }
  }
}
</script>

<style>
.message {
  background-color: rgb(252, 146, 65);
  position: absolute;
  top: 10px;
  opacity: 0.9;
  border-radius: 4px;
  right: 10px;
  width: 300px;
  height: 100px;
  text-align: center;
  z-index: 999;
}
</style>
