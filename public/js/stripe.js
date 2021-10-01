import axios from 'axios'
import { showAlert } from './alerts'

export const bookTour = async tourId => {
    const stripe = Stripe('pk_test_51HKYHcIKTLi1QsBknQ0wkuR6I1PMPGVVOViG7PaTCPcGNLKT16ibSMvMhIeByW7ub7LyvM2Y8frgeGGOnry91Ptl00wTs87ZTH')

    try {
        // 1) Get checkout session from API
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
        )

        // 2) Create checkout form + charge credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        })
    } catch (err) {
        console.log(err)
        showAlert('error', err)
    }
}