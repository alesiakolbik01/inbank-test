<template>
    <div class="form-wrapper d-flex flex-column rounded-5 position-relative">
        <button class="btn btn-user-form position-absolute" :class="{ collapsed: edit }"
         role="button" @click.prevent="setMode">
        </button>
        <div class="form-header" :class="{ show: !edit }" style="">
            <h1 class="form-username m-0">{{ userData.fullname }}</h1>
        </div>
        <div class="form-body">
            <vee-form class="input-group justify-content-center align-items-center" :validation-schema="schema" :class="{ editable: edit }">
                <h4 v-if="edit" class="group-label">Change your contact Info</h4>
                <div class="error-wrapper d-flex flex-md-column ms-1 me-5">
                    <ErrorMessage class="text-danger" :name="userDataForm[0].name" />
                    <ErrorMessage class="text-danger" :name="userDataForm[1].name" />
                    <ErrorMessage class="text-danger" :name="userDataForm[2].name" />
                </div>
                <fieldset class="d-flex align-items-center">
                    <img :src="userDataForm[0].icon">
                    <vee-field :size="userDataForm[0].size" :type="userDataForm[0].type" :name="userDataForm[0].name"
                        :aria-label="userDataForm[0].name"
                        :placeholder="userDataForm[0].placeholder"
                         class="form-control" :disabled="!edit" required
                        v-model="userData[userDataForm[0].name]" />
                </fieldset>
                <fieldset class="d-flex align-items-center">
                    <img :src="userDataForm[1].icon">
                    <vee-field :size="userDataForm[1].size" :type="userDataForm[1].type" :name="userDataForm[1].name"
                        :aria-label="userDataForm[1].name"
                        :pattern="userDataForm[1].pattern"
                        :placeholder="userDataForm[1].placeholder"
                         class="form-control" :disabled="!edit" required
                        v-model="userData[userDataForm[1].name]" />
                </fieldset>
                <fieldset class="d-flex align-items-center">
                    <img :src="userDataForm[2].icon">
                    <vee-field :size="userDataForm[2].size" :type="userDataForm[2].type" :name="userDataForm[2].name"
                        :aria-label="userDataForm[2].name"
                        :placeholder="userDataForm[2].placeholder"
                         class="form-control" :disabled="!edit" required
                        v-model="userData[userDataForm[2].name]" />
                </fieldset>
            </vee-form>
        </div>
    </div>
</template> 

<script>
import { ref } from 'vue';
import EmailIcon from '../assets/EmailIcon.svg';
import PhoneIcon from '../assets/PhoneIcon.svg';
import UserIcon from '../assets/UserIcon.svg';

export default {
    data() {
        return {
            userDataForm: [
                { name: 'id', icon: UserIcon, type: 'text', size: 14, placeholder:"id" },
                { name: 'phone', icon: PhoneIcon, type: 'tel', size: 14, pattern: "[0-9]{3} [0-9]{4} [0-9]{4}", placeholder:"123-4567-8901" },
                { name: 'email', icon: EmailIcon, type: 'email', size: 20, placeholder:"email@xxxx.com" }
            ],
            userData: {
                phone: "",
                email: "",
                id: "",
                fullname: ""
            },
            edit: false,
            schema: {
                email: 'required|min:3|max:100|email',
                phone: 'required|numeric|length:11',
                id: 'required|numeric|length:11'
            },
        }
    },
    emits: ["changeMonthlyPayment"],
    methods: {
        setMode() {
            this.edit = !this.edit;
            if (!this.edit) {
                this.$emit('changeMonthlyPayment', { userContacts: { ...this.userData } })
            }
        }
    },
    watch: {
        modelValue(newValue) {
            this.userData = newValue;
        }

    },
    props: {
        modelValue: {
            phone: String,
            email: String,
            id: String,
            fullname: String
        }
    }
}
</script>

<style scoped>
.error-wrapper {
    font-size: 10px;
}
.form-wrapper {
    border: 5px solid #F3EEFB;
    overflow: hidden;
}

.form-wrapper>div {
    height: 55px;
}

.form-wrapper .form-header {
    background-color: #F8F5FC;
    height: 0;
    overflow: hidden;
    transition: all .3s;
}

.form-wrapper .form-header.show {
    height: 55px;
}

.group-label {
    color: #413C3C;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    margin-right: 30px;
    margin-bottom: 0;
}

.form-body input {
    outline: none;
    border: none;
    color: #413C3C;
    min-width: 144px;
    max-width: 215px;
    width: auto;
    margin-right: 25px;
    border-radius: 0;
}

input.form-control:disabled {
    background-color: transparent;
    opacity: 1;
}

.editable input.form-control {
    border-bottom: solid 1px #9C9C9C;
}

input.form-control:focus,
.editable input.form-control:hover {
    background-color: transparent;
    border-bottom: solid 1px #2B0A57;
    border-top: none;
    border-left: none;
    border-right: none;
    outline: 0;
    box-shadow: none;
}

.form-body .input-group {
    height: 100%;
}

.form-body input:active {
    border: none;
}

.form-username {
    width: 100%;
    color: #413C3C;
    text-align: center;
    align-self: center;
    font-family: Open Sans;
    font-size: 18px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;
    transform: translateY(50%);
}

.btn-user-form {
    display: inline-block;
    width: 31px;
    height: 31px;
    top: 13px;
    right: 13px;
    z-index: 1;
    background-image: url(../assets/RoundWhiteButtonPen.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: all .5s;
    outline: none;
}

.btn-user-form:hover {
    background-image: url(../assets/RoundPurpleButtonPen.svg);
}

.btn-user-form.collapsed {
    background-image: url(../assets/RoundPurpleButtonArrR.svg);
}

.btn-user-form.collapsed:hover {
    background-image: url(../assets/RoundWhiteButtonArrR.svg);
}

@media (max-width: 1024px) {
    .form-wrapper>div:last-child {
        height: auto;
    }

    .form-body .input-group {
        flex-direction: column;
        align-items: flex-start !important;
        margin-left: 25px;
    }

    .form-username {
        font-size: 16px;
    }
}
</style>