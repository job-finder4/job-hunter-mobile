<template>
    <Page>

        <TabView :selectedIndex="selectedIndex">
            <TabViewItem title="uploaded cvs">
                <UploadedCvs :action-buttons="false" :select-able="false"/>
            </TabViewItem>
            <TabViewItem title="downloaded cvs">
                <DownloadedCvs/>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import DownloadedCvs from "../components/cvFiles/DownloadedCvs";
    import UploadedCvs from "./UploadedCvs";
    import sideDrawer from "../mixins/sideDrawer";

    export default {
        mixins: [sideDrawer],
        name: 'myCvs',
        components: {UploadedCvs, DownloadedCvs},
        data() {
            return {
                selectedIndex: 0
            }
        },
    }
</script>
