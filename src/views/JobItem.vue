<template>
  <Page @loaded="onPageLoaded">
    <ActivityIndicator :busy="!jobDetails" height="50" width="50"/>
    <ScrollView v-if="!!jobDetails">
      <StackLayout class="bg-gray-100 overflow-y-scroll text-black">

        <GridLayout rows="auto, auto" columns="70,auto" class="p-3 bg-indigo-800 text-white">

          <Image height="50"
                 width="50"
                 row="0"
                 col="0"
                 :src="jobDetails.company.data.attributes.image"
          />

          <StackLayout row="0" col="1" class="pl-4">
            <Label textWrap="true" :text="jobDetails.title" class="text-xl"/>
            <Label :text="jobDetails.company.data.attributes.name" class="text-xs"/>
          </StackLayout>

          <Label  colSpan="100%"  row="1" col="0 " :text="'Expired at: '+jobDetails.exact_expiration_date"/>
          <Label row="1" col="1" :text="jobDetails.job_type" class="text-right"/>

        </GridLayout>

        <StackLayout class="p-6">

          <Label  class="font-bold mb-2 font-serif" text="Details:"/>
          <StackLayout
            class="bg-white ml-2 mb-8 border-gray-300 border-opacity-50 border-2 divide-y-2 divide-gray-200 divide-opacity-50 space-y-4 rounded-lg p-4"
          >

            <Label textWrap="true" row="1" col="0">
              <FormattedString>
                <Span class="fa text-gray-500" :text="'fa-briefcase' | fonticon"/>
                <span text="  "/>
                <Span class="font-serif" :text="jobDetails.category.data.attributes.name"/>
              </FormattedString>
            </Label>

            <Label textWrap="true" row="1" col="0">
              <FormattedString>
                <span class="fa mr-10 text-gray-500" :text="'fa-map-marker-alt' | fonticon"/>
                <span text="  "/>
                <Span class="font-serif" :text="jobDetails.location"/>
              </FormattedString>
            </Label>

            <Label textWrap="true" row="1" col="0">
              <FormattedString class="font-serif">
                <Span class="fa text-gray-500" :text="'fa-dollar-sign' | fonticon"/>
                <span text="  "/>
                <Span
                  text="Salary From "
                />
                <Span
                  class="text-blue"
                  :text="jobDetails.min_salary"
                />
                <Span
                  text=" To "
                />
                <Span
                  class="text-blue"
                  :text="jobDetails.max_salary"
                />
              </FormattedString>
            </Label>

          </StackLayout>


          <Label class="font-bold mb-2 font-serif" text="Required Skills:"/>
          <StackLayout
            class="bg-white font-serif ml-2 mb-10 border-gray-300 border-opacity-50 divide-y-2 divide-gray-200 divide-opacity-50 space-y-4 rounded-lg border-2 p-4"
          >

            <Label textWrap="true" v-for="skill in jobDetails.skills.data" :text="skill.data.attributes.name" :key="'skill-'+skill.data.id"/>

          </StackLayout>

          <Label class="font-bold mb-2 font-serif" text="Additional Information About Job:"/>
          <label
            textWrap="true"
            class="bg-white font-serif ml-2 border-gray-300 border-opacity-50 rounded-lg p-4"
            :text="jobDetails.description"
          />

        </StackLayout>

        <Button class="nt-button"
                style="background-color:rgb(100,100,200);color:white"
                text="Apply"
                @tap="navigateToUploadedCvs"
        />

      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>

  import UploadedCvs from "./UploadedCvs";

  export default {
    name: 'JobItem',
    props: {
      jobadId: {
        type: Number,
        required:true
      },
    },
    data() {
      return {
        jobId: null,
        jobDetails: null
      }
    },
    methods: {
      onPageLoaded() {
        this.$axios.get('jobads/'+this.jobadId)
          .then(({data}) => {
            this.jobId = data.data.id
            this.jobDetails = data.data.attributes
            this.jobDetails.company.data.attributes.image = this.jobDetails.company.data.attributes.image.replace('http','https')
          })
          .catch(err => {
            console.log(err.response.data);
          })
      },
      navigateToUploadedCvs() {
        this.$showModal(UploadedCvs, {
          fullscreen: true,
          animated: true
        })
        .then(file=>{
          this.$axios.post(`jobads/${this.jobId}/applications`,{
            cv_id:file.id
          })
        })
      },
    },
  };
</script>
<style lang="">

</style>
