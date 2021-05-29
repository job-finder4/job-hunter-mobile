<template>
  <Page class="bg-indigo-100">
    <ActionBar>
      <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" />
    </ActionBar>

    <FlexboxLayout flexDirection="column" class="pa-5 ma-5" style="padding:5px">
      <FlexboxLayout style="width: 100%;"   >
        <RadAutoCompleteTextView
          ref="myAutoComplete"
          @layoutChanged="onLayoutChanged"
          style="margin: 0; padding: 0"
          width="99%"
          class="myTextfield"
          :completionMode="completionMode"
          :suggestMode="suggestMode"
          :displayMode="displayMode"
          :items="searchItems"
          @didAutoComplete="onDidAutoComplete"
          @textChanged="onTextChanged"
          @tokenRemoved="onTokenRemoved"
          verticalAlignment="center"
        >
          <SuggestionView ~suggestionView suggestionViewHeight="300">
            <StackLayout v-suggestionItemTemplate orientation="vertical">
              <v-template>
                <Label class="myLabel" :text="item.text"></Label>
              </v-template>
            </StackLayout>
          </SuggestionView>
        </RadAutoCompleteTextView>

        <Button
          @tap="search"
          class="search-btn"
          androidElevation="0"
        >
          <FormattedString>
            <Span class="fa text-2xl" :text="'fa-search' | fonticon" />
          </FormattedString>
        </Button>
      </FlexboxLayout>
    </FlexboxLayout>
  </Page>
</template>

<script>
import CollapsableContainer from "~/components/CollapsableContainer";
import FindJobs from "./FindJobs";
import FilterResult from "~/components/FilterResult";
import { popUpShowIndicator, popupHideIndicator } from "~/components/LoadingIndicator";
import { ObservableArray } from "@nativescript/core/data/observable-array";
import {
  AutoCompleteCompletionMode,
  AutoCompleteDisplayMode,
  AutoCompleteSuggestMode,
  TokenModel,
} from "nativescript-ui-autocomplete";
import Notifications from "./Notifications";

export default {
  components: {
    appCollapsableContainer: CollapsableContainer,
    FilterResult,
    FindJobs,
  },
  data() {
    return {
      searchPhrase: "",
      typedText: "",
      completionMode: AutoCompleteCompletionMode.Contains,
      suggestMode: AutoCompleteSuggestMode.Suggest,
      displayMode: AutoCompleteDisplayMode.Tokens,
      searchItems: new ObservableArray(),
      selectedItems: [],
      searchData: "",
    };
  },
  methods: {
    onTokenRemoved(e) {
      let idx = this.selectedItems.findIndex((value) => value === e.text);
      this.selectedItems.splice(idx, 1);
    },
    search() {
      let searchTermsInStringRepresentation = "";

      if (this.selectedItems.length > 0) {
        this.selectedItems.forEach((val) => {
          searchTermsInStringRepresentation += val + ", ";
        });
        // console.log(c)
        this.$store.commit("SET_SEARCH_PARAMS", {
          location: this.location,
          term: this.selectedItems,
        });
      } else {
        this.$store.commit("SET_SEARCH_PARAMS", {
          location: this.location,
          term: [this.typedText],
        });
      }

      this.$navigateTo(FindJobs, {
        transition: {
          name: "fade",
          duration: 500,
        },
      });
    },
    onLayoutChanged(event) {
      event.object.focus();
      console.log("ddsa")    },
    findJobs() {
      console.log("fff");
    },
    getInitial() {
      const dataSearch = [
        "Aldous Huxley",
        "Per Gynt",
        "Karolina Allison",
        "Cyrus Sheehan",
        "Beatrix Castillo",
        "Tammy Avery",
        "Aryan Atherton",
        "Florin Esco",
        "Romy Akhtar",
        "Test Test",
        "Sturgis P.Sturgeon",
        "Jules Metcalfe",
        "Abby Dawe",
        "Aron Myr",
        "Tori Kenny",
        "Richard Patclark",
        "Tess Meza",
      ];
      dataSearch.forEach((val) => {
        this.searchItems.push(new TokenModel(val, null));
      });
    },
    onTextChanged({ text }) {
      console.log(`Text Changed: ${text}`);
      this.typedText = text;
    },
    onDidAutoComplete({ text }) {
      console.log(`DidAutoComplete with text: ${text}`);

      if (!this.selectedItems.contains) {
        this.selectedItems.push(text);
      }
    },
    onTokensSelected(e) {
      // console.log(e)
      // let idx=this.searchItems.indexOf(e);
      // this.searchItems.splice(idx,1)
      // console.log(this.searchItems)

      this.$navigateTo(FindJobs, {
        transition: {
          name: "fade",
          duration: 500,
        },
      });
    },
  },
  created() {
    this.getInitial();

  },
};
</script>
<style scoped>
.myBtn:active {
  border-left-color: red;
  border-right-color: red;
  border-top-color: red;
  border-bottom-color: red;
  border-width: 3px;
  z-index: 0;
}

.myBtn {
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: black;
  border-bottom-color: black;
  border-width: 1;
  z-index: 0;
}

.myLabel {
  border-width: 3;
  /* border-radius: 10; */
  /*margin: 10;*/
  text-align: center;
  /*padding: 10;*/
  font-size: 15;
  vertical-align: center;
}
.search-btn{
    margin: 0; padding: 0;background-color: Transparent;border: none;outline:none;
    border-top-color: Transparent;
    border-left-color: Transparent;
    border-right-color: Transparent;
    border-bottom-color: Transparent;
}
</style>
