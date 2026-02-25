<template>
  <div class="leaderboard">
    <h2>Office Workout Leaderboard</h2>
    
    <div class="add-user">
      <input v-model="newUserName" @keyup.enter="addUser" type="text" placeholder="Enter your name" />
      <button @click="addUser">Add</button>
    </div>
    
    <div class="leaderboard-list" v-if="users.length">
      <div v-for="(user, index) in sortedUsers" :key="user.id" class="leaderboard-item">
        <span class="user-name">{{ index + 1 }}. {{ user.name }}</span>
        <span class="workout-count">{{ user.workouts }} workouts</span>
        <div class="actions">
          <button @click="incrementWorkout(user.id)">➕</button>
          <button @click="editUser(user)">✏️</button>
          <button @click="deleteUser(user.id)">🗑️</button>
        </div>
      </div>
    </div>

    <div v-else class="no-users">
      No users added yet. Start by adding your name!
    </div>

    <div v-if="editingUser" class="modal-overlay">
      <div class="modal">
        <h3>Edit User</h3>
        <input v-model="editedName" type="text" placeholder="Enter new name" />
        <div class="modal-actions">
          <button @click="saveEdit">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';

export default {
  name: 'Leaderboard',
  setup() {

    const newUserName = ref('');
    const users = ref([]);
    const editingUser = ref(null);
    const editedName = ref('');

    // Laddar användare från localstorage.
    onMounted(() => {
      const storedUsers = localStorage.getItem('leaderboardUsers');
      if (storedUsers) users.value = JSON.parse(storedUsers);
    });

    // Sparar användare i localstorage.
    watch(users, (newUsers) => {
      localStorage.setItem('leaderboardUsers', JSON.stringify(newUsers));
    }, { deep: true });

    // Ny användare.
    const addUser = () => {
      const name = newUserName.value.trim();
      if (!name) return alert('Please enter a valid name.');
      if (users.value.some(user => user.name.toLowerCase() === name.toLowerCase())) {
        return alert('This name is already on the leaderboard.');
      }
      users.value.push({ id: Date.now(), name, workouts: 0 });
      newUserName.value = '';
    };

    // ++ workouts.
    const incrementWorkout = (id) => {
      const user = users.value.find(user => user.id === id);
      if (user) user.workouts++;
    };

    // Redigeringen av en användare.
    const editUser = (user) => {
      editingUser.value = user;
      editedName.value = user.name;
    };

    // Funktion som sparar ändringarna för användarens namn.
    const saveEdit = () => {
      const name = editedName.value.trim();
      if (!name) return alert('Name cannot be empty.');
      if (users.value.some(user => user.name.toLowerCase() === name.toLowerCase() && user !== editingUser.value)) {
        return alert('This name is already on the leaderboard.');
      }
      editingUser.value.name = name;
      editingUser.value = null;
      editedName.value = '';
    };

    // Funktion som avbryter redigeringsläget utan att spara ändringar.
    const cancelEdit = () => {
      editingUser.value = null;
      editedName.value = '';
    };

    // Delete funktion
    const deleteUser = (id) => {
      if (confirm('Are you sure you want to delete this user?')) {
        users.value = users.value.filter(user => user.id !== id);
      }
    };

    // List sortering
    const sortedUsers = computed(() => [...users.value].sort((a, b) => b.workouts - a.workouts));

    return {
      newUserName,
      users,
      addUser,
      incrementWorkout,
      sortedUsers,
      editingUser,
      editedName,
      editUser,
      saveEdit,
      cancelEdit,
      deleteUser,
    };
  },
};
</script>

<style scoped>
.leaderboard {
  background-color: rgb(125, 157, 164);
  padding: 20px;
  border-radius: 10px;
  margin: 40px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: "Outfit", sans-serif;
  max-width: 90%;
  text-align: center;
}

.add-user {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.add-user input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #eaeaea;
  border-radius: 5px 0 0 5px;
  outline: none;
  width: 70%;
}

.add-user button {
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  background-color: #1d72b8;
  color: white;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  transition: background-color 0.3s;
}

.add-user button:hover {
  background-color: #0056b3;
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.leaderboard-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.user-name {
  font-weight: bold;
  color: #333;
}

.workout-count {
  color: #555;
}

.actions {
  display: flex;
  gap: 5px;
}

.actions button {
  padding: 5px 8px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  opacity: 0.8;
}

.actions button:first-child {
  background-color: #28a745;
  color: white;
}

.actions button:nth-child(2) {
  background-color: #ffc107;
  color: white;
}

.actions button:last-child {
  background-color: #dc3545; 
  color: white;
}

.no-users {
  text-align: center;
  color: #777;
  font-style: italic;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: #ffffff;
  padding: 20px 30px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal h3 {
  margin-bottom: 15px;
  color: #333;
}

.modal input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 5px;
  outline: none;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-actions button {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-actions button:first-child {
  background-color: #007bff;
  color: white;
}

.modal-actions button:first-child:hover {
  background-color: #0056b3;
}

.modal-actions button:last-child {
  background-color: #6c757d;
  color: white;
}

.modal-actions button:last-child:hover {
  background-color: #5a6268;
}
</style>