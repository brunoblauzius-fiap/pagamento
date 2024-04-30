import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import {Request, Response} from 'express';
import IPaymentMethods from '../interfaces/IPaymentsMethods';
import MPagamento from '../gateways/paymentsMethods/MercadoPago/MPagamento';
import CheckoutPagamentoRepository from '../gateways/CheckoutPagamentoRepository';
import { IDataBase } from '../interfaces/IDataBase';
import { CheckoutPagamento } from '../cases/checkoutPagamento';
import { StatusCheckout } from '../entity/enum/statusCheckout';
import BadRequestError from '../application/exception/BadRequestError';
import ResponseErrors from '../adapters/ResponseErrors';
import PedidoService from '../external/Services/PedidoService';


class CheckoutController {

    private repository : CheckoutPagamentoRepository;
    private metodoPagamento: IPaymentMethods;
    private _pedidoService: PedidoService;

    constructor(readonly dbconnection: IDataBase) {
        this.metodoPagamento = new MPagamento();
        this.repository = new CheckoutPagamentoRepository(dbconnection);
        this._pedidoService= new PedidoService();
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request: Request, response: Response) => {
        try {
            let checkout = await CheckoutPagamento.instance(request)
            console.log('checkoutcontroller');
            console.log(checkout);


            checkout = await CheckoutPagamento.CreateCheckout(
                checkout, 
                this.repository,
                this.metodoPagamento,
                
            );
            await this._pedidoService.setStatusPedido(checkout.pedido_id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(checkout));
        } catch(err) {
            ResponseErrors.err(response, err);
        } 
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public hook = async (request: Request, response: Response) => {
        try {
            if (typeof request.params.pedido_id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(
                    ResponseAPI.inputError("id", "ID do registro é requerido.")
                );
            }
            let checkout = await CheckoutPagamento.encontrarPagamentoPorIdPedido(
                request.params.pedido_id,
                this.repository
            );
            console.log('Achou ',checkout);
            checkout = await CheckoutPagamento.confirmPayment(checkout ,this.repository);
            
            if (checkout.getStatus() == StatusCheckout.PAGAMENTO_EFETUADO) {
                //Acessar outra API
                //PedidoCasoDeUso.pedidoEmPreparacao(checkout.pedido, this.pedidoRepository);
            }
            
            response.status(HttpStatus.OK).json(ResponseAPI.data(checkout));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }


    public findByIdPedido = async (request, response) => {
        try {

            if (typeof request.params.pedido_id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(
                    ResponseAPI.inputError("id", "ID do registro é requerido.")
                );
            }

            let checkout = await CheckoutPagamento.encontrarPagamentoPorIdPedido(
                request.params.pedido_id, 
                this.repository
            );
            response.status(HttpStatus.OK).json(ResponseAPI.data(checkout));
        } catch (err) {
            ResponseErrors.err(response, err);
        }
    }

}

export default CheckoutController;