<template>
    <div>
        <p class="d-flex justify-content-between m-auto checkbox-wrapper">
                <div class="form-check">
                    <input class="form-check-input collapsed" type="checkbox"
                     data-bs-toggle="collapse"
                        :href="'#'+id"
                        :checked="modelValue"
                        @change.prevent="onChange"
                        role="button"
                        aria-expanded="false"
                        aria-controls="multiCollapseExample1">
                    <label class="form-check-label" for="flexCheckChecked">
                        {{ labelText }}
                    </label>
                </div>
            <span class="icon-info">
                <InfoPopup :title="infoData.title" :text="infoData.text"  v-if="infoData"/>
            </span>
        </p>
        <div class="row">
            <div class="col">
                <div class="multi-collapse collapse" :id="id" style="">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    emits:["update:modelValue"],
    methods:{
        onChange(e){
            this.$emit("update:modelValue", e.target.checked);
        }
    },
    props: {
        modelValue: Boolean,
        labelText: String,
        infoData: {
            title: String,
            text: String
        },
        id:String
    }
}
</script>

<style scoped>
    .checkbox-wrapper {
        width: 35%;
    }

    .form-check-input:checked {
        background-color: #ffffff;
        border-color: #270a53;
    }

    .form-check-input:checked[type=checkbox] {
        background-image: url(../assets/checkIcon.svg);
        background-size: 81%;
    }

    .form-check-input:focus {
        border-color: #270a53;
        box-shadow: none;
    }

    @media (max-width: 1024px) {
        .checkbox-wrapper {
            width: 100%;
        }
    }
</style>
