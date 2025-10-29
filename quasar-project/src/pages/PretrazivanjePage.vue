<template>
  

  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md q-mb-md"
      autocorrect="off"
      autocapitalize="off"
      autocomplete="off"
      spellcheck="false"
    >
      <q-input filled v-model="text" style="max-width: 500px;">
        <template v-slot:append>
          <q-icon v-if="text === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
        </template>
      </q-input>

      <div>
        <q-btn-toggle
          v-model="model"
          toggle-color="primary"
          :options="[
            {label: 'Naslov', value: 'naslov'},
            {label: 'Autor', value: 'autor'},
          ]"
          class="q-mr-md"
        />
        <q-btn label="Pretraži" type="submit" color="primary"/>
      </div>
      

    </q-form>

    <q-table
      class="my-sticky-header-table"
      flat bordered
      title="Books"
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="light-blue-6"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'


const columns = [
  {
    name: 'id',
    label: 'ID',
    align: 'left',
    field: 'id',
    sortable: true
  },
  {
    name: 'naslov',
    required: true,
    label: 'Naslov Knjige',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'autor', align: 'left', label: 'Autor', field: 'autor', sortable: true },
  { name: 'opis', align: 'left', label: 'Opis Knjige', field: 'opis'},
  { name: 'slika', align: 'left', label: 'Slika', field: 'slika' },
  { name: 'stanje', align: 'center', label: 'Broj Knjiga na Stanju', field: 'stanje', sortable: true},
]

const rows = [
  {
    id: '1',
    name: 'The Very Hungry Caterpillar',
    autor: 'Eric Carle',
    opis: 'As an added bonus, it includes read-aloud...',
    slika: 'img',
    stanje: 4,
  },
  {
    id: '2',
    name: 'Palace of Palms: Tropical...',
    autor: 'Kate Teltscher',
    opis: 'The body is assaulted by heat, light and the...',
    slika: 'img',
    stanje: 4,
  },
  {
    id: '3',
    name: 'The Very Hungry Caterpillar',
    autor: 'Eric Carle',
    opis: 'As an added bonus, it includes read-aloud...',
    slika: 'img',
    stanje: 4,
  },
]

export default {
  setup () {
    const $q = useQuasar()

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 3
      // rowsNumber: xx if getting data from a server
    })

    return {
      pagination,
      columns,
      rows,
      text: ref(''),
      model: ref(null),

      onSubmit () {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      },

      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */
  max-height: 80vh


  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #00b4ff
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
