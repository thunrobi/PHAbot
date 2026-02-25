<template>
  <div class="reminder-module">
  
    <div v-if="!resultVisible">
      <p>{{ currentQuestion }}</p>
      <button @click="handleUserResponse(true)">Yes</button>
      <button @click="handleUserResponse(false)">No</button>
    </div>


    <div v-if="resultVisible">
      <p>{{ message }}</p>
      <button @click="closeResultDialog">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resultVisible: false,
      currentQuestion: "Have you trained or kept yourself active today?",
      message: "" 
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
.reminder-module {
  overflow-y: auto;
  font-family: "Outfit", sans-serif;
  display: flex;
  flex-direction: column;
  background-color: rgb(125, 157, 164);
  color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 0 auto;
  align-items: center; 
  justify-content: center; 
  text-align: center; 
  min-height: 300px; 
}

button {
  background-color: #1d72b8;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin: 5px;
  font-size: 1rem;
  font-family: "Outfit",sans-serif;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #145a86;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

</style>
