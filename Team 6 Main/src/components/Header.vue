<template>
  <div class="container">
    <img src="../assets/logo4.png" alt="Logo" class="logo" />
    <h1>Personal Health Assistant</h1>
  </div>
</template>

<style scoped>
.container {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background-color: rgb(125, 157, 164);
  border-radius: 25px;
  padding: 50px;
  position: relative; 
}
.logo {
  position: absolute;
  left: 20px; 
  top: 50%; 
  transform: translateY(-50%); 
  width: 100px;
  height: auto;

}

h1 {
  color: white;
  font-family: "Outfit", sans-serif;
  font-size: 2rem;
  flex-grow: 1; 
  text-align: center;
  margin: 0; 
}
</style>
