<template>
  <Page class="bg-indigo-100">
    <ActionBar>
      <NavigationButton
        text="Go Back"
        android.systemIcon="ic_menu_back"
        @tap="$navigateBack"
      />
      <Label text="Results" class="text-2xl" />
    </ActionBar>

    <!--        <ActivityIndicator :busy="isLoading" />-->
    <StackLayout ref="rdd"> </StackLayout>
    <StackLayout v-if="jobs.length === 0">
      <Label text="There are No jobs Matching this criteria" class="text-2xl" />
    </StackLayout>

    <FlexboxLayout flexDirection="column">
      <StackLayout ref="ff"> </StackLayout>

      <ScrollView orientation="vertical">
        <FlexboxLayout flexDirection="column" v-if="jobs.length !== 0">
          <template v-for="item in jobs">
            <app-single-job :job="item" :key="item.data.id" />
          </template>
        </FlexboxLayout>
      </ScrollView>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { popUpShowIndicator, popupHideIndicator } from "~/components/LoadingIndicator";
import SingleJob from "~/components/jobs/SingleJob";

export default {
  components: { appSingleJob: SingleJob },
  props: {},
  computed: {
    jobs() {
      return this.$store.getters.getAllJobads;
    },
  },
  data() {
    return { isLoading: true };
  },
  methods: {
    onBackTap() {
      console.log("d");
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
};
</script>
<style scoped></style>
