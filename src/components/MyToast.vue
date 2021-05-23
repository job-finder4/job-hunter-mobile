<template>

</template>

<script>
    import {ToastPosition, Toasty} from "@triniwiz/nativescript-toasty"

    export const popUpShowToast = function (message) {
        new Toasty({text: message})
            .setToastPosition(ToastPosition.TOP)
            .setBackgroundColor('#91e773')
            .show();
    }
    export const popupHideToast = function () {
        // popupVisible.value = false
    }

    export default {
        setup() {
            return {
                popupMessage, popupVisible, popupHideToast
            }
        }
    }
</script>
