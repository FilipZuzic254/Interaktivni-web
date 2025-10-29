<template>
  <div class="q-pa-md fixed-center" style="max-width: 800px; min-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-input
        filled
        v-model="name"
        label="Korisničko ime"
      />

      <q-input 
        v-model="pass" 
        filled :type="isPwd ? 'password' : 'text'"
        label="Lozinka"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    const name = ref(null)
    const pass = ref(null)

    return {
      name,
      pass,
      isPwd: ref(true),

      onSubmit () {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      },

      onReset () {
        name.value = null
        pass.value = null
      }
    }
  }
}
</script>
