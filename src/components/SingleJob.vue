<template>
    <StackLayout>
        <StackLayout class="my-2 mx-2 rounded-xl bg-indigo-50">
            <TextView editable="false" lineHeight="0"
                      class="text-2xl text-blue-600 ml-1 border leading-none"
                      v-model="job.data.attributes.title"/>
            <!--        <Label-->
            <!--        :text="job.data.attributes.title"-->
            <!--        class="text-2xl font-weight-bold text-blue-600 ml-2"-->
            <!--      ></Label>-->
            <StackLayout class="mx-8">
                <Label :text="job.data.attributes.company.data.attributes.name" class="text-lg"></Label>

                <!--        <FlexboxLayout alignItems="center">-->
                <Label>
                    <FormattedString>
                        <Span class="fa" :text="'fa-map-marker' | fonticon"/>
                        <Span class="text-xl" :text="job.data.attributes.location"></Span>
                    </FormattedString>
                </Label>
                <Label>
                    <FormattedString>
                        <Span class="fa" :text="'fa-calendar' | fonticon"/>
                        <Span class="text-xl" :text="job.data.attributes.approved_at"></Span>
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
    export default {
        props: {
            job: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>
