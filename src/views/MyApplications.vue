<template>
    <Page @loaded="showLoading" @navigatingFrom="destroyComp" class="bg-indigo-100">
<!--        <ActionBar title="My Applications" android:flat="true">-->
<!--            <NavigationButton-->
<!--                    text="Go Back"-->
<!--                    android.systemIcon="ic_menu_back"-->
<!--                    @tap="$navigateBack"-->
<!--            />-->
<!--        </ActionBar>-->

        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Applications"  col="1"/>
            </GridLayout>
        </ActionBar>

        <FlexboxLayout flexDirection="column">
            <StackLayout class="mb-5">
                <Label
                        text="Here You See your applcations"
                        class="text-xl ml-1 border leading-none border-indigo-200"
                />
            </StackLayout>


            <StackLayout class="my-2 mx-2 rounded-xl bg-indigo-50 pa-3" width="50%" alignSelf="flex-end">
                <DropDown
                        itemsTextAlignment="center"
                        class="text-2xl"
                        :items="items"
                        :selectedIndex="0"
                        v-model="selectedIndex"
                        opened="dropDownOpened"
                        closed="dropDownClosed"
                        @selectedIndexChanged="dropDownSelectedIndexChanged"
                ></DropDown>
            </StackLayout>

            <StackLayout style="height:80%" >
                <Label v-if="jobApplications.length===0" textWrap="true" class="text-xl" :text="'Sorry,You dont have any '+ selectedApplicationsStatus+'Applciation'"></Label>
                <RadListView ref="listView"
                             for="application in jobApplications"
                             @itemTap="onItemTap"
                             v-if="jobApplications.length > 0 && !isLoading">
                    <v-template>
                        <appSingleApplication :application="application"/>
                    </v-template>
                </RadListView>
            </StackLayout>

        </FlexboxLayout>


    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";
    import SingleApplication from "~/components/SingleApplication";
    import CollapsableContainer from "~/components/CollapsableContainer";
    import {ObservableArray} from "@nativescript/core/data/observable-array";

    export default {
        mixins:[sideDrawer],
        components: {
            appSingleApplication: SingleApplication,
            appCollapsableContainer: CollapsableContainer,
        },
        computed: {
            jobApplications() {
                if (this.selectedApplicationsStatus === 'approved') {
                    return this.$store.getters.getApprovedJobApplications
                }
                if (this.selectedApplicationsStatus === 'pending') {
                    return this.$store.getters.getPendingJobApplications
                }
                if (this.selectedApplicationsStatus === 'rejected') {
                    return this.$store.getters.getRejectedJobApplications
                }
            },
        },
        data() {
            return {
                selectedApplicationsStatus: "approved",
                selectedIndex: "0",
                dropDownOpened: true,
                dropDownClosed: false,
                isLoading: false,
                items: new ObservableArray(),
            };
        },
        methods: {
            onItemTap(e) {
            },
            dropDownSelectedIndexChanged(args) {
                this.selectedIndex = args.newIndex
                this.selectedApplicationsStatus = this.items.getItem(this.selectedIndex)
                this.retrieveApplications()
                console.log(this.selectedApplicationsStatus)
                console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
            },
            changeApplicationShow(status) {
                console.log(status);
            },
            destroyComp() {
                this.$store.commit("CLEAR_NOTIFICATION");
            },
            showLoading() {
                this.isLoading = true;
                popUpShowIndicator('this.$refs.myFF.android')


                this.$store.dispatch('getJobSeekerApplications', {applicationStatus: this.selectedApplicationsStatus})
                    .then((res) => {
                        this.isLoading = false
                        popupHideIndicator()
                    })
                    .catch((err) => {
                        console.log('applications Not arrived')
                        popupHideIndicator()
                        this.isLoading = false
                    })
            },
            retrieveApplications() {
                this.isLoading = true;
                popUpShowIndicator('this.$refs.myFF.android')

                // console.log(this.selectedApplicationsStatus)
                this.$store.dispatch('getJobSeekerApplications',
                    {applicationStatus: this.selectedApplicationsStatus})
                    .then((res) => {
                        this.isLoading = false
                        popupHideIndicator()
                    })
                    .catch((err) => {
                        console.log('applications Not arrived')
                        popupHideIndicator()
                        this.isLoading = false
                    })
            }
        },
        created() {
            this.items.push("approved");
            this.items.push("pending");
            this.items.push("rejected");
        }
    };
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>
