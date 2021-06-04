<template>
  <ListView @itemTap="onItemTap" v-if="files.length>0" ref="list-view" for="file in files">

    <v-template>

      <FlexboxLayout alignItems="center" class="p-4">

        <Label
          v-if="(!!selectedFile && selectedFile.id === file.id)"
          class="fa text-6xl"
          style="margin-right:50px"
          :text="'fa-check-square' | fonticon"
        />

        <Label
          v-else
          class="fa text-6xl blue"
          style="color:orangered;margin-right:50px"
          :text="'fa-file-pdf' | fonticon"
        />

        <Label textWrap="true" flexGrow="1">
          <FormattedString>
            <Span :text="file.name" class="text-xl text-black" style="text-overflow: ellipsis;white-space: nowrap"/>
            <Span text="\n"/>
            <Span :text="'modified at: '+file.lastModified" class="text-gray-400"/>
            <Span text="\n"/>
            <Span v-if="file.size" :text="file.size" class="text-gray-400"/>
          </FormattedString>
        </Label>

      </FlexboxLayout>

    </v-template>
  </ListView>
  <Label class="text-center" v-else text="there is no files"/>
</template>

<script>

  export default {
    name: 'displayFiles',
    props: {
      files: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        selectedFile: null
      }
    },
    methods: {
      onItemTap({item}) {
        this.selectedFile = item
        this.$refs['list-view'].refresh()
        this.$emit('change:selectedFile', this.selectedFile)
      },
    },
  }
</script>
