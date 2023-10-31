<template>
    <div class="form-wrapper d-flex flex-column rounded-5 position-relative" :class="{ active: edit }">
        <a class="btn btn-edit position-absolute" :class="{ collapsed: edit }" role="button" v-if="!edit"
            @click.prevent="setMode">
        </a>
        <a class="btn btn-save position-absolute" :class="{ collapsed: edit }" role="button" v-if="edit"
            @click.prevent="setMode">
        </a>

        <div :class="{ hidden: edit }" class="form-description d-flex justify-content-center align-items-center">
            <h2 class="form-description_title">{{ mainTitle }}</h2>
            <div v-if="userData.payment === 0" class="group-label">{{ userData.amount ? userData.amount : 0 }} <sup>{{
                currencyIcon }}</sup> / {{ userData.duration }} months</div>
            <div v-else class="group-label">{{ userData.payment }}&nbsp;<sup>{{ currencyIcon }}</sup></div>
        </div>
        <div :class="{ hidden: !edit }" class="form-body">
            <div class="input-group justify-content-center align-items-center">
                <fieldset class="d-flex align-items-center position-relative">
                    <div class="group-label_wrapper">
                        <label class="group-label">{{ userDataForm[0] }}</label>
                        <ErrorMessage class="text-red-600" :name="userData.amount" />
                        <span :class="{ show: isInputAmount }" class="group-label_tooltip">{{ minAmount }}&nbsp;-&nbsp;{{
                            maxAmount.toLocaleString()
                        }}&nbsp;{{ currencyIcon }}</span>
                    </div>
                    <input maxlength="5" type="text" name="amount"
                        class="form-control position-relative form-numbers z-2" @focusout.prevent="handleChangeAmount"
                        @blur="handleTypeAmount(false)" @focus="handleTypeAmount(true)" :disabled="!edit" required
                        v-model="userData.amount" />
                    <span :class="{ empty: !userData.amount }"></span>
                    <span v-if="userData.amount > 0" class="currency-icon">{{ currencyIcon }}</span>
                    <div class="dropdown dropdown-amount">
                        <button class="dropdown-toggle" type="button" id="dropdown-amount" data-bs-toggle="dropdown"
                            aria-expanded="false"></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdown-amount">
                            <li v-for="number in amountArray" @click.prevent="handleClickDropdownAmount(number)">
                                <a class="dropdown-item" href="#">{{ number }}&nbsp;{{ currencyIcon }}</a>
                            </li>
                        </ul>
                    </div>
                </fieldset>
                <fieldset class="">
                    <div class="dropdown_wrapper">
                        <label class="group-label">{{ userDataForm[1] }}</label>
                        <button class="btn dropdown-toggle dropdown-duration form-numbers" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            {{ userData.duration }}&nbsp;<span class="fs-6">month</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li class="dropdown-item" v-for="item in durationList"
                                @click.prevent="handleClickDropdownDuraton(item)">
                                <span class="value">{{ item }}</span>
                                <span class="desc">&nbsp;month</span>
                            </li>
                        </ul>
                    </div>
                </fieldset>
                <div class="monthly-payment rounded-5">
                    <div class="group-label">{{ userDataForm[2] }}</div>
                    <div class="form-numbers">
                        {{ userData.payment }}&nbsp;<sup>{{ currencyIcon }}</sup>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template> 

<script>

export default {
    data() {
        return {
            userDataForm: [
                "Amount",
                "Duration",
                "Monthly Payment"
            ],
            minAmount: 200,
            maxAmount: 10000,
            stepForHundreds: 50,
            stepForThousands: 500,
            userData: {
                amount: '',
                duration: 0,
                payment: 0
            },
            durationList: [6, 12, 24, 36],
            edit: false,
            numbersLength: 0,
            currencyIcon: '€',
            mainTitle: "Your loan application",
            isInputAmount: false,
            
        }
    },
    computed: {
        amountArray() {
            const result = [];
            let step = this.stepForHundreds;
            for (let i = this.minAmount; i <= this.maxAmount; i = i + step) {
                if (String(i).length < 4) {
                    step = this.stepForHundreds;
                }
                else {
                    step = this.stepForThousands;
                }
                result.push(i);
            }
            return result;
        }
    },
    methods: {
        setMode() {
            this.edit = !this.edit;
            if (!this.edit) {
                this.$emit('changeMonthlyPayment', { ...this.userData })
            }
        },
        handleChangeAmount(e) {

            this.numbersLength = e.target.value;
            const value = parseInt(e.target.value);

            if (value > this.maxAmount) {
                this.userData.amount = this.maxAmount;
            }
            else if (value < this.minAmount) {
                this.userData.amount = this.minAmount;
            }

            this.calculateMonthlyPayment();
        },
        handleClickDropdownDuraton(value) {
            this.userData.duration = value;
            this.calculateMonthlyPayment();
        },
        handleClickDropdownAmount(value) {
            this.userData.amount = value;
        },
        calculateMonthlyPayment() {
            if (this.userData.amount > 0 & this.userData.duration > 0) {
                this.userData.payment = (parseInt(this.userData.amount) / parseInt(this.userData.duration)).toFixed(2)
            }
        },
        handleTypeAmount(value) {
            this.isInputAmount = value
        }
    }

}
</script>

<style scoped>
.form-description_title {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px;
    margin-right: 15px;
    margin-bottom: 0;
}

.dropdown_wrapper .group-label {
    margin-right: 9px;
}

.monthly-payment {
    height: 40px;
    width: auto;
    background: #3A156C;
    padding: 8px 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7px 13px;
    box-sizing: border-box;
}

.monthly-payment .group-label {
    white-space: pre;
    margin-right: 20px;
    align-items: center;
}

.dropdown-toggle::after {
    content: "";
    border: 0;
    background-image: url(../assets/RoundPurpleButtonArrL.svg);
    width: 20px;
    background-repeat: no-repeat;
    height: 14px;
    transform: rotate(-90deg);
    right: -24px;
    top: 7px;
    position: absolute;
}

fieldset {
    height: 100%px;
    box-sizing: border-box;
    margin-right: 24px;
}

.dropdown-amount .dropdown-menu {
    max-height: 166px;
    overflow-x: auto;
}

.dropdown-amount .dropdown-toggle {
    border: 0;
    background: transparent;
    width: 23px;
    height: 30px;
    margin: 0;
}

.dropdown-amount .dropdown-toggle::after {
    right: 0;
}

.dropdown-menu::-webkit-scrollbar {
    width: 0;
}

.dropdown-toggle {
    margin-right: 30px;
}

.dropdown-item {
    text-align: center;
    cursor: pointer;
}

.group-label_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 9px;
    position: relative;
}

.dropdown-duration {
    color: #FDFDFD;
    font-size: 22px;
    padding: 1px;
}

.dropdown-duration,
.dropdown-duration:active,
.dropdown-duration:focus,
.dropdown-duration:hover {
    background-color: transparent;
    border-radius: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-color: #dedede;
}

.group-label_tooltip {
    display: inline-block;
    height: 0;
    overflow: hidden;
    color: #FDFDFD;
    font-family: Open Sans;
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    transition: all .9s;
}

.group-label_tooltip.show {
    height: auto;
    overflow: visible;
}

.form-wrapper {
    padding: 5px;
    background: #2B0A57;
    color: #FDFDFD;
    transition: all .3s;
}

.form-wrapper:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    border-radius: 2rem;
    opacity: 0;
    transition: width .15s;
    background: linear-gradient(rgba(167, 132, 213, 1), rgba(43, 10, 87, 1));
}

.form-wrapper.active:before {
    opacity: 1;
    width: 100%;
}

.form-wrapper>div {
    height: 55px;
    transition: all .3s;
}

.form-wrapper>div.hidden {
    position: absolute;
    width: 0;
    overflow: hidden;
    transition: all 3s;
}

.group-label {
    color: #FDFDFD;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
    margin-bottom: 0;
}

.form-body input {
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: transparent;
    color: #FDFDFD;
    width: 78px;
    border-radius: 0;
    font-size: 22px;
    font-weight: 400;
    line-height: 24px;
    padding-left: 2px
}

.form-numbers {
    font-size: 22px;
}

.form-control:focus,
.form-control:hover,
.form-control:active,
.dropdown-duration:hover,
.dropdown-duration:active,
.dropdown-duration:focus,
.dropdown-duration:focus-visible {
    box-shadow: 0px 1px 0px 0px white !important;
    background-color: transparent !important;
    outline: 0 !important;
}

input.form-control:disabled {
    background-color: transparent;
    opacity: 1;
}

input.form-control {
    border-bottom: solid 1px #DEDEDE;
    cursor: pointer;
}

.group-label {
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: 24px;
}

.form-body .input-group {
    height: 100%;
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

.empty {
    width: 100%;
    position: absolute;
    height: 100%;
}

input:not(:focus):not(:active)+.empty::before {
    content: "| €";
    position: absolute;
    left: 108px;
    top: 50%;
    transform: translateY(-50%);
}

.currency-icon {
    position: relative;
    font-size: 16px;
    right: 10px;
    top: -5px;
}

input::-webkit-input-placeholder {
    color: #FDFDFD;
}

input:-moz-placeholder {
    color: #FDFDFD;
    opacity: 1;
}

input:-ms-input-placeholder {
    color: #FDFDFD;
}

input::placeholder {
    color: #FDFDFD;
}

.btn-edit {
    display: inline-block;
    width: 31px;
    height: 31px;
    top: 50%;
    transform: translateY(-50%);
    left: 13px;
    z-index: 1;
    background-image: url(../assets/RoundPurpleButtonArrL.svg);
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: center;
    transition: all .5s;
    outline: none;
}

.btn-save {
    display: inline-block;
    width: 31px;
    height: 31px;
    top: 15px;
    right: 13px;
    z-index: 1;
    border-radius: 50%;
    background-image: url(../assets/RoundWhiteButtonArrR.svg);
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transition: all .5s;
    outline: none;
}

.btn-save:hover {
    box-shadow: 0px 1px 25px #5948AD;
}

@media (max-width: 1024px) {
    .input-group {
        flex-direction: column;
        align-items: flex-start !important;
        justify-content: flex-start !important;
        padding: 25px;
    }

    .form-wrapper>div {
        height: auto;
    }

    .group-label_tooltip {
        max-width: 20px;
        position: absolute;
        top: -20px;
        left: 0;
    }

    input:not(:focus):not(:active)+.empty[data-v-83d6d384]::before {
        left: 91px;
    }

    fieldset {
        margin-bottom: 16px;
    }

    .monthly-payment {
        width: 100%;
    }

    .form-description_title {
        font-size: 16px;
    }
}
</style>