<template>

</template>

<script>
    import {ToastPosition, Toasty} from "@triniwiz/nativescript-toasty"

    export const popUpShow = function(message) {
        new Toasty({ text: message })
            .setToastPosition(ToastPosition.TOP)
            .setBackgroundColor('#ff9999')
            .show();
    }
    export const popupHide = function () {
        // popupVisible.value = false
    }

    export default {
        setup(){
            return {
                popupMessage, popupVisible, popupHide
            }
        }
    }
</script>


