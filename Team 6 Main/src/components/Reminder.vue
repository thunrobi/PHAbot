<template>
  <div id="container">
    <div class="dialog">
      <Dialog></Dialog>

      <Dialog v-if="resultVisible"></Dialog>
    </div>
    <div class="meal">
      <Mealsuggestion></Mealsuggestion>

      <Mealsuggestion v-if="resultVisible"></Mealsuggestion>
    </div>
  </div>
</template>
  
  
  <script>
  import Dialog from './Dialog.vue';
  import Mealsuggestion from './Mealsuggestion.vue';
  
  export default {
    components: {
      Dialog,
      Mealsuggestion
    },
    data() {
      return {
        dialogVisible: false, 
        currentQuestion: "Have you trained or kept yourself active today?", 
        resultVisible: false, 
        message: "", 
      };
    },
    methods: {
      handleUserResponse(response) {
        if (response) {
          this.message = "Good job! Keep up the same effort!";
        } else {
          this.message = "Take a break, your body is your temple! Physical activity is not only good for your health but also boosts productivity. 1. Stand up and stretch 2. Go for a walk 3. Work out at the gym after work 4. For more specific workout ideas, you can ask the AI Chat box.";
        }
        this.resultVisible = true;
      },
      closeResultDialog() {
        this.resultVisible = false;
      }
    }
  };
  </script>
  
  
  <style scoped>
  #container {
    display: flex;
    flex-direction: row; 
    width: 100%; 
  
  .dialog, .meal {
    flex: 1;
    margin: 10px;
  }
  
  .dialog {
    display: flex;
    justify-content: center; 
    align-items: center; 
    margin-left: 70px;
    
  }
  
  .meal {
    display: flex;
    justify-content: center;
    align-items: center;
    
    margin-right: 70px;
  }
}
  </style>