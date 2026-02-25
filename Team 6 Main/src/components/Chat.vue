<!-- Som hjälp/stöd användes https://www.youtube.com/watch?v=IUK98wrWsto&t=105s-->
<template>
      <div class="chat-box">
        <h1>AI Chat</h1>
        <Message v-for="(message, index) in messages" :key="index" :msg="message" />
        <input type="text" id="user-input" v-model="message"  placeholder="Ask me a question">
        <button id="send-btn" @click="userInput">Send</button>
        <button id="reset-btn" @click="eraseChat">Reset</button> 
      </div>
</template>

  
  <script>
 import Message from './Message.vue'
 import {ref} from 'vue'
 import openai from '../helpers/useOpenAi'

 export default {
  components: {
    Message
 },
 setup () {
  const message = ref(null)
  const messages =ref ([])

  const userInput =() => {
    messages.value.push( {

      role:'user',
      content: message.value
    })
    message.value=null
    chat(messages.value)
 }

 const chat= async (msgs)=>{
   const chatCompletion = await openai.chat.completions.create( {
messages: msgs,
model: 'gpt-3.5-turbo'

   })
   console.log(chatCompletion.choices[0].message)
   messages.value.push(chatCompletion.choices[0].message)
 }
 
 const eraseChat = () => {
      messages.value = []  
    }

 return {userInput, message, messages, eraseChat}

},
}
  </script>
  
  <style scoped>
  .chat-box {
  overflow-y: auto;
  font-family: "Outfit", sans-serif;
  display: flex; 
  flex-direction: column;
  background-color: rgb(125, 157, 164);
  color: #ffffff;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(152, 30, 30, 0.1);
  width: 90%;
  margin: 20px auto;
  max-height: 400px;
  #send-btn{
  background-color: #1d72b8;
  color: white;
  margin-top: 20px;
  max-width: 100px;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  }
  #reset-btn{
  background-color: #1d72b8;
  color: white;
  margin-left: 150px;
  margin-top: -35px;
  max-width: 100px;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  }
  #send-btn:hover {
  background-color: #145a86;}
  #reset-btn:hover {
    background-color: #145a86;}
#user-input {
  background-color: white;
  color: black;
  font-family: "Outfit", sans-serif;
  height: 40px;
  
}
 
}
  
  
  </style>
