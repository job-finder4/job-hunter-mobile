<template>
    <StackLayout >
        <StackLayout class="my-2 mx-2 rounded-xl bg-indigo-50 ">
            <Label :text="job.title" class="text-2xl font-weight-bold text-blue-600 ml-2 "></Label>
            <StackLayout class="mx-8">
                <Label :text="job.company" class="text-lg "></Label>

                <FlexboxLayout  alignItems="center">
                    <FlexboxLayout alignItems="center">
                        <Label class="fa" :text="'fa-map-marker' | fonticon"></Label>
                        <Label :text="job.location" class="text-lg ml-1"></Label>
                    </FlexboxLayout>
                    <FlexboxLayout class="ml-2" alignItems="center">
                        <Label class="fa " :text="'fa-calendar' | fonticon"/>
                        <Label :text="job.approved_at" class="text-lg ml-1"></Label>
                    </FlexboxLayout>
                </FlexboxLayout>

                <FlexboxLayout alignItems="center">
                    <Label class="fa " :text="'fa-money-bill' | fonticon"/>
                    <Label :text="job.approved_at" class="text-xl"></Label>
                </FlexboxLayout>

            </StackLayout>
        </StackLayout>
    </StackLayout>
</template>

<script>
    export default {
        props: {
            job: {
                type: Object,
                required: true
            },
        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


