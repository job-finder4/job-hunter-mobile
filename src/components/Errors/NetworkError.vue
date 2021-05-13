<template>
    <page>
        <StackLayout verticalAlignment="center" horizontalAlignment="center">

                <Label  style="font-size:70px" class="fa text-center" :text="'fa-broadcast-tower' | fonticon"/>
                <TextView lineHeight="0" editable="false" class="text-2xl text-center border leading-none border-white"
                          text="It Seems that You Have bad connection"/>

        </StackLayout>
    </page>
</template>

<script>
    export default {
        methods: {

        },
    }
</script>

<style>
    .fa {
        font-family: FontAwesome, fontawesome-webfont;
    }
    .mdi {
        font-family: "MaterialDesignIcons", materialdesignicons-webfont;
    }
</style>


