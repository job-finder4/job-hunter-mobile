<template>
    <StackLayout class="my-2 mx-2">
        <!-- <Label :text="title" class="text-xl py-2" /> -->
        <!-- <ListView class="list-group" for="(task, index) in items"
            >
                <v-template>
                    <FlexboxLayout >
                        <CheckBox
                                :text="task"
                                :checked="checkedOrNot(task)"
                                @checkedChange="onCheckChange(task, index, $event)"
                                col="0"
                        />
                    </FlexboxLayout>
                </v-template>
            </ListView> -->
        <FlexboxLayout justifyContent="flex-start" flexWrap="wrap">
            <CheckBox flexGrow="1" style="font-size:20px"  v-for="(task, index) in items"
                      :key="index" :text="task"
                      @checkedChange="onCheckChange(task, index, $event)"
                      :checked="checkedOrNot(task)"
            />
        </FlexboxLayout>
    </StackLayout>
</template>

<script>
    export default {
        model: {
            prop: "checkedValues",
            event: "change",
        },
        props: {
            checkedValues: {
                type: Array,
                required: true,
            },
            items: {
                type: Array,
                required: true,
            },
        },
        watch: {
            checkedValues: function (newVal, oldVal) {
                this.selectedValues=newVal
            }
        },
        data() {
            return {
                selectedValues: [],
            };
        },
        methods: {
            checkedOrNot(key) {
                return this.selectedValues.includes(key);
            },
            onCheckChange(task, index, event) {
                if (event.value) {
                    if (!this.checkedOrNot(task)) {
                        this.selectedValues.unshift(task);
                    }
                } else {
                    const idx = this.selectedValues.findIndex((item) => item === task);
                    this.selectedValues.splice(idx, 1);
                }
                this.$emit("change", this.selectedValues);
                // console.log(this.selectedValues)
            },
        },
        created() {
            this.selectedValues = this.checkedValues;
        },
    };
</script>
<style scoped></style>
