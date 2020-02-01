<template>
  <v-card>
    <v-card-title>
      props
    </v-card-title>

    <v-card-text>
      <v-simple-table fixed-header height="300px">
        <thead>
        <tr>
          <th class="text-left">{{'doc.prop.property'| i18n}}</th>
          <th class="text-left">{{'doc.prop.type'| i18n}}</th>
          <th class="text-left">{{'doc.prop.description'| i18n}}</th>
          <th class="text-left">{{'doc.prop.default'| i18n}}</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(item, index) in docItems" :key="index">
          <td>
            <span v-if="item.required" class="subtitle-1 red--text mr-1">*</span>
            <span class="subtitle-1 primary--text">{{item.property}}</span>
          </td>
          <td>
            <div>{{item.type}}</div>
          </td>
          <td>
            <p class="pt-4" v-html="getDescription(item)"></p>
          </td>
          <td>
            <div v-if="showDefaultValue(item)">
              {{item.default}}
            </div>
          </td>
        </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script lang="babel" type="text/babel">
export default {
  methods: {
    showDefaultValue(item) {
      return typeof item.default != undefined
    },
    getDescription(item) {
      let link = ''
      if(item.link) {
        link = `<a href="${item.link}" target="_blank">${this.i18n('see.doc')}</a>`
      }
      return this.i18n(`doc.prop.description.${item.property}`, {
        link,
      })
    },
  },
  computed: {
    docItems() {
      return [
        // vuetify

        // plugin
        { property: 'width', type: 'string', default: '330px' },
        { property: 'inline', type: 'boolean', default: false },
        { property: 'type', type: 'string', default: 'datetime' },
        { property: 'disabled', type: 'boolean', default: false },
        { property: 'readonly', type: 'boolean', default: false },
        { property: 'transition', type: 'string', default: 'scroll-y-transition', link: 'https://vuetifyjs.com/en/components/menus#api' },
        { property: 'textFieldProps', type: 'Object', link: 'https://vuetifyjs.com/en/components/text-fields#api' },
        { property: 'datePickerProps', type: 'Object', link: 'https://vuetifyjs.com/en/components/date-pickers#api' },
        { property: 'timePickerProps', type: 'Object', link: 'https://vuetifyjs.com/en/components/time-pickers#api' },
      ]
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>