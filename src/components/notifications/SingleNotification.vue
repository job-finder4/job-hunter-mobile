<template>
    <StackLayout>
        <StackLayout
                :class="(notification.read_at == null)?'my-2 mx-2 rounded-xl bg-indigo-50':'my-2 mx-2 rounded-xl bg-indigo-200'">
            <Label :text="notificationReply(notification).title"
                   class="text-2xl font-weight-bold text-blue-600 ml-2 "></Label>

            <TextView lineHeight="0" editable="false"
                      :text="notificationReply(notification).subtitle"
                      :class="(notification.read_at == null)?'text-lg ml-1 border leading-none border-indigo-50':'text-lg ml-1 border leading-none border-indigo-200'"
            />
        </StackLayout>
    </StackLayout>
</template>

<script>
    export default {
        props: {
            notification: {
                type: Object,
                required: true
            },
        },
        methods: {
            notificationReply(notification) {
                let reply = {
                    title: 's',
                    subtitle: 's'
                }
                let inputText = notification.type
                const ApplicationApproved = "App\\Notifications\\ApplicationApproved"
                const RecommendedJob = "App\\Notifications\\RecommendedJob"

                if (inputText === ApplicationApproved) {
                    reply = {
                        title: 'Application Approved',
                        subtitle: 'Your Application on ' + notification.data.jobad_title + ' has been approved'
                    }
                }
                if (inputText === RecommendedJob) {
                    reply = {
                        title: 'we have recommendation to you :',
                        subtitle: notification.data.jobad_title
                    }
                }
                return reply
            },
        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


