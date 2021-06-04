<template>
    <StackLayout>
        <StackLayout
                class="ma-0 pa-0 my-2 mx-2 rounded-xl bg-indigo-200">
            >
            <Label  :class="status+' text-lg fa'">
                <FormattedString>
                    <Span v-if="status==='approved'" class="fa" :text="'fa-check' | fonticon"/>
                    <Span v-if="status==='pending'" class="fa" :text="'fa-clock' | fonticon"/>
                    <Span  class="fa" :text="'fa-exclamation-circle' | fonticon"/>
                    <Span  class="fa" :text="'fa-minus-circle' | fonticon"/>
                    <Span  class="fa" :text="'fa-stop-circle' | fonticon"/>
                    <Span  class="fa" :text="'fa-stumbleupon-circle' | fonticon"/>
                    <Span :text="' '+status"/>
                </FormattedString>
            </Label>
            <Button @tap="navigateToJob"
                    androidElevation="0"
                    style="background-color:transparent;"
                    class="text-xl font-weight-bold text-blue-600 ml-2 "
                    :text="application.data.attributes.jobad.data.attributes.title"/>

            <Label class="text-lg font-weight-bold text-blue-600 ml-2">
                <FormattedString>
                    <Span :text="'applied at :'+application.data.attributes.applied_at"/>
                </FormattedString>
            </Label>

            <Label class="text-lg font-weight-bold text-blue-600 ml-2">
                <FormattedString>
                    <Span class="fa" :text="'fa-file-pdf' | fonticon"/>
                    <Span :text="' with Cv :'+application.data.attributes.cv.data.attributes.title"/>
                </FormattedString>
            </Label>
        </StackLayout>
    </StackLayout>
</template>

<script>
    import JobItem from "~/views/JobItem"

    export default {
        components: {
            JobItem
        },
        props: {
            application: {
                type: Number,
                required: true,
            },
        },
        computed: {
            status() {
                if (this.application.data.attributes.status === 1) {
                    return "Approved";
                }
                if (this.application.data.attributes.status === -1) {
                    return "Refused";
                }
                if (this.application.data.attributes.status === 0) {
                    return "Pending";
                }
            }
        },
        methods: {
            navigateToJob() {
                this.$navigateTo(JobItem,
                    {props: {jobadId: this.application.data.attributes.jobad.data.id}})
            },
        },
        created() {
            console.log(this.application)
        }
    };
</script>

<style>
    .Pending {
        color: orange;
    }

    .Approved {
        color: limegreen;
    }

    .Refused {
        color: red;
    }
</style>
