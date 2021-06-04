<template>
  <Page class="bg-indigo-100">
    <ActionBar>
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>

      <FlexboxLayout
        align="right"
        justifyContent="flex-end"
        alignItems="center"
        style="width: 100%;"
      >
        <Label text="Filter" class="text-2xl" />
        <Button
          style="color: blue; margin-left: auto"
          text="clear"
          @tap="cancelFilters"
          class="btn btn-outlined bg-indigo-400 text-2xl"
        ></Button>
      </FlexboxLayout>
    </ActionBar>

    <StackLayout ref="filterComp"> </StackLayout>

    <StackLayout>
      <appCollapsableContainer class="my-1" title="Job Time">
        <CheckboxGroupd :items="jobTimes" v-model="filters.jobTimes" />
      </appCollapsableContainer>

      <appCollapsableContainer class="my-1" title="Job Types">
        <CheckboxGroupd :items="jobTypes" v-model="filters.jobTypes" />
      </appCollapsableContainer>

      <appCollapsableContainer class="my-1" title="Locations">
        <CheckboxGroupd :items="locations" v-model="filters.locations" />
      </appCollapsableContainer>

<!--      <appCollapsableContainer class="my-1" title="Locations">-->
<!--        <CheckboxGroupd :items="categories" v-model="filters.locations" />-->
<!--      </appCollapsableContainer>-->

      <Button
        style="color: white"
        text="Apply Filters"
        @tap="applyFilters"
        class="btn btn-outlined bg-indigo-400 text-2xl"
      ></Button>
    </StackLayout>
  </Page>
</template>

<script>
import CollapsableContainer from "~/components/CollapsableContainer";
import FilterResult from "~/views/FilterResult";
import { popUpShowIndicator, popupHideIndicator } from "~/components/LoadingIndicator";

export default {
  components: {
    appCollapsableContainer: CollapsableContainer,
    FilterResult,
  },
  props: {},
  computed: {},
  data() {
    return {
      categories:[

      ],
      locations: [
        "Lattakia",
        "Cairo",
        "Aleppo",
        "Damascus",
        "Alabama",
        "Tartus",
        "Homs",
        "Port Fleta,Hong Kong",
        "West Josue, Panama"
      ],
      jobTimes: ["FULL_TIME", "PART_TIME"],
      jobTypes: ["ON_SITE", "REMOTE"],
      filters: {
        jobTimes: [],
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
      this.filters.jobTimes = [];
      this.filters.jobTypes = [];
      this.filters.locations = [];
    },
    applyFilters() {
        let p={};
      if (this.filters.jobTimes.length > 0) {
          p.job_times=JSON.stringify(this.filters.jobTimes)
      }
      if (this.filters.locations.length > 0) {
        p.locations=JSON.stringify(this.filters.locations)
      }
      if (this.filters.jobTypes.length > 0) {
        p.job_types=JSON.stringify(this.filters.jobTypes)
      }
      this.$store.commit("SET_FILTER_PARAMS", {
        ...p
      });

      this.$navigateTo(FilterResult, {
        transition: {
          name: "fade",
          duration: 500,
        },
      });
    },
  },
};
</script>
<style scoped></style>
