<template>
    <Page>
        <ActionBar :title="title">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
        </ActionBar>

        <RadSideDrawer ref="drawer"
                       :drawerLocation="currentLocation"
                       :drawerTransition="transition">

            <StackLayout ~drawerContent class="sideStackLayout">
                <StackLayout class="sideTitleStackLayout">
                    <Label text="Navigation Menu"></Label>
                </StackLayout>

                <StackLayout class="sideStackLayout">
                    <Label text="Primary" class="sideLabel sideLightGrayLabel"></Label>
                    <Label text="Social" class="sideLabel"></Label>
                </StackLayout>

                <Button text="Close Drawer" @tap="onCloseDrawerTap()"></Button>
            </StackLayout>

            <StackLayout ~mainContent>
                <Button text="OPEN DRAWER" @tap="openDrawer()" class="drawerContentButton"></Button>
                <Label text="Drawer notification: " class="drawerContentText"></Label>
                <Label class="drawerContentText">{{ currentNotification }}</Label>
            </StackLayout>

        </RadSideDrawer>
    </Page>
</template>

<script>
    import Home from "./Home";
    import { Frame } from 'tns-core-modules/ui/frame';
    import { PushTransition } from 'nativescript-ui-sidedrawer';
    import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';

    export default {
        components:{
            Home
        },
        data () {
            return {
                currentLocation: SideDrawerLocation.Right,
                title: "description",
                transition: new PushTransition(),
            };
        },
        methods: {
            onNavigationButtonTap() {
                Frame.topmost().goBack();
            },
            openDrawer() {
                this.$refs.drawer.showDrawer();
            },
            onCloseDrawerTap() {
                this.$refs.drawer.closeDrawer();
            },
            onDrawerOpening(args) {
                this.currentNotification = "Drawer opening";
            },
            onDrawerOpened(args) {
                this.currentNotification = "Drawer opened";
            },
            onDrawerClosing(args) {
                this.currentNotification = "Drawer closing";
            },
            onDrawerClosed(args) {
                this.currentNotification = "Drawer closed";
            },
            onDrawerPan(args) {
                this.currentNotification = "Drawer pan";
            },
        },
    }
</script>

<style>

</style>
