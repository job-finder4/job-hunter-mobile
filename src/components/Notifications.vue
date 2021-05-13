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

        <ActivityIndicator busy="true"/>

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
    import {popUpShow, popupHide} from "./LoadingIndicator";
    import SingleNotification from "./notifications/SingleNotification"

    export default {
        components: {
            appSingleNotification: SingleNotification
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
                popUpShow('ds', this.$refs.myFF)

                this.$store.dispatch('retrieveNotification')
                    .then((res) => {
                        console.log(this.notifications)
                        this.isLoading = false
                        popupHide()
                    })
                    .catch((err) => {
                        popupHide()
                        this.isLoading = false
                        console.log('errorr45545')
                    })
            }
        },
        computed: {
            notifications() {
                return this.$store.getters.notifications
            }
        }
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


