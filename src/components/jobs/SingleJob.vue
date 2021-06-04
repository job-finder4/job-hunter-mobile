<template>
    <StackLayout>
        <StackLayout class="my-2 mx-2 rounded-xl bg-indigo-50">
<!--            <Label textWrap="true"-->
<!--                      class="text-2xl text-blue-600 ml-1 "-->
<!--                      v-model="job.data.attributes.title"/>-->
            <Button @tap="navigateToJob"
                    androidElevation="0"
                    style="background-color:transparent;"
                    class="text-xl font-weight-bold text-blue-600 ml-2 "
                    :text="job.data.attributes.title"/>
            <!--        <Label-->
            <!--        :text="job.data.attributes.title"-->
            <!--        class="text-2xl font-weight-bold text-blue-600 ml-2"-->
            <!--      ></Label>-->
            <StackLayout class="mx-8">
                <Label textWrap="true" :text="job.data.attributes.company.data.attributes.name"
                       class="text-lg"></Label>

                <!--        <FlexboxLayout alignItems="center">-->
                <Label textWrap="true">
                    <FormattedString>
                        <Span style="font-size: 18px" class="fa" :text="'fa-map-marker' | fonticon"/>
                        <Span  class="text-xl" :text="' '+job.data.attributes.location"></Span>
                    </FormattedString>
                </Label>
                <Label textWrap="true">
                    <FormattedString>
                        <Span style="font-size: 18px" class="fa" :text="'fa-calendar' | fonticon"/>
                        <Span class="text-xl" :text="' '+job.data.attributes.approved_at"></Span>
                    </FormattedString>
                </Label>
                <!--        </FlexboxLayout>-->

                <!--        <FlexboxLayout alignItems="center">-->
                <!--          <Label class="fa" :text="'fa-money-bill' | fonticon" />F-->
                <!--          <Label :text="job.approved_at" class="text-xl"></Label>-->
                <!--        </FlexboxLayout>-->
            </StackLayout>
        </StackLayout>
    </StackLayout>
</template>

<script>
    import JobItem from "~/views/JobItem"

    export default {
        components:{
            JobItem
        },
        props: {
            job: {
                type: Object,
                required: true,
            },
        },
        methods: {
            navigateToJob() {
                this.$navigateTo(JobItem, {props: {jobadId: this.job.data.id}})
            },
        },
    };
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>
