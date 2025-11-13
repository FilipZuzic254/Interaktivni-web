<template>
  <q-page padding>

    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-input
        filled
        v-model="id"
        label="Id knjige"
        lazy-rules
      />


      <q-input
        filled
        v-model="naslov"
        label="Naslov knjige"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />


      <q-input
        filled
        v-model="autor"
        label="Ime autora"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="opis"
        label="Kratki opis knjige"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <div class="row gap">
        <q-file filled bottom-slots v-model="slika" label="Naslovna slika knjige" counter max-files="1" class="col">
          <template v-slot:before>
            <q-icon name="folder_open" />
          </template>

          <template v-slot:hint>
            Odaberite sliku
          </template>

          <template v-slot:append>
            <q-btn round dense flat icon="add" @click.stop.prevent />
          </template>
        </q-file>

        <q-select filled v-model="status" :options="options" label="Status knjige" class="col"/>
      </div>
      


      <div>
        <q-btn label="Spremi" type="submit" color="primary"/>
        <q-btn label="Odustani" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>


    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" v-for="(item, index) in lista" :key="index">
        <q-img v-if="item.slika" :src="item.slika" style="width: 100%; max-width: 250px"/>

        <q-card-section>
          <div class="text-h6">{{ item.naslov }}</div>
          <div class="text-subtitle2">{{ item.autor }}</div>
          <div class="text-subtitle3">{{ item.status }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ item.opis }}
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {

    const lista = ref([])

    
    const id = ref(lista.value.length)
    const naslov = ref(null)
    const autor = ref(null)
    const opis = ref(null)
    const slika = ref(null)
    const status = ref(null)

    return {
      id,
      naslov,
      autor,
      opis,
      slika,
      lista,
      status,
      options: [
        'zauzeta', 'slobodna'
      ],

      onSubmit () {
        let previewUrl = null


        if (id.value == null) {
          id.value = lista.value.length
        }

        if (slika.value && slika.value instanceof File) {
          previewUrl = URL.createObjectURL(slika.value)
        }


        lista.value.push({
          id: id.value, 
          naslov: naslov.value,
          autor: autor.value,
          opis: opis.value,
          slika: previewUrl,
          status: status.value
        })

        id.value = lista.value.length
        naslov.value = null
        autor.value = null
        opis.value = null
        slika.value = null
        status.value = null

        console.log(lista.value)
      },

      onReset () {
        id.value = lista.value.length
        naslov.value = null
        autor.value = null
        opis.value = null
        slika.value = null
        status.value = null
      }
    }
  }
}
</script>

<style lang="sass">
.gap
  gap: 20px

.my-card
  width: 100%
  max-width: 250px
</style>
