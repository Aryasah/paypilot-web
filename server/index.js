const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const stripe = Stripe("sk_test_51NPgG9SIMqwS7WNZ0MoKTZMtXumWBS2DjM3o8yM6OmodEB4SO2eL8wWTqZ5uwImgAOgNSwTJ2GImEn24eUtpoYD1009Eoxzoa7");

app.use(cors());
app.use(bodyParser.json());

app.post('/bill/create-checkout-session', async (req, res) => {
    try {
        const { bills } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: bills.map((bill) => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Payment for ${bill.name}`,
                    },
                    unit_amount: Math.round(bill.amountDue * 100),
                },
                quantity: 1,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/bill/success', 
            cancel_url: 'http://localhost:3000/bill/failure',   
        });
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Checkout Session:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8085, () => {
    console.log('Server running on port 8085');  
});