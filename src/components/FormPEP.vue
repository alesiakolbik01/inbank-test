<template>
    <form @change.prevent="onChangeForm" class="container mt-5 custom-form p-0">
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <select id="relationshipPEP" v-model="userData.relationshipPEP" class="form-select">
                        <option value="">{{ relationship.label }}</option>
                        <option v-for="answer of relationship.answers" :value="answer.value" :key="answer.value">{{
                            answer.name }}
                        </option>
                    </select>
                    <label v-if="userData.relationshipPEP" for="relationshipPEP" class="floating-label">{{
                        relationship.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <select id="regionPEP" v-model="userData.regionPEP" class="form-select">
                        <option value="">{{ region.label }}</option>
                        <option v-for="answer of region.answers" :value="answer.value" :key="answer.value">{{ answer.name }}
                        </option>
                    </select>
                    <label v-if="userData.regionPEP" for="regionPEP" class="floating-label">{{ region.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <select id="positionPEP" v-model="userData.positionPEP" class="form-select">
                        <option value="">{{ position.label }}</option>
                        <option v-for="answer of position.answers" :value="answer.value" :key="answer.value">{{ answer.name
                        }}
                        </option>
                    </select>
                    <label v-if="userData.positionPEP" for="positionPEP" class="floating-label">{{ position.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <select id="durationOrRelated" v-model="userData.durationOrRelated" class="form-select">
                        <option value="">{{ durationOrRelated.label }}</option>
                        <option v-for="answer of durationOrRelated.answers" :value="answer.value" :key="answer.value">{{
                            answer.name }}
                        </option>
                    </select>
                    <label v-if="userData.durationOrRelated" for="durationOrRelated" class="floating-label">{{
                        durationOrRelated.label }}</label>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                relationshipPEP: "",
                regionPEP: "",
                positionPEP: "",
                durationOrRelated: ""
            },
            relationship: {
                label: "Relationship to the PEP",
                answers: [
                    { name: "option 1", value: "option 1" },
                    { name: "option 2", value: "option 2" },
                    { name: "option 3", value: "option 3" },
                ]
            },
            region: {
                label: "PEP region",
                answers: [
                    { name: "region 1", value: "region 1" },
                    { name: "region 2", value: "region 2" },
                    { name: "region 3", value: "region 3" },
                ]
            },
            position: {
                label: "PEP position",
                answers: [
                    { name: "position 1", value: "position 1" },
                    { name: "position 2", value: "position 2" },
                    { name: "position 3", value: "position 3" },
                ]
            },
            durationOrRelated: {
                label: "Duration as PEP or related to a PEP",
                answers: [
                    { name: "option 1", value: "option 1" },
                    { name: "option 2", value: "option 2" },
                    { name: "option 3", value: "option 3" },
                ]
            },
        }
    },
    emits:["changeMonthlyPayment"],
    methods: {
        onChangeForm() {
            this.$emit('changeMonthlyPayment', { [this.formType]: {...this.userData}})
        },
    },
    props: {
        formType: String
    }
}
</script>

<style scoped>
input.redonly-field,
.form-control:disabled,
.form-select:disabled {
    padding: 12px 18px;
    font-size: 16px;
    color: #9C9C9C;
    background-color: #FDFDFD;
    border-color: #E9E9E9;
}

.form-control:focus,
.form-select:focus {
    box-shadow: none;
    border-color: #E9E9E9;
}

.form-select.selected {
    border-color: #E9E9E9;
}

.floating-label {
    font-size: 14px;
    color: #9C9C9C;
    background-color: #FDFDFD;
    position: absolute;
    top: -12px;
    left: 10px;
    padding: 0 4px;
}

.form-control,
.form-select,
.form-select:active:not(:disabled),
.form-select:active:not(:disabled) {
    padding: 12px 18px;
    font-size: 16px;
    background-color: #FDFDFD;
    color: #413C3C;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: #9C9C9C;
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px #FDFDFD;
}

.custom-form .row {
    margin-bottom: 14px;
    margin-top: -14px;
}

.form-switch .form-check-input:focus {
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
}

.form-check-input:active {
    filter: none;
}

.form-check-input {
    flex-shrink: 0;
    background-color: #9C9C9C;
}

.form-switch .form-check-input {
    width: 31px;
    height: 18px;
    --bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
    background-position: -2px center;
    background-size: 22px;
    box-shadow: none;
    border: none;
}

.form-switch .form-check-input:checked {
    background-position: calc(100% + 2px) center;
}


.form-check-input:checked {
    background-color: #53CBA0;
    border: none;
}

</style>
