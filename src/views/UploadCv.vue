<template>
  <Page>
    <StackLayout class="p-10">

      <AbsoluteLayout width="40%" height="300px">

        <Button
          width="100%"
          height="100%"
          androidElevation="1"
          androidDynamicElevationOffset="0"
          class="my-btn"
          @tap="chooseFile"
        >
          <FormattedString style="font-size: 16px;background-color: transparent">
            <span text="Choose"/>
            <span text="\n"/>
            <span text="File"/>
          </FormattedString>
        </Button>

        <Label
          v-if="isSelectedFile"
          top="18px"
          width="100%"
          height="100%"
          class="fa text-9xl text-center"
          style="color:red;"
          :text="'fa-file-pdf' | fonticon"
        />

      </AbsoluteLayout>

      <template v-if="isSelectedFile">
        <Label class="text-center  sans-serif" :text="selectedFile.name"/>
        <Label class="text-center text-xs sans-serif" :text="selectedFile.size"/>
      </template>

      <TextField
        v-if="!isBeingUploaded"
        style="width:400px"
        :autocorrect="true"
        maxLength="30"
        hint="Cv Name:"
        :isEnabled="isSelectedFile"
        v-model="selectedFile.name"
      />
      <template v-else>
        <Progress :value="task.upload" :maxValue="task.totalUpload"></Progress>
        <Label :text="'Uploading: ' + task.upload + ' / ' + task.totalUpload"></Label>
        <Label :text="'Status: ' + task.status"></Label>
      </template>

      <FlexBoxLayout class="justify-center">
        <Button text="Cancel" @tap="cancel"/>
        <Button :isEnabled="isSelectedFile" text="Upload" @tap="upload"/>
      </FlexBoxLayout>

    </StackLayout>

  </Page>
</template>

<script>
  import {Mediafilepicker} from 'nativescript-mediafilepicker';
  import {Application} from '@nativescript/core';
  import {File, Folder, path} from '@nativescript/core/file-system';

  export default {
    name: 'UploadCv',
    data() {
      return {
        isSelectedFile: false,
        isBeingUploaded: false,
        selectedFile: {
          name: '',
          path: '',
          size: '',
          lastModified: ''
        },
        task: null
      }
    },
    methods: {
      cancel() {
        if (this.isBeingUploaded) {
          this.task.cancel()
          this.task = null
        }
        this.$modal.close(null)
      },
      upload() {
        const bgHttp = require("@nativescript/background-http");
        let session = bgHttp.session("cv-upload");
        let request = {
          url: 'https://e1f88d4e2d90.ngrok.io/api/cvs',
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data" ,
            "File-Name": 'cv_file',
          },
          description: 'FileName',
          androidMaxRetries: 3,
          androidAutoDeleteAfterUpload: false,
          androidNotificationTitle: `Upload ${this.selectedFile.name} | By JobHunter`
        };

        let params = [
          {
            name: 'cv_file',
            filename: this.selectedFile.path,
          },
          {
            name: 'title',
            value: this.selectedFile.name
          }
        ];

        let task = session.multipartUpload(params, request);

        task.on('progress', (e) => {
          this.isBeingUploaded = true
        })

        task.on("error", (e) => {
          console.log(e.error);
        });

        task.on("responded", (e) => {
          console.log(JSON.parse(e.data));
          this.$modal.close(JSON.parse(e.data))
        })

        this.task = task
      },
      chooseFile() {
        let extensions = [];

        if (Application.ios) {
          extensions = [];
        } else {
          extensions = ['pdf'];
        }

        let options = {
          android: {
            extensions: extensions,
            maxNumberFiles: 1
          },
          ios: {
            extensions: extensions,
            multipleSelection: false,
          }
        };

        let filePicker = new Mediafilepicker();
        filePicker.openFilePicker(options);

        let that = this
        filePicker.on("getFiles", function (res) {
          let filePath = res.object.get('results')[0].file
          let file = File.fromPath(filePath)

          that.selectedFile = {
            name: file.name,
            path: file.path,
            size: Math.floor(file.size / (1024)) + ' Kib',
            lastModified: file.lastModified
          }

          that.isSelectedFile = true
        });

        filePicker.on("error", function (res) {
          let msg = res.object.get('msg');
          console.log(msg);
        });

        filePicker.on("cancel", function (res) {
          let msg = res.object.get('msg');
          console.log(msg);
        });
      }
    },
  }
</script>

<style>
  .my-btn {
    background-color: rgba(250, 250, 250, 0.7);
    text-transform: capitalize;
  }
</style>
