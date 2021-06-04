<template>
    <Page>
        <GridLayout rows="*, auto">
            <StackLayout row="0">
                <label text="content"></label>
            </StackLayout>
            <BottomNavigationBar
                    activeColor="red"
                    inactiveColor="yellow"
                    backgroundColor="black"
                    @tabSelected="onBottomNavigationTabSelected"
                    row="1"
            >
                <BottomNavigationTab title="First" icon="ic_home" />
                <BottomNavigationTab
                        title="Second"
                        icon="ic_view_list"
                        isSelectable="false"
                />
                <BottomNavigationTab title="Third" icon="ic_menu" />
            </BottomNavigationBar>
        </GridLayout>

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
            onBottomNavigationTabSelected: function (args) {
                let newIndex = args.value
                console.log('Current tab index: ' + newIndex)
            }
        }
    }
</script>

<style>
</style>
