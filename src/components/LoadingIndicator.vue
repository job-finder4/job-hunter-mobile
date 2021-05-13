<template>

</template>

<script>
    const LoadingIndicator = require('@nstudio/nativescript-loading-indicator')
        .LoadingIndicator;
    const Mode = require('@nstudio/nativescript-loading-indicator').Mode;

    const loader = new LoadingIndicator();

    export const popUpShow = function (message, someStackLayout) {
        const options = {
            message: 'Loading...',
            details: 'Additional detail note!',
            progress: 0.65,
            margin: 10,
            dimBackground: true,
            color: '#4B9ED6', // color of indicator and labels
            // background box around indicator
            // hideBezel will override this if true
            backgroundColor: 'yellow',
            userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
            hideBezel: true, // default false, can hide the surrounding bezel
            mode: Mode.Indeterminate, // see options below
            android: {
                view: someStackLayout.android,// Target view to show on top of (Defaults to entire window)
                // view: android.view.View, // Target view to show on top of (Defaults to entire window)
                cancelable: true,
                cancelListener: function (dialog) {
                    console.log('Loading cancelled');
                },
            },
        };
        loader.show(options); // options is optional
    }
    export const popupHide = function () {
        loader.hide();
    }

    export default {
        setup() {
            return {
                popupMessage, popupVisible, popupHide
            }
        }
    }
</script>


