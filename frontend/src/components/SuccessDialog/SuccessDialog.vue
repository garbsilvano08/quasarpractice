<template>
    <div class="success">
        <div class="success__content">
            <q-img src="../../assets/success-icon.svg"></q-img>
            <div class="success__content-label">
                <span>Success!</span> <br>
                Your company registration has been added.
            </div>
            <q-btn flat dense rounded no-caps label="Close" class="btn-primary btn-success"></q-btn>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .success {
        background-color: #ffffff;
        padding: 36px 48px;
        width: 100%;
        border-radius: 15px;

        .success__content {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;

            .q-img {
                object-fit: contain;
                width: 70px;
                margin-bottom: 15px;
            }

            .success__content-label {
                color: rgba(#000000, .6);
                font-size: 14px;
                font-weight: 500;
                margin-bottom: 30px;

                span {
                    color: #233b61 !important;
                    font-size: 16px !important;
                    font-weight: 700 !important;
                }
            }

            .btn-success {
                padding: 0px !important;
            }
        }
    }
</style>
