<template>
    <Page class="bg-grey-400" @loaded="onPageLoaded">
        <ActivityIndicator :busy="isLoading" height="50" width="50"/>

        <ActionBar>
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" text="Job Preference" col="1"/>
            </GridLayout>
        </ActionBar>

        <ScrollView>
            <StackLayout>
                <StackLayout class="p-6">

                    <Label class="font-bold mb-2 font-serif" text="Details:"/>
                    <StackLayout
                            class="bg-grey-200 ml-2 mb-8 border-gray-300 border-opacity-50 border-2 divide-y-2 divide-gray-200 divide-opacity-50 space-y-4 rounded-lg p-4"
                    >

                        <GridLayout width="100%" columns="auto, *">
                            <Label verticalAlignment="center"
                                   col="0"
                                   textWrap="true">
                                <FormattedString>
                                    <Span class="font-serif" text="Expected Salary"/>
                                </FormattedString>
                            </Label>

                            <Button
                                    v-if="editMode&&!isEdit.salary"
                                    @tap="editTextfield('salary')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="edit"/>
                            <Button
                                    v-if="editMode&&isEdit.salary"
                                    @tap="saveTextfield('salary')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="save"/>
                        </GridLayout>

                        <textField
                                ref="salary"
                                :editable="!editMode"
                                class="my-textfield2"
                                keyboardType="number"
                                v-model="jobPreference.salary"/>

                        <GridLayout width="100%" columns="auto, *">
                            <Label verticalAlignment="center"
                                   col="0"
                                   textWrap="true">
                                <FormattedString>
                                    <Span class="font-serif" text="Job Location"/>
                                </FormattedString>
                            </Label>

                            <Button
                                    v-if="editMode&&!isEdit.location"
                                    @tap="editTextfield('location')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="edit"/>
                            <Button
                                    v-if="editMode&&isEdit.location"
                                    @tap="saveTextfield('location')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="save"/>
                        </GridLayout>

                        <textField
                                ref="location"
                                :editable="!editMode"
                                class="my-textfield2"
                                v-model="jobPreference.location"/>

                        <GridLayout width="100%" columns="auto, *">
                            <Label verticalAlignment="center"
                                   col="0"
                                   textWrap="true">
                                <FormattedString>
                                    <Span class="font-serif" text="Job Title"/>
                                </FormattedString>
                            </Label>

                            <Button
                                    v-if="editMode&&!isEdit.job_title"
                                    @tap="editTextfield('job_title')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="edit"/>
                            <Button
                                    v-if="editMode&&isEdit.job_title"
                                    @tap="saveTextfield('job_title')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="save"/>
                        </GridLayout>

                        <textField
                                ref="job_title"
                                :editable="!editMode"
                                class="my-textfield2"
                                v-model="jobPreference.job_title"/>
                        //---------------
                        <GridLayout width="100%" columns="auto, *">
                            <Label verticalAlignment="center"
                                   col="0"
                                   textWrap="true">
                                <FormattedString>
                                    <Span class="font-serif" text="Work Type"/>
                                </FormattedString>
                            </Label>

                            <Button
                                    @tap="editWorkType"
                                    v-if="editMode"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="edit"/>

                            <Button
                                    v-if="editMode&&isEdit.work_type"
                                    @tap="saveWorkType"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="save"/>

                        </GridLayout>

                        <DropDown
                                v-if="isEdit.work_type"
                                horizontalAlignment="right"
                                itemsTextAlignment="center"
                                class="text-2xl"
                                :items="items"
                                :selectedIndex="0"
                                v-model="selectedIndex"
                                opened="dropDownOpened"
                                closed="dropDownClosed"
                                @selectedIndexChanged="dropDownSelectedIndexChanged"
                        ></DropDown>

                        <Label
                                horizontalAlignment="center"
                                class="text-2xl"
                                style="font-family: sans-serif"
                               v-if="!isEdit.work_type"
                               :text="jobPreference.work_type"/>

                        //------------------------------
                        <GridLayout width="100%" columns="auto, *">
                            <Label verticalAlignment="center"
                                   col="0"
                                   textWrap="true">
                                <FormattedString>
                                    <Span class="font-serif" text="Job Category"/>
                                </FormattedString>
                            </Label>
                            <Button
                                    @tap="editTextfield('job_category')"
                                    v-if="editMode"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="edit"/>

                            <Button
                                    v-if="editMode&&isEdit.job_category"
                                    @tap="saveTextfield('job_category')"
                                    col="1"
                                    horizontalAlignment="right"
                                    verticalAlignment="center"
                                    androidElevation="0"
                                    alignSelf="center"
                                    text="save"/>
                        </GridLayout>

                        <textField
                                ref="job_category"
                                :editable="!editMode"
                                class="my-textfield2"
                                v-model="jobPreference.job_category"/>

                    </StackLayout>

                </StackLayout>

                <Button
                        text="save"
                        @tap="save"
                        style="color: white;width:70%"
                        class="btn btn-outlined bg-indigo-400 text-2xl"
                ></Button>

            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import {ObservableArray} from "@nativescript/core/data/observable-array";

    export default {
        data() {
            return {
                isEdit: {
                    job_title: false,
                    job_category: false,
                    location: false,
                    salary: false,
                    work_type: false
                },
                jobPreference: {
                    job_title: "",
                    job_category: "",
                    location: "",
                    salary: "",
                    work_type: "full_time"
                },
                items: new ObservableArray(),
                selectedIndex: "0",
                dropDownOpened: true,
                dropDownClosed: false,
                editMode: false,
                isLoading: true
            }
        },
        methods: {
            onPageLoaded() {
                this.isLoading = true
                this.$store.dispatch('retrieveProfile', this.$store.getters.getUserId)
                    .then(res => {
                        console.log("this.jobPreference")

                        if (!!this.$store.getters.jobPreference) {
                            this.jobPreference = this.$store.getters.jobPreference
                            this.editMode = true
                            console.log(this.jobPreference)
                        }

                        console.log(this.jobPreference)
                        this.isLoading = false
                    })

            },
            dropDownSelectedIndexChanged(args) {
                this.selectedIndex = args.newIndex
                this.jobPreference.work_type = this.items.getItem(this.selectedIndex)
                // console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
            },
            editWorkType() {
                this.isEdit['work_type']=true
            },
            saveWorkType(){
                this.isEdit['work_type']=false
                console.log(this.jobPreference.work_type)
            },
            editTextfield(comp) {
                this.$refs[comp].nativeView.focus();
                this.$refs[comp].nativeView.editable = true;
                this.isEdit[comp] = true
            },
            saveTextfield(comp) {
                this.$refs[comp].nativeView.editable = false;
                this.jobPreference[comp] = this.$refs[comp].nativeView.text
                this.isEdit[comp] = false
            },
            save() {
                this.isLoading = true
                let action =
                    (!!this.$store.getters.jobPreference) ? 'updateJobPreference'
                    : 'createJobPreference'

                this.$store.dispatch(action, this.jobPreference)
                    .then(res => {
                        this.jobPreference = this.$store.getters.jobPreference
                        this.isLoading = false
                        this.$showToast("success")
                    })
            }
        },
        created() {
            this.items.push("full_time");
            this.items.push("part_time");
            // this.onPageLoaded()
        }
    }
</script>
<style>
    .my-textfield2 {
        background-color: white;
        font-size: 18px;
        border-top-width: 5px;
        border-top-left-radius: 10px;
        border-right-width: 5px;
        border-top-right-radius: 10px;
        border-left-width: 5px;
        border-bottom-left-radius: 10px;
        border-bottom-width: 5px;
        border-bottom-right-radius: 10px;
    }
</style>
