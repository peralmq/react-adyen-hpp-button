import React from 'react'
import { AdyenHPPButton, validateResponseQueryString } from 'components/AdyenHPPButton'

class App extends React.Component {
  render() {
    const {query} = this.props
    if (query && validateResponseQueryString(query)) {
      // Received a callback from Adyen with valid query string parameters
    }

    return (
      <AdyenHPPButton
        development={false}
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
