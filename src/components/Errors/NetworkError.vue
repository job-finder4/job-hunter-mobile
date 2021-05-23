<template>
<!--    <page>-->
        <StackLayout class="dialog" verticalAlignment="center" horizontalAlignment="center">
            <Label style="font-size:70px" class="fa text-center" :text="'fa-broadcast-tower' | fonticon"/>
            <TextView lineHeight="0" editable="false" class="text-2xl text-center border leading-none border-white"
                      text="It Seems that You Have bad connection"/>
<!--            <Button v-if="fromComponent" text="Try Again" @tap="$navigateBack" class="nt-button"></Button>-->
            <Button  text="Try Again" @tap="$navigateBack" class="nt-button"></Button>
        </StackLayout>
<!--    </page>-->
</template>

<script>
    export default {
        props: {
            fromComponent: {
                type: String,
                required: false
            },
        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
    .dialog{
        visibility: collapse;
    }
</style>


