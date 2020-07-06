<template>
    <div class="personal-info">
        <div class="personal-info__header">
            <q-btn class="btn-back btn-primary" flat dense no-caps label="Back"></q-btn>
            <div class="personal-info__header-btn">
                <q-btn class="btn-outline btn-remove" flat dense no-caps label="Remove"></q-btn>
                <q-btn class="btn-primary btn-edit" flat dense no-caps label="Edit"></q-btn>
            </div>
        </div>
        <div class="personal-info__container content__box">
            <div class="personal-info__holder">
                <div class="personal-info__content-header">
                    <q-icon name="mdi-apple-icloud" size="30px"></q-icon>
                    <div class="content__title">Healthcloud Information</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://www.dreamit-conventions.com/assets/img/Marilyn.jpeg">
                            <q-btn flat dense rounded icon="mdi-magnify" size="13px"></q-btn>
                        </q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">First Name:</div>
                                <div class="personal-info__item-info">Adda</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Last Name:</div>
                                <div class="personal-info__item-info">Hope</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Middle Name:</div>
                                <div class="personal-info__item-info">Mascardo</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Gender:</div>
                                <div class="personal-info__item-info">Female</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Birth Date:</div>
                                <div class="personal-info__item-info">June 29, 1993</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Age:</div>
                                <div class="personal-info__item-info">28</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Nationality:</div>
                                <div class="personal-info__item-info">Filipino</div>
                            </div>
                        </div>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Home Address:</div>
                                <div class="personal-info__item-info">111 San Jose del Monte, Bulacan</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Contact Number:</div>
                                <div class="personal-info__item-info">0935123456</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Emergency Contact Number:</div>
                                <div class="personal-info__item-info">0935123456</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-briefcase" size="20px"></q-icon>
                    <div class="content__title">Data Source</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://s3-production.venuerific.com/shrine/venuephotos/12511/green-sun-events-venue-event-place-makati-large.jpg"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Company Name:</div>
                                <div class="personal-info__item-info">Green Sun Hotel</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Parent:</div>
                                <div class="personal-info__item-info">MySolid Technologies & Devices Corp.</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Date Registered:</div>
                                <div class="personal-info__item-info">June 23, 2020</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Total Registered:</div>
                                <div class="personal-info__item-info">32</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">Devices:</div>
                                <div class="personal-info__item-info">2</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="personal-info__holder">
                <div class="personal-info__content-header content-header__grey">
                    <q-icon name="mdi-card-account-details" size="20px"></q-icon>
                    <div class="content__title">Registered Identification Card</div>
                </div>
                <div class="personal-info__content">
                    <div class="personal-info__grid">
                        <q-img src="https://philippineslifestyle.com/wp-content/uploads/philippine-drivers-license-480x320.jpg"></q-img>
                        <div class="personal-info__item-content">
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Type:</div>
                                <div class="personal-info__item-info">Driver's License</div>
                            </div>
                            <div class="personal-info__item">
                                <div class="personal-info__item-label">ID Number:</div>
                                <div class="personal-info__item-info">ABC-12-123456</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-info__container content__box" style="margin-top: 30px">
            <div class="personal-info__content-header">
                <q-icon name="mdi-face-recognition" size="22px"></q-icon>
                <div class="content__title">User Logs</div>
            </div>
            <div class="content__table">
                <table>
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>Body Temperature</th>
                            <th>Device ID</th>
                            <th>Company/Location Scanned</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-green">36.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-green">36.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                        <tr>
                            <td>6/24/2020 8:00 AM</td>
                            <td class="td-red">38.5°C</td>
                            <td>D1ABC123</td>
                            <td>Green Sun Hotel</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import "./PersonalInformation.scss";

export default {

}
</script>
