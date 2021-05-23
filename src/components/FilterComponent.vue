<template>
    <Page class="bg-indigo-100">
        <ActionBar>
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"/>

            <FlexboxLayout justifyContent="flex-end" alignItems="center" style="width:100%;background-color:red;">
                <Label text="Filter" class="text-2xl"/>
                <Button
                        style="color:blue; margin-left:auto"
                        text="clear"
                        @tap="cancelFilters"
                        class="btn btn-outlined bg-indigo-400 text-2xl"
                ></Button>
            </FlexboxLayout>
        </ActionBar>

        <StackLayout ref="filterComp">
        </StackLayout>

        <StackLayout>
            <appCollapsableContainer class="my-1" title="Job Time">
                <CheckboxGroupd :items="jobTimes" v-model="filters.jobTimes"/>
            </appCollapsableContainer>

            <appCollapsableContainer class="my-1" title="Job Types">
                <CheckboxGroupd :items="jobTypes" v-model="filters.jobTypes"/>
            </appCollapsableContainer>

            <appCollapsableContainer class="my-1" title="Locations">
                <CheckboxGroupd :items="locations" v-model="filters.locations"/>
            </appCollapsableContainer>


            <Button
                    style="color:white"
                    text="Apply Filters"
                    @tap="applyFilters"
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
