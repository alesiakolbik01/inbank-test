<template>
    <div>
        <!-- Button trigger modal -->
        <div type="button" class="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <InfoIcon/>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h1>{{ title }}</h1>
                        <p>{{ text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.modal .modal-header>.btn-close {
    width: 23px;
    height: 23px;
    padding: 0;
    margin: 0;
    background-image: url(../assets/crossIcon.svg);
    background-repeat: no-repeat;
    background-size: contain;
    outline: none;
    box-shadow: none;
}

.modal-dialog .modal-header {
    border-bottom: none;
}

.modal-body h1 {
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
}

.modal-body p {
    font-size: 16px;
    font-style: normal;
    font-weight: 300;
}

.modal {
    background: #ffffff7d;
    backdrop-filter: blur(15px) brightness(1.8);
}

.modal-content {
    border-radius: 20px;
    background: var(--primary-pale-white, #FDFDFD);
    box-shadow: 0px 4px 10px 0px rgba(130, 130, 130, 0.25);
    padding: 25px 25px 50px;
}

.modal-header {
    display: inline-block;
}
</style>

<script>
export default {
    props: {
        text: String,
        title: String
    },
};
</script>

<script setup>
import InfoIcon from './icons/InfoIcon.vue';
</script>