<template>
    <div class="notification">
        <div class="header__title">NOTIFICATION(S)</div>
        <div class="notification__container">
            <div class="notification__content content__card">
                <q-img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"></q-img>
                <div class="notification__info">
                    <div class="notification__info-details">
                        <span>Monica C. De Jesus</span> is on the <span>8th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="notification__info-datetime">3 hrs ago</div>
                </div>
            </div>
            <div class="notification__content content__card">
                <q-img src="https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"></q-img>
                <div class="notification__info">
                    <div class="notification__info-details">
                        <span>Armando M. dela Cruz</span> is on the <span>10th day</span> after abnormal temperature was detected.
                    </div>
                    <div class="notification__info-datetime">1 day ago</div>
                </div>
            </div>
            <div class="notification__content content__card">
                <q-img src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=512&q=80"></q-img>
                <div class="notification__info">
                    <div class="notification__info-details">
                        <span>Jason C. Castillo</span> was detected as blacklist in <span>Green Sun Hotel</span>.
                    </div>
                    <div class="notification__info-datetime">3 day ago</div>
                </div>
            </div>
            <div class="notification__content content__card">
                <q-img src="https://images.unsplash.com/photo-1485206412256-701ccc5b93ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=512&q=80"></q-img>
                <div class="notification__info">
                    <div class="notification__info-details">
                        <span>Jason C. Castillo</span> was detected <span class="text-red">38.3°C</span> body temperature at <span>Green Sun Hotel</span>.
                    </div>
                    <div class="notification__info-datetime">3 day ago</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './Notification.scss';

export default {

}
</script>
