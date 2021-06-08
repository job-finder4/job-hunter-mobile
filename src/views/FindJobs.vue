<template>
    <Page class="bg-indigo-100">
<!--        <ActionBar>-->
<!--            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"/>-->
<!--        </ActionBar>-->
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="openDrawer()" col="0"/>
                <Label class="title" text="Welcome"  col="1"/>
            </GridLayout>
        </ActionBar>

        <StackLayout ref="waiting"></StackLayout>

        <FlexboxLayout flexDirection="column">
            <TextField  class="text-capitalize myTextfield"
                        @focus="navigateToAutocompleteComponent"
                        :text="searchWords"
                        hint="type skills or category"/>

            <Button
                    style="margin-top:0;margin-bottom:0;text-align:left"
                    text="Filters"
                    @tap="navigateToFilter"
                    class="btn btn-white text-2xl"
            >
            </Button>
            <Button
                    style="margin-top:0;margin-bottom:0;"
                    text="Find Jobs"
                    class="btn btn-sky text-2xl"
                    @tap="findJobs"
            >
            </Button>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import sideDrawer from '~/mixins/sideDrawer'
    import AutoComplete from "~/components/AutoComplete";
    import CollapsableContainer from "~/components/CollapsableContainer";
    import FilterResult from "~/views/FilterResult";
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";
    import FilterComponent from "~/views/FilterComponent";

    export default {
        mixins: [ sideDrawer ],
        components: {
            appCollapsableContainer: CollapsableContainer,
            FilterResult,
            appAutoComplete:AutoComplete
        },
        computed:{
          searchWords(){
              let searchTermsInStringRepresentation=""

              if (this.$store.getters.getSearchParams.term.length > 0) {
                  this.$store.getters.getSearchParams.term.forEach(val => {
                      searchTermsInStringRepresentation += val + ", ";
                  })
                  return searchTermsInStringRepresentation
              }
              return ""
          }
        },
        data() {
            return {

            };
        },
        methods: {
            navigateToFilter(){
                this.$navigateTo(FilterComponent, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },
            navigateToAutocompleteComponent(){
                this.$navigateTo(AutoComplete, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },
            findJobs() {
                this.$navigateTo(FilterResult, {
                    transition: {
                        name: "fade",
                        duration: 500,
                    },
                });
            },
        },
        created(){
            // this.$store.
        }
    };
</script>
<style >
    .myTextfield{
        font-family: 'GT America';
        font-weight: 300;
        font-size: 18;
        color: #000000;
        padding: 15 20;
        border-radius: 2;

        background-color: white;

        /*font-size: 18px;*/

        /*border-top-width: 5px;*/
        /*border-top-color: white;*/
        /*border-top-left-radius: 10px;*/

        /*border-right-width: 5px;*/
        /*border-right-color: white;*/
        /*border-top-right-radius: 10px;*/

        /*border-left-width: 5px;*/
        /*border-left-color: white;*/
        /*border-bottom-left-radius: 10px;*/

        /*border-bottom-width: 5px;*/
        /*border-bottom-color: white;*/
        /*border-bottom-right-radius: 10px;*/
    }
</style>
