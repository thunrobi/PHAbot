<template>
    <div class="reminder-module">
      
      <div v-if="!mealSelectionVisible && !resultVisible">
        <p>{{ currentQuestion }}</p>
        <button @click="handleUserResponse(true)">Yes</button>
        <button @click="handleUserResponse(false)">No</button>
      </div>
  
      <div v-if="mealSelectionVisible">
        <p>I am going to give you some mealsuggestions. Please choose a meal: </p>
        <button @click="selectMeal('breakfast')">Breakfast</button>
        <button @click="selectMeal('lunch')">Lunch</button>
        <button @click="selectMeal('dinner')">Dinner</button>
        <button @click="goBackToFirstQuestion">Back</button>
      </div>
  
      <div v-if="resultVisible">
        <p>{{ message }}</p>
        <button v-if="!userAte" @click="regenerateMeal">Regenerate</button>
        <button @click="goBackToFirstQuestion">Back</button>
      </div>
  
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        resultVisible: false,
        mealSelectionVisible: false,
        currentQuestion: "Have you eaten today?",
        message: "",
        selectedMeal: '',
        userAte: false,
        breakfastSuggestions: ["Oatmeal with fruits", "Eggs and toast", "Smoothie with spinach and banana"],
        lunchSuggestions: ["Grilled chicken salad", "Turkey sandwich", "Vegetable stir-fry"],
        dinnerSuggestions: ["Spaghetti with meatballs", "Grilled salmon with veggies", "Chicken curry with rice"],
      };
    },
    methods: {
      handleUserResponse(response) {
        this.userAte = response;
        if (response) {
          this.message = "Great! Keep up the good eating habits!";
          this.resultVisible = true;
        } else {
          this.mealSelectionVisible = true;
        }
      },
      selectMeal(meal) {
        this.selectedMeal = meal;
        this.generateMealSuggestion();
      },
      generateMealSuggestion() {
        const mealOptions = {
          breakfast: this.breakfastSuggestions,
          lunch: this.lunchSuggestions,
          dinner: this.dinnerSuggestions,
        };
        const suggestions = mealOptions[this.selectedMeal];
        this.message = suggestions[Math.floor(Math.random() * suggestions.length)];
        this.resultVisible = true;
        this.mealSelectionVisible = false;
      },
      regenerateMeal() {
        this.generateMealSuggestion();
      },
      goBackToFirstQuestion() {
        this.resultVisible = false;
        this.mealSelectionVisible = false;
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
  