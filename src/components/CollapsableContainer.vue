<template>
  <StackLayout style="background-color:white;" class="mx-2 pa-0">
    <!-- <Label @tap="elementLoaded" class="text-xl">
      <FormattedString>
        <Span :text="title" fontAttributes="Bold"></Span>
        <Span class="fa" :text="'fa-arrow-down' | fonticon" />
      </FormattedString>
    </Label> -->

    <FlexboxLayout style="width:100%" class="ma-0 pa-0"  alignContent="center" alignItems="center">
      <Button
              width="100%"
              androidElevation="1"
              class="myBtn border-b-2 border-t-2 border-grey-600 divide-y divide-blue-400 btn-outlined"
              style="text-align: left;background-color:white; margin:0;"
              @tap="elementLoaded" >
        <FormattedString>
          <Span  :text="title"  class="text-xl"></Span>
<!--          <Span   v-if="visible" class="fa" :text="'fa-arrow-down' | fonticon" />-->
<!--          <Span   v-if="!visible" class="fa" :text="'fa-arrow-up' | fonticon" />-->
        </FormattedString>
      </Button>

      <Button
              style="margin:0;padding:0"
              class="myBtn border-b-2 border-t-2 border-grey-600 divide-y divide-blue-400 btn-outlined"
              androidElevation="1"
              @tap="elementLoaded">
        <FormattedString>
          <Span   v-if="visible" class="fa" :text="'fa-angle-down' | fonticon" />
          <Span   v-if="!visible" class="fa" :text="'fa-angle-up' | fonticon" />
        </FormattedString>
      </Button>
    </FlexboxLayout>


    <CollapseItem
      ref="myElement"
      :class="visible ? 'dropDownCheckboxGroup' : ''"
      :visible="visible"
    >
      <slot></slot>
    </CollapseItem>
  </StackLayout>
</template>

<script>
import CollapseItem from "~/components/CollapseItem";

export default {
  name:'CollapsableContainer',
  components: { CollapseItem },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    elementLoaded() {
      console.log(this.$refs.myElement.style);
      // if (this.visible) {
      //   this.$refs.myElement.nativeView
      //     .animate({ duration: 500, translate: { x: 0, y: -5 } })
      //     .then(() =>
      //       this.$refs.myElement.nativeView.animate({
      //         duration: 500,
      //         translate: { x: 0, y: -15 },
      //       })
      //     );
      // }
      this.visible = !this.visible;
    },
  },
};
</script>
<style scoped>
.dropDownCheckboxGroup {
  animation-name: dropDownAnimation;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  transition:all 2s;
}
/* @keyframes dropDownAnimation {
  0% {
    transform: scale(0, 0.5);
  }
  100% {
    transform: scale(0,1)
  }
} */
@keyframes dropDownAnimation {
  0% {
    transform: translate(0, -10);
  }
  25% {
    transform: translate(0, -7.5);
  }
  50% {
    transform: translate(0, -5);
  }
  75% {
    transform: translate(0, -2.5);
  }
  100% {
    transform: translate(0, 0);
  }
}

.fa {
  font-family: FontAwesome, fontawesome-webfont ;
}
  .myBtn{
    border-left-color: transparent;
    border-right-color: transparent;
    border-width: 1;
    z-index: 0;
  }
.myBtn:active {
  border-left-color: transparent;
  border-right-color: transparent;
  border-width: 1;
  z-index: 0;
}
</style>
