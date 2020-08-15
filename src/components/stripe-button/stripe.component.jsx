import React from 'react'
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51H8kLMDN2OW3dp0Lt4eZot35Wc6S5azQsdxb3kcGvJYvOgCVVvOsREckNl1JFDKnNLV3qti5ixGvhdStVdDIBHjC00bv3NvIwk'
    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
            label='Thanh toan'
            name='Web Clothing'
            billingAddress
            shippingAddress
            image='data:image/png;base64,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'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Thanh toan'
            token={onToken}
            stripeKey={publishablekey}


        />
    );

};
export default StripeCheckoutButton;
