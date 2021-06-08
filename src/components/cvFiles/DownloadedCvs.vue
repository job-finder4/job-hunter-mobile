<template>
  <page @loaded="onPageLoaded">
    <DisplayFiles :settings="settings" :files="files"/>
  </page>
</template>

<script>
  import DisplayFiles from "./DisplayFiles";
  import {File, Folder, path} from '@nativescript/core/file-system';

  export default {
    components: {DisplayFiles},
    data() {
      return {
        files: [],
        settings:[
          {
            name:'Open',
            actionName:'openFromLocal'
          }
        ]
      }
    },
    methods: {
      onPageLoaded() {
        let downloadDirectoryPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        let appFolderPath = path.join(downloadDirectoryPath, 'jobHunter')
        let appFolder = Folder.fromPath(appFolderPath)
        appFolder.getEntities()
          .then(entities => {
            this.files = entities.map(entity => {
              let file = File.fromPath(entity.path)
              return {
                id:file.path+'-'+file.lastModified,
                name: file.name,
                path: file.path,
                size: file.size / 1024 + 'Kib',
                lastModified: new Date(file.lastModified).toDateString()
              }
            })
          })
      },

    },
  }
</script>
