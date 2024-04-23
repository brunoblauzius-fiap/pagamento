// import { describe } from 'node:test';
// import { expect } from '@jest/globals';
// import { test, it } from '@jest/globals';
// import MPagamento from '../../../../../gateways/paymentsMethods/MercadoPago/MPagamento';
// import Checkout from '../../../../../entity/checkout';
// import Pedido from '../../../../../entity/pedido';
// import Cliente from '../../../../..pp/entity/cliente';
// import { statusPedido } from '../../../../../entity/enum/statusPedido';
// import Produto from '../../../../../entity/produto';
// import Categoria from '../../../../../entity/categoria';
// import PaymentMethods from '../../../../../entity/enum/PaymentoMethods';
// import Pix from '../../../../../entity/pix';
// import Payer from '../../../../../entity/payer';

// describe("MP metodo de pagamento PIX", () => {
//     test("Autenticação de usuário", async () => {
//         let mercado_pago = new MPagamento();
//         expect(mercado_pago.auth_token).toEqual(process.env.MP_CLIENT_SECRET);
//     });

//     test("Pagamento via PIX",async () => {
//         let pedido = new Pedido(
//             new Cliente(
//                 "Heitor Bernardo Victor Nogueira",
//                 "heitoBVN@gmail.com",
//                 "043.065.619-09"
//               ),
//             statusPedido.CRIADO
//         );
//         pedido.adicionarProduto(new Produto(
//             "Produto Teste",
//             10.00,
//             new Categoria("Teste"),
//             null,
//             1
//         ))
//         let checkout = new Checkout(
//             pedido,
//             new Pix(
//                 new Payer(
//                     "Heitor Bernardo Victor Nogueira",
//                     "heitoBVN@gmail.com",
//                     "043.065.619-09"
//                 )
//             )
//         );
//         // checkout.setPaymentMethod(PaymentMethods.PIX);
//         // let mercado_pago = new MPagamento();
//         // const response = await mercado_pago.store(checkout);
//         // expect(response['external_reference']).toEqual(checkout.external_reference);
//         expect(PaymentMethods.PIX).toEqual(checkout.getPaymentMethod());
//         // expect(response['transaction_amount']).toEqual(checkout.pedido.getValorTotal());
//     });
// });