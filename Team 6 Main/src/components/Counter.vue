<template>
  <div class="counter-module">
    <div class="module-title">
      <h1>{{ selectedTitle }}</h1>
      <button class="settings-button" @click="toggleSettingsMenu">Settings</button>
    </div>

    <div class="employee-count">
      <p class="total-employees">Total Employees: {{ totalEmployees }}</p>

      <div v-if="showSettingsMenu" class="settings-dropdown">
        <label for="totalEmployees">Set Total Employees: </label>
        <input type="number" v-model="totalEmployees" min="1" />
       
        <label for="titleSelection">Change Title: </label>
        <select v-model="selectedTitle">
          <option value="Have you worked out today?">Have you worked out today?</option>
          <option value="Have you had enough to eat today?">Have you had enough to eat today?</option>
        </select>
      </div>
    </div>

    <p>Votes: {{ yesVotes + noVotes }} / {{ totalEmployees }}</p>
    <div class="percent-div">
      <button :disabled="isMaxReached" @click="voteYes">Yes</button>
      <button :disabled="isMaxReached" @click="voteNo">No</button>
    </div>

    <div class="knob-div">
      <Knob :modelValue="yesVotePercentage" :size="100" valueTemplate="{value}%" valueColor="MediumTurquoise" textColor="white" />
      <Knob :modelValue="noVotePercentage" :size="100" valueTemplate="{value}%" valueColor="Red" textColor="white" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const totalEmployees = ref(10);
    const yesVotes = ref(0);
    const noVotes = ref(0);
    const showSettingsMenu = ref(false);
    const selectedTitle = ref("Have you worked out today?");

    const toggleSettingsMenu = () => {
      showSettingsMenu.value = !showSettingsMenu.value;
    };

    const isMaxReached = computed(() => yesVotes.value + noVotes.value >= totalEmployees.value);

    //Procent för ja röster
    const yesVotePercentage = computed(() => {
      return totalEmployees.value > 0
        ? Number(((yesVotes.value / totalEmployees.value) * 100).toFixed(0)) 
        : 0;
    });

    //Procent för nej röster
    const noVotePercentage = computed(() => {
      return totalEmployees.value > 0
        ? Number(((noVotes.value / totalEmployees.value) * 100).toFixed(0)) 
        : 0;
    });

    // ++ ja-röst
    const voteYes = () => {
      if (!isMaxReached.value) {
        yesVotes.value++;
      }
    };

    // ++ nej-röst
    const voteNo = () => {
      if (!isMaxReached.value) {
        noVotes.value++;
      }
    };

    return {
      totalEmployees,
      yesVotes,
      noVotes,
      showSettingsMenu,
      toggleSettingsMenu,
      isMaxReached,
      voteYes,
      voteNo,
      selectedTitle,
      yesVotePercentage,
      noVotePercentage
    };
  },
};
</script>

<style scoped>
.counter-module {
  display: flex;
  flex-direction: column;
  background-color: rgb(125, 157, 164);
  color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 90%;
  margin: 20px auto;
}

.knob-div {
  display: inline-flex;
  justify-content: space-evenly;
  font-family: "Outfit", sans-serif;
}

.percent-div {
  display: inline-flex;
  justify-content: space-evenly;
}

.module-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ffffff;
  font-family: "Outfit", sans-serif;
}

.settings-button {
  background-color: #1d72b8;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.settings-button:hover {
  background-color: #145a86;
}

.employee-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-family: "Outfit", sans-serif;
}

.total-employees {
  font-size: 1.2rem;
  color: #ffffff;
}

.settings-dropdown {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.settings-dropdown label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
}

.settings-dropdown input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100px;
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
  font-family: "Outfit", sans-serif;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #145a86;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
  font-family: "Outfit", sans-serif;
}

@media (max-width: 600px) {
  .counter-module {
    padding: 20px;
    max-width: 100%;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
    padding: 10px 15px;
  }

  .settings-dropdown input {
    width: 80px;
  }
}
</style>