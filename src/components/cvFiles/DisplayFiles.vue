<template>
  <ListView v-if="files.length>0" ref="list-view" for="file in files">
    <v-template>
      <FileView @change:selectedFile="onChangeSelectedFile"
                @change:showSettings="onChangeShowSettings"
                :show-setting="showSetting"
                :selected-file="selectedFile"
                :file="file"
                :settings="settings"/>
    </v-template>
  </ListView>
  <Label class="text-center" v-else text="there is no files"/>
</template>

<script>
  import FileView from "./File";

  export default {
    name: 'displayFiles',
    components: {FileView},
    props: {
      files: {
        type: Array,
        required: true
      },
      settings: {
        type: Array,
        default: null
      },
    },
    data() {
      return {
        selectedFile: null,
        showSetting: -1
      }
    },
    methods: {
      onChangeSelectedFile(file) {
        this.selectedFile = file
        this.$refs['list-view'].refresh()
        this.$emit('change:selectedFile',file)
      },
      onChangeShowSettings(fileId){
        this.showSetting = fileId
        this.$refs['list-view'].refresh()
      },
    },
  }
</script>

<style>

</style>
