import { ParametroBd } from "../types";
export interface IDataBase {
    //public connection = null;

    store(data: any);
    //update(query: string, data?: any);
    update(data: any);
    delete(data: any);
    find(data:any);
}

//export default IDataBase;