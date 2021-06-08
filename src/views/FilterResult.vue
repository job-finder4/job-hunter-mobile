<template>
    <Page class="bg-indigo-100">
        <ActionBar>
            <NavigationButton
                    text="Go Back"
                    android.systemIcon="ic_menu_back"
                    @tap="$navigateBack"
            />
            <Label text="Results" class="text-2xl"/>
        </ActionBar>

        <!--        <ActivityIndicator :busy="isLoading" />-->
        <StackLayout ref="rdd"></StackLayout>
        <StackLayout v-if="jobs.length === 0">
            <Label text="There are No jobs Matching this criteria" class="text-2xl"/>
        </StackLayout>

        <FlexboxLayout flexDirection="column">
            <StackLayout ref="ff"></StackLayout>

            <!--      <ScrollView orientation="vertical">-->
            <!--        <FlexboxLayout flexDirection="column" v-if="jobs.length !== 0">-->
            <!--          <template v-for="item in jobs">-->
            <!--            <app-single-job :job="item" :key="item.data.id" />-->
            <!--          </template>-->
            <!--        </FlexboxLayout>-->
            <!--      </ScrollView>-->

            <RadListView
                    ref="myRad"
                    loadOnDemandMode="Manual"
                    @loadMoreDataRequested="loadMore"
                    for="item in jobs">
                <v-template>
                    <app-single-job :job="item" :key="item.data.id"/>
                </v-template>
            </RadListView>

        </FlexboxLayout>
    </Page>
</template>

<script>
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";
    import SingleJob from "~/components/jobs/SingleJob";

    export default {
        components: {appSingleJob: SingleJob},
        props: {},
        computed: {
            jobs() {
                return this.$store.getters.getAllJobads;
            },
        },
        data() {
            return {
                pagination: {
                    page: 1,
                    total: 1,
                    per_page: 5,
                    length: 1
                },
                isLoading: true
            };
        },
        methods: {
            setPaginationDetails({paginationDetails}) {
                this.isLoading = false
                this.pagination.total = paginationDetails.total
                this.pagination.per_page = paginationDetails.per_page
                this.pagination.length = paginationDetails.last_page
                this.pagination.page = paginationDetails.current_page+1
            },
            loadMore :function (args) {
                let timeout = setTimeout(this.onLoadMore(args), 100);
                clearTimeout(timeout);
            },
            onLoadMore: function (args) {
                this.pagination.page++;
                let dataLength=0

                this.$store.dispatch("getJobads", {
                        params: {
                            page: this.pagination.page,
                        },
                    })
                    .then((res) => {
                        console.log("res.data.meta.last_page")
                        console.log(res.data.meta.last_page)
                        if(this.pagination.page>=res.data.meta.last_page){
                            args.object.notifyLoadOnDemandFinished(true)
                        }
                        else{
                            args.object.notifyLoadOnDemandFinished()
                        }
                        this.setPaginationDetails({paginationDetails: res.data.meta})
                        popupHideIndicator();
                    })
                    .catch((errr) => {
                        this.isLoading = false;
                        popupHideIndicator();
                        // console.log(errr)
                    });



                console.log(dataLength)
            },
        },
        created() {
            // console.log(this.$refs.ff)
            popUpShowIndicator("this.$refs.ff.android");

            this.isLoading = true;

            this.$store
                .dispatch("getJobads", {
                    params: {
                        page: 1,
                    },
                })
                .then((res) => {
                    this.isLoading = false;
                    // console.log(res)
                    // this.$navigateTo(FilterResult);
                    popupHideIndicator();
                    // this.setPaginationDetails({ paginationDetails: res.data.meta });
                })
                .catch((errr) => {
                    this.isLoading = false;
                    popupHideIndicator();
                    // console.log(errr)
                });
        },
        destroyed(){
            this.$store.dispatch('clearJobads')
        }
    };
</script>
<style scoped></style>
