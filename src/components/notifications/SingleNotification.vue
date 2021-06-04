<template>
    <StackLayout @tap="navigateToJob">
        <StackLayout
                :class="(notification.read_at == null)?'my-2 mx-2 rounded-xl bg-indigo-50':'my-2 mx-2 rounded-xl bg-indigo-200'">

            <Label :text="notificationReply(notification).title"
                   class="text-xl font-weight-bold text-blue-600 ml-2 "/>

            <Label textWrap="true"
                   :text="notificationReply(notification).subtitle"
                   :class="(notification.read_at == null)?'text-lg ml-1 border leading-none border-indigo-50':'text-lg ml-1 border leading-none border-indigo-200'"/>

<!--            <Label textWrap="true" v-if="type==='ApplicationApproved'">-->
<!--                <FormattedString>-->
<!--                    <span text="'Your Application on '" class="text-lg ml-1 border leading-none border-indigo-50"/>-->
<!--                    <span class="text-lg ml-1 border leading-none border-indigo-50" style="color:blue"-->
<!--                          :text="notification.data.jobad_title"-->
<!--                          @tap="navigateToJob"/>-->
<!--                    <Button-->
<!--                            style="margin:0;padding:0"-->
<!--                            :text="notification.data.jobad_title"-->
<!--                            androidElevation="0"-->
<!--                            @tap="navigateToJob"-->
<!--                    >-->
<!--                    </Button>-->
<!--                    <span text="' has been approved'" class="text-lg ml-1 border leading-none border-indigo-50"/>-->
<!--                </FormattedString>-->
<!--            </Label>-->

        </StackLayout>
    </StackLayout>
</template>

<script>
    import JobItem from "~/views/JobItem"

    export default {
        components: {
            JobItem
        },
        computed:{
          type(){
              const ApplicationApproved = "App\\Notifications\\ApplicationApproved"
              const RecommendedJob = "App\\Notifications\\RecommendedJob"
              const inputText = this.notification.type

              if (inputText === ApplicationApproved) {
                  return "ApplicationApproved";
              }
              else if(inputText === RecommendedJob){
                  return "RecommendedJob";
              }
              return "unknown";
          }
        },
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
                    subtitle: 's',
                    jobad_id: ""
                }

                let inputText = notification.type
                const ApplicationApproved = "App\\Notifications\\ApplicationApproved"
                const RecommendedJob = "App\\Notifications\\RecommendedJob"

                if (inputText === ApplicationApproved) {
                    reply = {
                        title: 'Application Approved',
                        subtitle: 'Your Application on ' + notification.data.jobad_title + ' has been approved',
                        jobad_id: notification.data.jobad_id
                    }
                }
                if (inputText === RecommendedJob) {
                    reply = {
                        title: 'we have recommendation to you :',
                        subtitle: notification.data.jobad_title,
                        jobad_id: notification.data.jobad_id
                    }
                }
                return reply
            },
            navigateToJob() {
                if(this.type==='ApplicationApproved'||this.type==='RecommendedJob'){
                    this.$navigateTo(JobItem,
                        {props: {jobadId: this.notification.data.jobad_id}})
                }
            },
        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
</style>


