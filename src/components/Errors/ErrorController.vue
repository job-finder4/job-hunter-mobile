<template>

</template>

<script>
    import NetworkError from "~/components/Errors/NetworkError";
    export const showNetworkError = function() {
        console.log('ddd')
        this.$navigateTo(NetworkError, {
            transition: {
                name: 'fade',
                duration: 500
            }
        })
    }
    export const popupHideToast = function () {
        // popupVisible.value = false
    }

    export default {
        components:{
          NetworkError
        },
        setup(){
            return {
                popupMessage, popupVisible, popupHideToast
            }
        }
    }
</script>


