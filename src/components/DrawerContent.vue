<template lang="html">
  <ScrollView>
    <StackLayout width="100%">
      <Label v-if="isAuth" class="drawer-header" :text="userName"/>
      <Label v-else class="drawer-header" text="Drawer"/>

      <Label
              v-for="(page, i) in pages"
              @tap="goToPage(page.component)"
              class="drawer-item"
              :text="page.name"
              :key="i"
      />

      <Button class="drawer-close-button" @tap="closeDrawer()">Close Drawer</Button>
    </StackLayout>
  </ScrollView>
</template>

<script>
  import sideDrawer from '~/mixins/sideDrawer'
  export default {
    mixins: [sideDrawer],
    data () {
      return {
        // define our pages, making sure the component matches that defined in /app/router/index.js
        pages: [
          { name: 'Home', component: this.$routes.Home },
          { name: 'Find Jobs', component: this.$routes.FindJobs },
          { name: 'My Applications', component: this.$routes.MyApplications },
          { name: 'Notifications', component: this.$routes.Notifications },
          { name: 'Job Preference', component: this.$routes.JobPreference },
          { name: 'My Resumes', component: this.$routes.MyCvs },
        ]
      }
    },
    computed:{
      isAuth(){
        return this.$store.getters.isLoggedIn
      },
      userName(){
        if(this.isAuth){
          if(!!this.$store.getters.getUser){
            return this.$store.getters.getUser.data.attributes.name;
          }
        }
        return "Hello JobSeeker"
      }
    },
    methods: {
      goToPage (pageComponent) {
        // use the manual navigation method
        this.$navigateTo(pageComponent)
        // and we probably want to close the drawer when changing pages
        this.closeDrawer()
      }
    }
  }
</script>

<style lang="css">
</style>
