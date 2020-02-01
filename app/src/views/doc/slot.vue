<template>
  <v-card>
    <v-card-title>
      slot
    </v-card-title>

    <v-card-text>
      <v-simple-table fixed-header height="300px">
        <thead>
        <tr>
          <th class="text-left">{{'doc.slot.name'| i18n}}</th>
          <th class="text-left">{{'doc.slot.description'| i18n}}</th>
        </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div class="subtitle-1 primary--text">text-field</div>
            </td>

            <td>
              <div>{{'doc.slot.description.text-field'| i18n}}</div>

              <div class="subtitle-2">props</div>
              <ul>
                <li>{{'doc.slot.text-field.props.data'| i18n}}</li>
                <li>{{'doc.slot.text-field.props.text-field-props'| i18n}}</li>
              </ul>
            </td>
          </tr>

          <tr>
            <td>
              <div class="subtitle-1 primary--text">date-icon</div>
            </td>

            <td>
              <div>{{'doc.slot.description.date-icon'| i18n}}</div>
            </td>
          </tr>

          <tr>
            <td>
              <div class="subtitle-1 primary--text">time-icon</div>
            </td>

            <td>
              <div>{{'doc.slot.description.time-icon'| i18n}}</div>
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
    getDescription(item) {
      let link = ''
      if(item.link) {
        link = `<a href="${item.link}" target="_blank">${this.i18n('see.doc')}</a>`
      }
      return this.i18n(`doc.slot.description.${item.name}`, {
        link,
      })
    },
  },
  computed: {
    docItems() {
      return [
        // vuetify

        // plugin
        { name: 'text-field', props: ['data'] },
        { name: 'date-icon' },
        { name: 'time-icon' },
      ]
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>