import mongoose, { Model } from 'mongoose';
import MongoDBConnection from './MongoDBConnection';
import { IDataBase } from '../interfaces/IDataBase';
import CheckoutSchema from '../adapters/mongoose/schema/CheckoutSchema';

class MongoDBDatabase implements IDataBase {
    private db: MongoDBConnection;
    private _checkout: Model<any>; // Corrigindo o tipo do _checkout
    private _checkoutSchema: CheckoutSchema;

    constructor() {
        this.db = new MongoDBConnection(); // Obtenha a conexão com o MongoDB
        this._checkoutSchema = new CheckoutSchema();
        this._checkout = mongoose.model('Checkout', this._checkoutSchema.getSchema()); // Instanciar o modelo Checkout
    }

    async store(documento: any) {
        try {
            console.log('checkoutrepo');
            console.log(documento);
            // Crie uma instância do modelo Checkout com os dados do documento
            const novoCheckout = new this._checkout(documento); // Corrigir a referência ao _checkout

            // Insira o documento na coleção 'Checkout'
            const resultado = await novoCheckout.save();

            return resultado._id; // Retorne o ID do documento inserido
        } catch (error) {
            console.error("Erro ao inserir documento:", error);
            throw error;
        }
    }

   async update(documento: any) {
    try {
        console.log('checkoutrepoUP');
        console.log(documento);
        
        // Realize a atualização do documento na coleção 'Checkout'
        const resultado = await this._checkout.updateOne({ pedido_id: documento.pedido_id }, documento); // Corrigir a referência ao _checkout e usar o método updateOne()

        if (resultado.modifiedCount > 0) {
            // Se um documento foi modificado
            console.log('Documento atualizado com sucesso');
            return documento.uuid; // Retorne o UUID do documento atualizado
        } else {
            // Se nenhum documento foi modificado (não encontrado)
            console.log('Documento não encontrado para atualização');
            return null; // Ou retorne um valor indicando que o documento não foi encontrado
        }
    } catch (error) {
        console.error("Erro ao atualizar documento:", error);
        throw error;
    }
    // Implemente a lógica de atualização de acordo com as suas necessidades
}


    async delete() {
        // Implemente a lógica de exclusão de acordo com as suas necessidades
    }

    async find(pedidoId: any) {
        try {
            console.log(pedidoId);
            let valorPedidoId = pedidoId.pedido_id
            valorPedidoId = Number(valorPedidoId);
            console.log(valorPedidoId);
            // Use o método findOne para buscar um documento com base no pedido_id
            const documento = await this._checkout.findOne({ pedido_id: valorPedidoId });
            console.log(documento);
            // Se o documento existir, retorne seu ID
            if (documento) {
                return documento;
            } else {
                // Se nenhum documento for encontrado, retorne null
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar documento por pedido_id:", error);
            throw error;
        }
    }
        // Implemente a lógica de busca de acordo com as suas necessidades
}

export default MongoDBDatabase;
