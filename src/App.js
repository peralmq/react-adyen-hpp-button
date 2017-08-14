import React from 'react'
import { AdyenHPPButton, validateResponseQueryString } from './node_modules'

class App extends React.Component {
  render() {
      console.log({validateResponseQueryString})
    return (
      <AdyenHPPButton
        development={true}
        hmacKey='AdyenSecretKey'
        formData={{
          merchantReference: 'merchantReference',
          paymentAmount: '99',
          currencyCode: 'US',
          shipBeforeDate: '2017-07-17T13:42:40+01:00',
          skinCode: 'skinCode',
          merchantAccount: 'merchantAccount',
          sessionValidity: '2017-07-17T13:42:40+01:00',

          /* OPTIONAL, there are more on */
          shopperEmail: 'test@example.com',
          shopperReference: 'shopperReference',
          merchantReturnData: 'merchantReturnData',
        }}
        title='Pay with Adyen'
        style={{
           backgroundColor: '#3fbbb9',
           color: 'white',
           border: 'none',
           height: '40px',
           padding: '10px 40px 10px',
           margin: '10px 0 0 auto',
           display: 'inline-block',
        }}/>
    )
  }
}
export default App
