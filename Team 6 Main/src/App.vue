<template>
  <div id="app">
      <Header></Header> 
      <Leaderboard></Leaderboard>
      <Counter></Counter>
      <Reminder></Reminder> 
      <Chat> </Chat>


 </div> 
</template>

<script>

import Header from './components/Header.vue';
import Chat from './components/Chat.vue';
import Reminder from './components/Reminder.vue';
import Counter from './components/Counter.vue';
import Leaderboard from './components/Leaderboard.vue';



export default {
  name: 'App',
  components: {
    Header,
    Chat,
    Reminder,
    Counter,
    Leaderboard,
    
  },

  data() {
    return{
   
    };
  
  }
};
</script>



<style scoped>

</style>
