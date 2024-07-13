import mongoose from 'mongoose';
import { config } from 'dotenv';
import CheckoutSchema from '../adapters/mongoose/schema/CheckoutSchema';

// Carregue as variáveis de ambiente do arquivo .env
config();

class MongoDBConnection {
    connection: mongoose.Connection = null;
    checkoutSchema: CheckoutSchema;

    constructor() {
        this.connect();
        this.checkoutSchema = new CheckoutSchema();
    }

    async connect() {
        // try {
        const url = process.env.DB_MONGO;//Colocar variavel env

            mongoose.connect(
                url,{}
            )
            .then(() => {
                console.log('Conexão com o MongoDB estabelecida com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao conectar ao MongoDB:', error);
            });

            // Capturar eventos de erro e sucesso
            const db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
            db.once('open', () => {
            console.log('Conexão com o MongoDB estabelecida com sucesso!');
            });
    }

    public conn() {
        return this.connection;
    }
}

export default MongoDBConnection;
