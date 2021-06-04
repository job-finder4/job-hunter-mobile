<template>
    <Page class="bg-indigo-100" id="myDani">
<!--        <ActionBar>-->
<!--            <NavigationButton android.systemIcon="ic_menu_back" @tap="showDrawer"/>-->
<!--            <Label text="Home" class="text-2xl"/>-->
<!--        </ActionBar>-->
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Welcome"  col="1"/>
            </GridLayout>
        </ActionBar>




        <StackLayout>
            <Button text="Connect" @tap="navigateToFindJobs" class="nt-button"></Button>
            <Button text="Notifications" @tap="navigate" class="nt-button"></Button>
            <Button text="my applications" @tap="navigateToMyApplications" class="nt-button"></Button>
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
    import sideDrawer from '~/mixins/sideDrawer'
    import SingleJob from "~/components/jobs/SingleJob";
    import {messaging, Message} from "@nativescript/firebase/messaging";
    import {LocalNotifications} from "nativescript-local-notifications";
    import Notifications from "~/views/Notifications";
    import MyJobs from "~/components/jobs/MyJobs";
    import {popUpShow, popupHide} from "../components/LoadingIndicator";
    import FindJobs from "~/views/FindJobs";
    import MyApplications from "~/views/MyApplications"
    import {Frame} from 'tns-core-modules/ui/frame';
    import {PushTransition} from 'nativescript-ui-sidedrawer';
    import UploadedCvs from "./UploadedCvs";

    const description = 'Events';

    export default {
        mixins: [ sideDrawer ],
        components: {
            appSingleJob: SingleJob,
            appNotifications: Notifications,
            appMyJobs: MyJobs,
            FindJobs,
            appMyApplications: MyApplications
        },
        computed: {
            message() {
                return "You Are At Home";
            },
        },
        data() {
            return {
                transition: new PushTransition(),
                title: "description",
                currentNotification: 's',
                jobs: [
                    {
                        title: "FullStack Developer",
                        location: "Latakia",
                        company: "Z Projects",
                        approved_at: "3 hours ago",
                    },
                    {
                        title: "Web Designer",
                        location: "Latakia",
                        company: "Z Projects",
                        approved_at: "3 hours ago",
                    },
                    {
                        title: "Database Manager",
                        location: "Homs",
                        company: "T-Mobile",
                        approved_at: "2 minutes ago",
                    },
                ],
            };
        },
        methods: {
            printTest() {
                console.log(this.selectedJobTimes);
            },
            navigateToFindJobs() {
                this.$navigateTo(FindJobs, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },
            navigateToMyApplications() {
                this.$navigateTo(MyApplications, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },
            navigate() {
                this.$navigateTo(Notifications, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },

            onLogin() {
                this.$store.dispatch("subscribeForNotifications");
            },
            scheduleNotification(notification) {
                LocalNotifications.schedule([
                    {
                        id: 1,
                        title: notification.title,
                        subtitle: "This poster is awesome!",
                        body:
                            "The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app.",
                        bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
                        color: new Color("cyan"),
                        image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
                        thumbnail:
                            "https://2.bp.blogspot.com/-H_SZ3nAmNsI/VrJeARpbuSI/AAAAAAAABfc/szsV7_F609k/s200/emoji.jpg",
                        forceShowWhenInForeground: true,
                        channel: "vue-channel",
                        ticker: "Special ticker text for Vue (Android only)",
                        sound: "customsound-ios.wav",
                        at: new Date(new Date().getTime() + 500),
                        actions: [
                            {
                                id: "yes",
                                type: "button",
                                title: "Yes (and launch app)",
                                launch: true,
                            },
                            {
                                id: "no",
                                type: "button",
                                title: "No",
                                launch: false,
                            },
                        ],
                    },
                ])
                    .then(() => {
                        console.log("local notifciation scheduled");
                    })
                    .catch((error) => console.log("doSchedule error: " + error));
            },
        }
    };
</script>
<style>
    .info {
        font-size: 20;
        horizontal-align: center;
        vertical-align: center;
    }

    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>
