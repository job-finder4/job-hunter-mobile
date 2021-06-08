<template>
    <Page class="bg-indigo-100">
        <ActionBar>
            <NavigationButton text="Go Back" android.systemIcon="ic_menu_back"/>
        </ActionBar>

        <FlexboxLayout flexDirection="column" class="pa-5 ma-5" style="padding:10px">
            <FlexboxLayout>
                <RadAutoCompleteTextView
                        @loaded="onLayoutChanged"
                        ref="myAutocomplete"
                        automationText="ac1"
                        class="ac1"
                        style="margin: 0; padding: 0"
                        width="90%"
                        :completionMode="completionMode"
                        :suggestMode="suggestMode"
                        :displayMode="displayMode"
                        :items="searchItems"
                        @didAutoComplete="onDidAutoComplete"
                        @textChanged="onTextChanged"
                        @tokenRemoved="onTokenRemoved"
                        verticalAlignment="center"
                >
                    <SuggestionView ~suggestionView suggestionViewHeight="300" style="background-color:transparent">
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
                        <Span class="fa text-2xl" :text="'fa-search' | fonticon"/>
                    </FormattedString>
                </Button>
            </FlexboxLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import CollapsableContainer from "~/components/CollapsableContainer";
    import FindJobs from "../views/FindJobs";
    import FilterResult from "~/views/FilterResult";
    import {popUpShowIndicator, popupHideIndicator} from "~/components/LoadingIndicator";
    import {ObservableArray} from "@nativescript/core/data/observable-array";
    import {
        AutoCompleteCompletionMode,
        AutoCompleteDisplayMode,
        AutoCompleteSuggestMode,
        TokenModel,
    } from "nativescript-ui-autocomplete";

    import locations from '~/static/locations.json'
    import categories from '~/static/categories.json'
    import skills from '~/static/skills.json'
    import jobsTitle from '~/static/jobsTitle.json'


    export default {
        components: {
            appCollapsableContainer: CollapsableContainer,
            FilterResult,
            FindJobs,
        },
        data() {
            return {
                suggestedLocations: locations,
                suggestedTerms: categories.map(item => item.name).concat(skills.map(item => item.name), jobsTitle),
                searchPhrase: "",
                typedText: "",
                completionMode: AutoCompleteCompletionMode.StartsWith,
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
            onLayoutChanged(args) {
                let autocomplete = args.object;
                // autocomplete.focus()
                let rad = autocomplete.android;
                let nativeEditText = rad.getTextField();
                // let currentApp = fs.knownFolders.currentApp();
                // let fontPath = currentApp.path + "/fonts/futurat.ttf";

                // nativeEditText.setTextSize(14);
                nativeEditText.setTextSize(19);
                // nativeEditText.setTypeface(android.graphics.Typeface.createFromFile(fontPath));
                nativeEditText.setPadding(10, 16, 10, 16);
                // event.object.focus();
                console.log("ddsa")
                this.$refs["myAutocomplete"].nativeView.focus();

//                 args.object.css = `
// RadAutoCompleteTextView.ac1 {
//   padding: 8;
//   margin: 10 10 5 10;
//   border-width: 3;
//   border-radius: 10;
//   font-weight: bold;
//   font-size: 20;
//   focus:true
// }
// RadAutoCompleteTextView.ac1:focus {
//   color: #00BCD4;
//   background: #303F9F;
//   border-color: #303F9F;
// }
// RadAutoCompleteTextView.ac1 ClearButton{
//   color: #00BCD4;
// }
// RadAutoCompleteTextView.ac1 SuggestionView {
//   border-width: 3;
//   border-radius: 10;
//   background-color: transparent;
//   height: 300;
// }
// RadAutoCompleteTextView.ac1 SuggestionView Label {
//   border-width: 3;
//   border-radius: 10;
//   margin: 10;
//   text-align: center;
//   padding: 10;
//   font-size: 20;
//   vertical-align: center;
// }
//       `;
            },
            findJobs() {
                console.log("fff");
            },
            getInitial() {
                this.suggestedTerms.forEach((val) => {
                    this.searchItems.push(new TokenModel(val, null));
                });
            },
            onTextChanged({text}) {
                console.log(`Text Changed: ${text}`);
                this.typedText = text;
            },
            onDidAutoComplete({text}) {
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
        /* border-radius: 10; */
        margin: 3;
        text-align: center;
        /*padding: 10;*/
        font-size: 15;
        vertical-align: center;
    }

    .search-btn {
        margin: 0;
        padding: 0;
        background-color: Transparent;
        border: none;
        outline: none;
        border-top-color: Transparent;
        border-left-color: Transparent;
        border-right-color: Transparent;
        border-bottom-color: Transparent;
    }
</style>
