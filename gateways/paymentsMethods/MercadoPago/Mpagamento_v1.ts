// Step 1: Import the parts of the module you want to use
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';

class MPagamento_v1 {

    public store = async () =>{
    // Step 2: Initialize the client object
    const client = new MercadoPagoConfig({ accessToken: 'TEST-1425927372871628-011319-022dbe9e10ba4fbdf3fd298a2f54adca-192216046', options: { timeout: 5000, idempotencyKey: 'abc' } });
    console.log(client);
    // Step 3: Initialize the API object
    const payment = new Payment(client);

    // Step 4: Create the request object
    const body = {
        transaction_amount: 12.34,
        description: 'test',
        payment_method_id: 'pix',
        payer: {
            email: 'a@a.com'
        },
    };

    // Step 5: Create request options object - Optional
    const requestOptions = {
        idempotencyKey: '0d5020ed-1af6-469c-ae06-c3bec19954bb',
    };

    // Step 6: Make the request
    payment.create({ body, requestOptions }).then(console.log).catch(console.log);
    }
}
export default MPagamento_v1;