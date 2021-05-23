<template>
    <Page @loaded="showLoading" @navigatingFrom="destroyComp" class="bg-indigo-100">
        <ActionBar
                title="Notifications" android:flat="true">
        </ActionBar>

        <StackLayout class="mx-8">
            <Label style="font-size:60px" class="fa text-center" :text="'fa-bell' | fonticon"></Label>
            <Label text="job.title" class="text-2xl font-weight-bold text-blue-600 ml-2 "></Label>
        </StackLayout>

        <Stacklayout id="myF" ref="myFF">
            <Label style="font-size:60px" class="fa text-center" :text="'fa-bell' | fonticon"></Label>
        </Stacklayout>

        <StackLayout v-if="notifications.length>0&&!isLoading">
            <ListView for="notification in notifications">
                <v-template>
                    <appSingleNotification :notification="notification"/>
                </v-template>
            </ListView>
        </StackLayout>

    </Page>
</template>

<script>
    import {popUpShowIndicator, popupHideIndicator} from "./LoadingIndicator";
    import SingleNotification from "./notifications/SingleNotification"
    import {showNetworkError} from "./Errors/ErrorController";
import NetworkError from "./Errors/NetworkError";
    export default {
        components: {
            appSingleNotification: SingleNotification,
            NetworkError
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
                console.log('execured')
                popUpShowIndicator('ds', this.$refs.myFF)

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


