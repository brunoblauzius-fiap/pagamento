import * as express from "express";
import checkoutRoutes from './checkoutRoutes';
import { IDataBase } from '../../../interfaces/IDataBase';

export default function urls(dbconnection: IDataBase) {
    const router = express.Router();
    router.use("/api/v1/", checkoutRoutes(dbconnection));
    return router;
}

