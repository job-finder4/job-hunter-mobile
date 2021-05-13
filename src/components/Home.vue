<template>
    <Page class="bg-indigo-100" id="myDani" @loaded="showLoading">
        <ActionBar>
            <Label text="Home" class="text-2xl"/>
        </ActionBar>
        <GridLayout>
            <Label class="info">
                <FormattedString>
                    <Span class="fas" text.decode="&#xf135; "/>
                    <Span :text="message"/>
                </FormattedString>
            </Label>
        </GridLayout>
        <StackLayout ref="myF" >

        </StackLayout>
<!--        <ActivityIndicator busy="true" @busyChange="onBusyChanged" />-->
        <StackLayout>
            <Button text="Connect" @tap="onLogin" class="nt-button"></Button>
            <Button text="Notifications" @tap="navigate" class="nt-button"></Button>
            <Button text="my jobs" @tap="navigateToJobs" class="nt-button"></Button>
        </StackLayout>

        <!--        <StackLayout>-->
        <!--            <ListView  for="item in jobs">-->
        <!--                <v-template>-->
        <!--                    <app-single-job :job="item"/>-->
        <!--                </v-template>-->
        <!--            </ListView>-->
        <!--        </StackLayout>-->
    </Page>
</template>

<script>
    import SingleJob from "./SingleJob";
    import {messaging, Message} from "@nativescript/firebase/messaging";
    import {Color} from "tns-core-modules/color";
    import {LocalNotifications} from "nativescript-local-notifications";
    import Notifications from "./Notifications";
    import MyJobs from "./jobs/MyJobs";
    import NetworkError from "./Errors/NetworkError";
    import { popUpShow,popupHide } from "../components/LoadingIndicator";

    export default {
        components: {
            appSingleJob: SingleJob,
            appNotifications: Notifications,
            appMyJobs: MyJobs,
            appNetworkError: NetworkError
        },
        computed: {
            message() {
                return "You Are At Home";
            }
        },
        data() {
            return {
                jobs: [
                    {
                        title: 'FullStack Developer',
                        location: 'Latakia',
                        company: 'Z Projects',
                        approved_at: '3 hours ago'
                    },
                    {
                        title: 'Web Designer',
                        location: 'Latakia',
                        company: 'Z Projects',
                        approved_at: '3 hours ago'

                    },
                    {
                        title: 'Database Manager',
                        location: 'Homs',
                        company: 'T-Mobile',
                        approved_at: '2 minutes ago'
                    }
                ]
            }
        },
        methods: {
            navigateToJobs(){
                this.$navigateTo(NetworkError, {
                    transition: {
                        name: 'fade',
                        duration: 500
                    }
                })
            },
            navigate() {
                this.$navigateTo(Notifications, {
                    transition: {
                        name: 'fade',
                        duration: 500
                    }
                })
            },
            onLogin() {
                this.$store.dispatch('subscribeForNotifications')
            },
            scheduleNotification(notification) {
                LocalNotifications.schedule(
                    [{
                        id: 1,
                        title: notification.title,
                        subtitle: 'This poster is awesome!',
                        body: 'The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app.',
                        bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
                        color: new Color("cyan"),
                        image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                        thumbnail: "https://2.bp.blogspot.com/-H_SZ3nAmNsI/VrJeARpbuSI/AAAAAAAABfc/szsV7_F609k/s200/emoji.jpg",
                        forceShowWhenInForeground: true,
                        channel: "vue-channel",
                        ticker: "Special ticker text for Vue (Android only)",
                        sound: "customsound-ios.wav",
                        at: new Date(new Date().getTime() + (500)), // 5 seconds from now
                        actions: [
                            {
                                id: "yes",
                                type: "button",
                                title: "Yes (and launch app)",
                                launch: true
                            },
                            {
                                id: "no",
                                type: "button",
                                title: "No",
                                launch: false
                            }
                        ]
                    }])
                    .then(() => {
                        console.log('local notifciation scheduled')
                    })
                    .catch(error => console.log("doSchedule error: " + error));
            },
            showLoading() {
                console.log('execured')
                popUpShow('ds', this.$refs.myF)

                this.$store.dispatch('retrieveNotification')
                    .then((res) => {
                        console.log(this.notifications)
                        popupHide()
                    })
                    .catch((err) => {
                        popupHide()
                        console.log('errorr45545')
                    })
            }
        },
    };
</script>
<style scoped lang="scss">
    @import '~@nativescript/theme/scss/variables/blue';

    // Custom styles
    .fas {
        @include colorize($color: accent);
    }

    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }
</style>
