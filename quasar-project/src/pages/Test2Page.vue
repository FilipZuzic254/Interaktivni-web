<template>
  <q-page padding>
    <!-- QBadge -->
    <div class="q-pa-md q-gutter-sm">
      <q-btn push color="white" text-color="primary" label="Unread Msg">
        <q-badge color="orange" v-model="readmsg" floating>{{ readmsg }}</q-badge>
      </q-btn>

      <q-btn dense color="purple" round icon="email" class="q-ml-md">
        <q-badge color="red" v-model="delmsg" floating>{{ delmsg }}</q-badge>
      </q-btn>
    </div>
    <!-- QCard -->
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card bg-secondary text-white" v-model="msg" v-for="item in msg" :key="item">
        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-subtitle2">by {{ item.author }}</div>
        </q-card-section>
        <q-card-section>
          {{ item.text }}
        </q-card-section>
        <q-separator dark />
        <q-card-actions>
          <q-btn flat @click="openMsg()">Open</q-btn>
          <q-btn flat @click="deleteMsg()">Delete</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-input v-model="title" label="Title" />
      <q-input v-model="author" label="Author" />
      <q-input v-model="text" label="Text" />
      <q-btn flat @click="save()">Save</q-btn>
    </div>
  </q-page>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  
  const msg = ref([])

  function initMsg() {  
    msg.value.push(
    {
      title: 'Changing planet',
      author: 'John Doe',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ...'
    },
    {
      title: 'New planet',
      author: 'Johndoe',
      text: 'Lorem ipsum.'
    },
    {
      title: 'New update',
      author: 'Doe',
      text: 'Lorem.'
    },
    )
  }

  const readmsg = ref(22)
  const delmsg = ref(4)

  const title = ref('')
  const author = ref('')
  const text = ref('') 

  function openMsg() {
    readmsg.value -= 1
    console.log("read " + readmsg.value)
  }
  function deleteMsg() {
    delmsg.value -= 1
    console.log("delete " + delmsg.value)
  }
  function save(){
    msg.value.push({title:title.value, author:author.value, text:text.value})
    console.log(msg)
  }

  onMounted(() => {
    initMsg()
  })
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>