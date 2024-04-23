import { Schema, model, Document } from 'mongoose';

class CheckoutSchema {
    private _schema: Schema;

    constructor() {
        // Defina o esquema do Checkout
        this._schema = new Schema({
            uuid: { type: String, required: true, unique: true },
            status: { type: Number, required: true },
            payload: { type: String },
            payment_method: {
                type: {
                    payment_method_id: { type: Number, required: true },
                    number: { type: String, default: null },
                    cvv: { type: String, default: null },
                    expirationDate: { type: String, default: null },
                    payer: {
                        type: {
                            name: { type: String, required: true },
                            email: { type: String, required: true },
                            document: { type: String, required: true }
                        },
                        required: true
                    },
                },
                required: true
            },
            external_reference: { type: String },
            pedido_id: { type: Number, required: true },
            created_at: { type: Date, default: Date.now },
            updated_at: { type: Date, default: Date.now }
        });
    }

    // Método para retornar o esquema do Checkout
    public getSchema(): Schema {
        return this._schema;
    }
}

// Exporte a classe CheckoutSchema
export default CheckoutSchema;
