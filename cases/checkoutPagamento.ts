import Cartao from "../entity/cartao";
import Checkout from '../entity/checkout';
import { StatusCheckout } from "../entity/enum/statusCheckout";
import Payer from '../entity/payer';
import Pix from "../entity/pix";
import CheckoutPagamentoRepository from "../gateways/CheckoutPagamentoRepository";
import IPaymentMethods from "../interfaces/IPaymentsMethods";
import MPagamento_V1 from "../gateways/paymentsMethods/MercadoPago/Mpagamento_v1";
import PaymentoMethods from '../entity/enum/PaymentoMethods';
import IRepository from "../interfaces/IRepository";
import ICheckout from "../interfaces/ICheckout";
import BadRequestError from "../application/exception/BadRequestError";

export class CheckoutPagamento {

    static instance = async(request) : Promise<Checkout> => {
        
        if ([PaymentoMethods.PIX, PaymentoMethods.CARD_DEBIT].indexOf(request.body.payment_method_id) < 0) {
            throw new BadRequestError(`Metodo de pagamento ${request.body.payment_method_id} não é aceito ou não encontrado.`);
        }

        let idPedido = request.body.pedido_id;
       
        let metodoPagamento = null;
            let payer = new Payer(
                request.body.payer.name,
                request.body.payer.email,
                request.body.payer.document,
            )
            metodoPagamento = new Pix(
                payer
            )

        let checkout = new Checkout(
            idPedido,
            metodoPagamento
        );
    

        checkout.setPaymentMethod(request.body.payment_method_id)

       
        checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);
        return checkout;
    }

    static async encontrarPagamentoPorIdPedido(
        idpedido, 
        checkoutPagamentoRepository: ICheckout,
    ) : Promise<Checkout> {
        let data = await checkoutPagamentoRepository.findByPedidoId(idpedido);
        let payer = new Payer(
            data.metodoPagamento.payer['name'],
            data.metodoPagamento.payer['email'],
            data.metodoPagamento.payer['document'],
        )
        let metodoPagamento = null;
        if (data['card_cvv'] != null) {
            metodoPagamento = new Cartao(
                payer,
                data.metodoPagamento['number'],
                data.metodoPagamento['cvv'],
                data.metodoPagamento['expirationDate'],
            )
        } else {
            metodoPagamento = new Pix(
                payer
            )
        }
        let checkout = new Checkout(
            idpedido,
            metodoPagamento,
            data['id'],
        );
        return checkout;
    }

    static confirmPayment = async (
        checkout: Checkout, 
        checkoutPagamentoRepository: ICheckout
    ) : Promise<Checkout> => {
        checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        await checkoutPagamentoRepository.update(checkout, checkout.id);
        return checkout;
    }

    static CreateCheckout = async(
        checkout: Checkout, 
        checkoutPagamentoRepository: IRepository, 
        paymentMethodsRepositorio: IPaymentMethods,
    ) => {
        try {
            //Mercado Pago
            //checkout = await paymentMethodsRepositorio.MP_teste(checkout);

            await checkoutPagamentoRepository.store(checkout);
            
            return checkout;
        } catch (err) {
            throw new Error(err.message);
        }
    }
        
}
