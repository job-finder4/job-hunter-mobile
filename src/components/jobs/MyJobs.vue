<template>
    <Page>
        <ActionBar title="My Jobs" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Tab 1">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="msg" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <StackLayout>
                    <Label class="message" text="msg" col="0" row="0"/>
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>

    export default {
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
        },
        computed: {}
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


