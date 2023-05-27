import {ConnectionPool} from 'mssql';

export class DBPool{
    //auskommentiert weil geht nicht ohne die DB
    /**
    private static  readonly config = {
        user: 'Tobias',
        password: 'ok',
        server: 'localhost/api/superspeed', // You can use 'localhost\\instance' to connect to named instance
        database: 'superspeed',
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        trustServerCertificate: true
    }
    private static instance:ConnectionPool|undefined;

    static getInstance():ConnectionPool{
        if(!this.instance){
            throw "Pool not connected to DB";
        }
        return this.instance
    }

    static async connect(){
        this.instance = await (new ConnectionPool(this.config)).connect();
    }
    */
}