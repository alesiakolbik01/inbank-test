<template>
    <form @change.prevent="onChangeForm" class="container mt-5 custom-form p-0">
        <div class="row g-3">
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <input :type="formFields.firstName.type" id="firstName" v-model="userData.firstName" class="form-control"
                        :placeholder="formFields.firstName.label" />
                    <label v-if="userData.firstName" for="firstName" class="floating-label">{{
                        formFields.firstName.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <input :type="formFields.lastName.type" id="lastName" v-model="userData.lastName" class="form-control"
                        :placeholder="formFields.lastName.label" />
                    <label v-if="userData.lastName" for="lastName" class="floating-label">{{
                        formFields.lastName.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <input :type="formFields.personalID.type" id="personalID" v-model="userData.personalID" class="form-control"
                        :placeholder="formFields.personalID.label" />
                    <label v-if="userData.personalID" for="personalID" class="floating-label">{{
                        formFields.personalID.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <select id="residency" v-model="userData.residency" class="form-select">
                        <option value="">{{ formFields.residency.label }}</option>
                        <option v-for="answer of formFields.residency.answers" :value="answer.value" :key="answer.value">{{
                            answer.name }}
                        </option>
                    </select>
                    <label v-if="userData.residency" for="residency" class="floating-label">{{
                        formFields.residency.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <input :type="formFields.birthPlace.type" id="personalID" v-model="userData.birthPlace" class="form-control"
                        :placeholder="formFields.birthPlace.label" />
                    <label v-if="userData.birthPlace" for="birthPlace" class="floating-label">{{
                        formFields.birthPlace.label }}</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group position-relative">
                    <input :type="formFields.birthDate.type" id="birthDate" v-model="userData.birthDate" class="form-control"
                        :placeholder="formFields.birthDate.label" />
                    <label v-if="userData.birthDate" for="birthDate" class="floating-label">{{
                        formFields.birthDate.label }}</label>
                </div>
            </div>
        </div>
    </form>
    <slot/>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                firstName: "",
                lastName: "",
                personalID: "",
                residency: "",
                birthPlace: "",
                birthDate: "",
            },
            formFields: {
                firstName: {
                    label: "First name",
                    type: "text"
                },
                lastName: {
                    label: "Last name",
                    type: "text"
                },
                personalID: {
                    label: "Personal ID code",
                    type: "text"
                },
                residency: {
                    label: "Residency",
                    answers: [
                        { name: "country 1", value: "country 1" },
                        { name: "country 1", value: "country 1" },
                        { name: "country 1", value: "country 1" },
                    ]
                },
                birthPlace: {
                    label: "Birth place",
                    type: "text"
                },
                birthDate: {
                    label: "Birth date",
                    type: "date"
                },
            }
        }
    },
    emits:["changeMonthlyPayment"],
    methods: {
        onChangeForm() {
            this.$emit('changeMonthlyPayment', { beneficiary: { ...this.userData } })
        },
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

