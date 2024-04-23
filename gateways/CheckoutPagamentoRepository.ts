import Checkout from "../entity/checkout";
import ICheckout from "../interfaces/ICheckout";
import { IDataBase } from "../interfaces/IDataBase";

class CheckoutPagamentoRepository implements ICheckout
{
    private nomeTabela = "checkout";
    public db: IDataBase;
    constructor(database: IDataBase) {
        this.db = database;
    }

    findById = async(id: any) => {
        throw new Error("Method not implemented.");
    }

    findByPedidoId = async (id: any) => {
        const checkout = await this.db.find({
            pedido_id: id
        });

        
        return new Checkout(
            checkout.pedido_id,
            checkout.payment_method,
            checkout.id
        )
    }

    getAll = async(params: any) => {
        throw new Error("Method not implemented.");
    }

    update = async (checkout: Checkout, id) => {
  
            let data = await this.db.update(
                {
                    uuid: checkout.uuid,
                    status: checkout.getStatus(),
                    payment_method_id: checkout.getPaymentMethod(),
                    pedido_id: checkout.pedido_id,
                    card_number: checkout.metodoPagamento.number,
                    card_cvv: checkout.metodoPagamento.cvv,
                    card_expiration_date: checkout.metodoPagamento.expirationDate,
                    payer_name: checkout.metodoPagamento.payer.name,
                    payer_email: checkout.metodoPagamento.payer.email,
                    payer_document: checkout.metodoPagamento.payer.document,
                    total_value: "0",
                    payload: checkout.payload,
                    created: new Date(),
                    modified: new Date()
                });
            return new Checkout(
                checkout.pedido_id,
                checkout.metodoPagamento,
                id
            )
        }

    public store = async (checkout: Checkout) => {

        const data = await this.db.store({
            uuid: checkout.uuid,
            status: checkout.getStatus(),
            payment_method: {
                payment_method_id: checkout.getPaymentMethod(),
                number: checkout.metodoPagamento.number,
                cvv: checkout.metodoPagamento.cvv,
                expirationDate: checkout.metodoPagamento.expirationDate,
                payer: {
                    name: checkout.metodoPagamento.payer.name,
                    email: checkout.metodoPagamento.payer.email,
                    document: checkout.metodoPagamento.payer.document,
                }
            },
            pedido_id: checkout.pedido_id,
            total_value: "0",
            payload: checkout.payload,
            created: new Date(),
            modified: new Date()
        });
        console.log('checkoutrepo');
            console.log(data);
        return new Checkout(
            checkout.pedido_id,
            checkout.metodoPagamento,
            parseInt(data.insertId)
        )
    }


    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    public findByExternalReference = async (uuid: string) => {
        throw new Error("Method not implemented.");
    }
    
}

export default CheckoutPagamentoRepository;