<template>
    <GridLayout rows="auto,*" columns="auto,*" alignItems="center" class="p-2">
        <Label
                v-if="!!selectedFile && selectedFile.id==file.id"
                row="1" col="0"
                class="fa text-6xl"
                style="margin-right:50px"
                :text="'fa-check-square' | fonticon"
        />

        <Label
                v-else
                row="1" col="0"
                class="fa text-6xl blue"
                style="color:orangered;margin-right:50px"
                :text="'fa-file-pdf' | fonticon"
        />

        <Label row="1" col="1" textWrap="true">
            <FormattedString>
                <Span :text="file.name" class="text-xl text-black" style="text-overflow: ellipsis;white-space: nowrap"/>
                <Span text="\n"/>
                <Span :text="'modified at: '+file.lastModified" class="text-gray-400"/>
                <Span text="\n"/>
                <Span v-if="file.size" :text="file.size" class="text-gray-400"/>
            </FormattedString>
        </Label>

        <FlexBoxLayout
                v-if="!!settings"
                id="dropDown"
                flexDirection="row-reverse"
                justifyContent="flex-start"
                row="0" col="1"
        >
            <Button
                    class="dropdown-btn"
                    androidElevation="0"
                    androidDynamicElevationOffset="0"
                    text="..."
                    @tap="showFileSettings"
            />

            <template v-if="showSetting==file.id">
                <Button
                        v-for="setting in settings"
                        @tap="resolveAction(setting.actionName)"
                        androidElevation="1"
                        androidDynamicElevationOffset="3"
                        class="dropdown-item"
                        :text="setting.name"
                />


            </template>

        </FlexBoxLayout>
    </GridLayout>
</template>

<script>
    import {File, path} from "@nativescript/core/file-system";
    import {Application, Http} from "@nativescript/core";

    export default {
        name: 'fileView',
        props: {
            file: {
                type: Object,
                required: true
            },
            settings: {
                type: Array,
                default: null
            },
            showSetting: {
                type: Number,
                default: -1
            },
            selectedFile: {
                type: Object,
                default: null
            }
        },

        methods: {
            resolveAction(actionName) {
                this[actionName]()
            },
            showFileSettings() {
                if (this.showSetting == this.file.id) {
                    this.$emit('change:showSettings', -1)
                }
                this.$emit('change:showSettings', this.file.id)
            },
            select() {
                this.$emit('change:selectedFile', this.file)
            },
            openFromLocal() {
                try {
                    let file = File.fromPath(this.file.path)
                    let intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
                    let mimeType = "application/pdf";  // The file here is the nativescript file object (fs.File)
                    let context = Application.android.context;
                    let nativeFile = new java.io.File(file.path);

                    let uri = androidx.core.content.FileProvider.getUriForFile(context, "org.nativescript.newC.provider", nativeFile); // Here add ".provider" after your app package name

                    intent.setDataAndType(uri, mimeType);
                    intent.addFlags(android.content.Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    Application.android.foregroundActivity.startActivity(android.content.Intent.createChooser(intent, 'Open File...'));
                } catch (e) {
                    this.$showToast(e)
                }
            },
            download() {
                let file = this.file
                let downloadDirectoryPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
                let appFolderPath = path.join(downloadDirectoryPath, 'jobHunter', file.name + '.pdf')
                this.$showToast('downloaded started')
                Http.getFile(`http://192.168.43.233/55nuxt-laravel-passport-example-master/nuxt-laravel-passport-example-master/laravel/public/api/cvs/${file.id}`, appFolderPath)
                    .then(file => {
                        this.$showToast('downloaded successfully')
                    })
                    .catch(e => {
                            this.$showToast('an error occurred during downloading.please try later')
                            console.log(e);
                        }
                    )
            },
        },

    }
</script>

<style>
    .dropdown-btn {
        background-color: transparent;
        width: 70;
        height: 32;
        font-size: 10px;
    }

    .dropdown-item {
        background-color: transparent;
        font-size: 10px;
        text-transform: capitalize;
        border-width: 0.01;
        border-color: transparent;
        padding: 0;
        width: 50;
        height: 32;
    }

    .slide-left {
        animation-name: slideAnimation;
        animation-duration: 3s;
        animation-timing-function: ease;
    }

    @keyframes slideAnimation {
        from {
            transform: translateX(300px);
        }
        to {
            transform: translateX(0);
        }
    }

</style>


<!--
uploaded file:
  open
  download
downloaded file:
  open
apply:
  select
-->
