 <!-- Som hjälp/stöd användes https://www.youtube.com/watch?v=IUK98wrWsto&t=105s-->
<template>
    <div class="content">
      <row class="d-flex overflow-auto">
        <v-col cols="12" sm="2" class="align-start">
          <v-sheet class="ma-2 pa-2">
            <v-btn icon :append-icon="msg.role === 'user' ? 'mdi-account' : ''"></v-btn>
          </v-sheet>
        </v-col>
        <v-col cols="12" sm="10" class="align-self-center">
          <v-sheet class="ma-2 pa-2">
            <pre v-html="msg.role === 'user' ? 'You: ' + msg.content : 'AI: ' + msg.content" class="preWrap"></pre>
          </v-sheet>
        </v-col>
      </row>
    </div>
  </template>
  
  <script>
  export default {
  props: ['msg'],
  setup(props) {
    const message = props.msg;
    return { message }
  },
  methods: {
    resetChat () {
      this.$emit('resetChat')

    }
  }
  }
  </script>
  
  <style scoped>
  .preWrap {
    white-space: pre-wrap;
    word-break: break-word;
    font-family: "Outfit",sans-serif;
    font-size: large;
  }
  </style>
  