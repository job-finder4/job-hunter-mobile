<template>
    <Page class="bg-indigo-100">
        <ActionBar>
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
            <Label text="Results" class="text-2xl"/>
        </ActionBar>

        <StackLayout v-if="jobs.length === 0">
            <Label text="There are No jobs Matching this criteria" class="text-2xl"/>
        </StackLayout>

        <ScrollView orientation="vertical">
                <FlexboxLayout flexDirection="column" v-if="jobs.length !== 0">
                    <template v-for="item in jobs">
                        <app-single-job :job="item" :key="item.data.id"/>
                    </template>
                </FlexboxLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import SingleJob from "~/components/SingleJob";

    export default {
        components: {appSingleJob: SingleJob},
        props: {},
        computed: {
            jobs() {
                return this.$store.getters.getAllJobads;
            },
        },
        data() {
            return {};
        },
        methods: {
            onBackTap() {
                console.log('d')
            },
        },
    };
</script>
<style scoped></style>
