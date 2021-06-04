<template>
    <Page>
        <ActionBar title="Home" class="action-bar">

        </ActionBar>

        <TabView androidTabsPosition="bottom" :selectedIndex="selectedIndex" @selectedIndexChange="indexChange">
            <TabViewItem
                    title="Find"
                    iconSource="~/assets/images/search.png">
                <StackLayout orientation="vertical">
                    <FindJobs/>
                </StackLayout>
            </TabViewItem>
            <TabViewItem  title="Profile">
                <Label text="Content for Tab 22"/>
            </TabViewItem>
        </TabView>

    </Page>
</template>

<script>
    import FindJobs from "./FindJobs";
    export default {
        components:{
          FindJobs
        },
        data() {
            return {
                selectedIndex: 1
            }
        },
        methods: {
            indexChange: function (args) {
                let newIndex = args.value
                console.log('Current tab index: ' + newIndex)
            }
        }
    }
</script>

<style>
</style>
