<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!" android:flat="true"/>
        <TabView android:tabBackgroundColor="#53ba82"
                 android:tabTextColor="#c4ffdf"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Tab 1">
                <GridLayout columns="*" rows="*">
                    <Label class="message" :text="msg" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Tab 2">
                <StackLayout>
                    <StackLayout>
                        <TextField v-model="user.email"></TextField>
                    </StackLayout>
                    <StackLayout>
                        <TextField v-model="user.password" secure="true"></TextField>
                    </StackLayout>
                    <StackLayout>
                        <Button  :text="btnName" @tap="onLogin"></Button>
                    </StackLayout>
                </StackLayout>
                <!--                <GridLayout columns="*" rows="*">-->
                <!--                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>-->
                <!--                </GridLayout>-->
            </TabViewItem>
            <TabViewItem title="Tab 3">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import axios from 'axios/dist/axios'

    const apiUrl = 'https://74cfac287ae5.ngrok.io'

    export default {
        data() {
            return {
                msg: 'Hello World!',
                user: {
                    email: 'admin@example.com',
                    password: 'admin',
                },
                btnName:'login'
            }
        },
        methods: {
            onLogin() {
                const dialogs = require("tns-core-modules/ui/dialogs");
                dialogs.alert(this.$store.getters.getAccessToken);
                const httpModule = require("http");


                axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
                // axios.get(`${apiUrl}/api/test`)
                //     .then(response => {
                //         console.log('Inside oauth/token url')
                //         console.log(response.data)
                //         console.log('response received')
                //     })

                const authHeader = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                if(this.$store.getters.getAccessToken){
                    axios.post(`${apiUrl}/api/login`, this.user, {headers: authHeader})
                        .then(response => {
                            console.log(response.data)
                            if (response.status === 200) {
                                this.$store.commit('RETRIEVE_TOKEN', response.data);
                                // this.$navigateTo(App)
                                dialogs.alert(this.$store.getters.getAccessToken);
                                console.log('response qq')
                            }
                        })
                        .catch((err) => {
                            if (err.response.status === 401) {
                                console.log('Validation error')
                            } else
                                console.log('Something went wrong')
                        })
                }

            }
        },
    }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
