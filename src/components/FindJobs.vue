<template>
    <Page class="bg-indigo-100">
        <ActionBar>
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"/>
        </ActionBar>

        <StackLayout ref="waiting">
        </StackLayout>

        <StackLayout>
            <Button
                    style="color:white"
                    text="Find Jobs"
                    @tap="findJobs"
                    class="btn btn-outlined bg-indigo-400 text-2xl"
            ></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import CollapsableContainer from "~/components/CollapsableContainer";
    import FilterResult from "~/components/FilterResult";
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";

    export default {
        components: {
            appCollapsableContainer: CollapsableContainer,
            FilterResult,
        },
        props: {},
        computed: {},
        data() {
            return {
                locations: ["Lattakia", "Cairo", "Aleppo", "Damascus",
                    "Alabama", "Tartus", "Homs", "Port Fleta,Hong Kong"],
                jobTimes: ["FULL_TIME", "PART_TIME"],
                jobTypes: ["ON_SITE", "REMOTE"],
                filters: {
                    jobTimes: ["FULL_TIME"],
                    jobTypes: [],
                    locations: [],
                },
            };
        },
        methods: {
            findJobs(){
              console.log('hatyyyy find jobs')
            },
            cancelFilters() {
                if (Object.keys(this.filters).length === 0) {
                    return;
                }
                this.filters.jobTimes = []
                this.filters.jobTypes = []
                this.filters.locations = []
            },
            applyFilters() {
                popUpShowIndicator(this.$refs.filterComp.android)

                this.$store
                    .dispatch("getJobads", {
                        params: {
                            job_times: JSON.stringify(this.filters.jobTimes),
                            job_types: JSON.stringify(this.filters.jobTypes),
                            locations: JSON.stringify(this.filters.locations),
                            page: 1
                        }
                    })
                    .then((res) => {
                        console.log(res)
                        this.$navigateTo(FilterResult);
                        popupHideIndicator()
                        // this.setPaginationDetails({ paginationDetails: res.data.meta });
                    })
                    .catch((errr) => {
                        popupHideIndicator()
                        console.log(errr)
                        // this.$toast.error(err);
                    });
            },
        },
    };
</script>
<style scoped></style>
