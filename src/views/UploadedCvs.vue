<template>
  <Page @loaded="fetchCvFiles">
    <!--      <ActionBar title="uploaded file" class="bg-blue-500" android:flat="true"/>-->
    <ActionBar>
      <GridLayout width="100%" columns="auto, *">
        <Label text="MENU" @tap="openDrawer()" col="0"/>
        <Label class="title" text="My Cvs"  col="1"/>
      </GridLayout>
    </ActionBar>

    <GridLayout
      rows="auto,*,auto"
      columns="*,*"
    >
      <Button
        row="0"
        col="0"
        colSpan="100%"
        height="90"
        style="background-color: #f6f6f6;"
        @tap="showUploadFileModal"
      >
        <FormattedString style="background-color: transparent">
          <span class="fa text-xl" :text="'fa-upload'|fonticon"/>
          <span class="text-lg" text="Upload Cv"/>
        </FormattedString>

      </Button>

      <ActivityIndicator colSpan="100%" row="1" col="0" :busy="loadingCvs" height="50" width="50"/>

      <display-files
        row="1" col="0"
        v-if="!loadingCvs"
        colSpan="100%"
        :files="files"
        :settings="settings"
        ref="display-files"
        @change:selectedFile="newFileIsSelected"
      />
      <template v-if="actionButtons">
        <button  @tap="done" :isEnabled="!!selectedFile" class="text-white bg-indigo-600" row="2"
                col="1" text="done"/>
        <button @tap="cancel" row="2" col="0" text="cancel"/>
      </template>
    </GridLayout>

  </Page>
</template>

<script>
  import DisplayFiles from "../components/cvFiles/DisplayFiles";
  import UploadCv from "./UploadCv";

  export default {
    name: 'UploadedCvs',
    components: {DisplayFiles},
    props: {
      actionButtons: {
        type: Boolean,
        default: true
      },
      selectAble: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        files: [],
        loadingCvs: true,
        selectedFile: null,
        settings: [
          {
            name: 'download',
            actionName: 'download'
          }
        ]
      }
    },
    methods: {
      showUploadFileModal() {
        this.$showModal(UploadCv, {
          animated: true,
        }).then(file => {
          this.files.unshift(this.cvAdapter(file))
          console.log(this.cvAdapter(file));
        })
      },
      fetchCvFiles() {
        if (this.selectAble) {
          this.settings.push({
            name: 'select',
            actionName: 'select'
          })
        }
        return  this.$axios.get('/user/my-cvs')
          .then(response => {
            this.saveCvs(response.data.data)
          })
          .finally(() => {
            this.loadingCvs = false
          });
      },
      saveCvs(cvs) {
        this.files = cvs.map(cv => {
          return this.cvAdapter(cv)
        });
      },
      cvAdapter(cv) {
        return {
          id: cv.data.id,
          name: cv.data.attributes.title,
          path: cv.data.attributes.download_link,
          size: cv.data.attributes.size,
          lastModified: cv.data.attributes.last_modified
        }
      },
      newFileIsSelected(file) {
        this.selectedFile = file
      },
      done() {
        this.$modal.close(this.selectedFile)
      },
      cancel() {
        this.$modal.close(null)
      }
    },
  }
</script>
