<template>
    <Page>
        <ActionBar title="Login" class="action-bar"/>
        <GridLayout>
            <FlexboxLayout flexDirection="column" justifyContent="center">
                <Image src="~/assets/images/q.svg" class="logo-container "/>

                <StackLayout class="container">
                    <StackLayout alignItems="center" class="border-bottom">
                        <Image src="~/assets/images/icon_user.png" width="16" height="16"/>
                        <TextField v-model="credentials.email" hint="Username"/>
                    </StackLayout>

                    <StackLayout class="border-bottom">
                        <Image src="~/assets/images/icon_lock.png" width="16" height="16"/>
                        <TextField v-model="credentials.password" hint="Password" secure="true"/>
                    </StackLayout>

                    <Button text="Login" @tap="onLogin" class="my-button"/>

                    <FlexboxLayout alignItems="center" justifyContent="space-between" class="auth-buttons">
                        <Label horizontalAlignment="left" text="Create Account"/>
                        <Label horizontalAlignment="right" text="Forgot Password"/>
                    </FlexboxLayout>
                </StackLayout>
            </FlexboxLayout>
        </GridLayout>
    </Page>
</template>

<script>
    import Home from "./Home";

    export default {
        data() {
            return {
                msg: 'Hello World!',
                credentials: {
                    email: 'admin@example.com',
                    password: 'admin',
                },
            }
        },
        methods: {
            goTo() {
                this.$navigateTo(Home, {
                    transition: {
                        name: 'fade',
                        duration: 500
                    }
                })
            },
            onLogin() {
                this.$store.dispatch('login', this.credentials).then((resp) => {
                    this.goTo()
                })
            }
        },

    }
</script>

<style>

    .border-bottom {
        border-bottom-width: 1;
        border-bottom-color: white;
        margin-bottom: 40;
        padding-bottom: 8;
    }

    /*.form-input {*/
    /*    !*color: white;*!*/
    /*    placeholder-color: teal;*/
    /*}*/

    .icon-margin {
        margin-right: 10;
    }

    .my-button {
        background-color: #4BD5DC;
        /*color: white;*/
        font-weight: bold;
        border-radius: 25;
        border: solid 2px black;
        box-shadow: black;
        padding-top: 14;
        padding-bottom: 14;
        text-transform: uppercase;
        letter-spacing: 0.1;
        margin-bottom: 20;
        margin-top: 10;
    }

    .auth-buttons {
        /*color: white;*/
        font-size: 14;
    }

    .full-height {
        height: 100%;
    }

    .logo-container {
        width: 150;
        margin-bottom: 60;
    }

    .container {
        margin-left: 34;
        margin-right: 34;
    }
</style>
