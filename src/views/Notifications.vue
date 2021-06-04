<template>
    <Page @loaded="showLoading" @navigatingFrom="destroyComp" class="bg-indigo-100">
<!--        <ActionBar-->
<!--                title="Notifications" android:flat="true">-->
<!--                <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>-->
<!--        </ActionBar>-->
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Notifications"  col="1"/>
            </GridLayout>
        </ActionBar>
        <!-- <StackLayout class="mx-8">
            <Label style="font-size:60px" class="fa text-center" :text="'fa-bell' | fonticon"></Label>
        </StackLayout> -->

        <Stacklayout v-if="notifications.length===0&&!isLoading" >
            <Label style="font-size:60px" class="fa text-center" :text="'fa-bell' | fonticon"></Label>
            <Label style="font-size:40px" class="fa text-center" text="You Have not any notifications Yet."></Label>
        </Stacklayout>

        <StackLayout v-if="notifications.length>0&&!isLoading" ref="myFF">
            <ListView for="notification in notifications">
                <v-template>
                    <appSingleNotification :notification="notification"/>
                </v-template>
            </ListView>
        </StackLayout>

    </Page>
</template>

<script>
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";
    import SingleNotification from "~/components/notifications/SingleNotification"
    import sideDrawer from "../mixins/sideDrawer";

    export default {
        mixins:[sideDrawer],
        components: {
            appSingleNotification: SingleNotification,
        },
        computed: {
            notifications() {
                return this.$store.getters.notifications
            }
        },
        data() {
            return {
                isLoading: false
            }
        },
        methods: {
            destroyComp() {
                this.$store.commit('CLEAR_NOTIFICATION')
            },
            showLoading() {
                this.isLoading = true
                // console.log('execured')
                popUpShowIndicator('this.$refs.myFF.android')

                this.$store.dispatch('retrieveNotification')
                    .then((res) => {
                        this.isLoading = false
                        popupHideIndicator()
                    })
                    .catch((err) => {
                        console.log('notification Not arrived')
                        popupHideIndicator()
                        // this.$navigateTo(NetworkError, {
                        //     transition: {
                        //         name: 'fade',
                        //         duration: 500
                        //     }
                        // });
                        // this.$store.dispacth('showErrorPage')
                        this.isLoading = false
                    })
            }
        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


