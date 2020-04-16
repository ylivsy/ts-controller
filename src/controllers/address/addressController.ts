import * as express from "express";
import checkJWT from "../../middlewares/checkJwt";

class AddressController {

    public path = '/address';
    public router = express.Router();

    constructor() {
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.post(`${this.path}/create`, checkJWT , this.createAddress);
        this.router.post(`${this.path}/autocomplete`, checkJWT , this.autocomplete);
        this.router.post(`${this.path}/updateAddress`, checkJWT , this.updateAddress);
        this.router.post(`${this.path}/getAddress`, checkJWT , this.getAddress);
        this.router.post(`${this.path}/deleteAddress`, checkJWT , this.deleteAddressById);
        this.router.post(`${this.path}/getAddresses`, checkJWT , this.getAddresses);
        this.router.post(`${this.path}/validate`, checkJWT , this.validate);
        this.router.post(`${this.path}/zipValidate`, checkJWT , this.zipValidate);
    }

    private createAddress = (request: express.Request, response: express.Response) => {
        const resp = {
            ...request.body,
            "id" : "1234",
            "addressName": "new address name",
            "deliveryStatus": 1
        }

        return response.status(200).json(resp);
    }

    private getAddresses = (request: express.Request, response: express.Response) => {

        const body = request.body;

        const resp =  [ {
            id : request.body.id,
            addressName : 'address nice name',
            deliveryStatus : 1,

            country: 'Israel',
            state: 'Ashdod Yam',
            city : 'Ashdod',
            street: 'Hayaalomim',
            houseNumber: '19',
            floor: '2',
            apartment: '9',
            location: '90',
            zipCode:'7080090',
            customData: {
                'custom' : 'custom'
            }
        } ]

        return response.status(200).json(resp);
    }

    private autocomplete = (request: express.Request, response: express.Response) => {
        const body = request.body;

        const resp = [
            {value : body.searchField}
        ]

        return response.status(200).json(resp);
    }

    private updateAddress = (request: express.Request, response: express.Response) => {
        return response.status(200).send();
    }

    private getAddress = (request: express.Request, response: express.Response) => {

        const resp = {
            id : request.body.id,
            addressName : 'address nice name',
            deliveryStatus : 1,

            country: 'Israel',
            state: 'Ashdod Yam',
            city : 'Ashdod',
            street: 'Hayaalomim',
            houseNumber: '19',
            floor: '2',
            apartment: '9',
            location: '90',
            zipCode:'7080090',
            customData: {
                'custom' : 'custom'
            }
        }


        return response.status(200).json(resp);
    }

    private deleteAddressById = (request: express.Request, response: express.Response) => {
        return response.status(200).send();
    }

    private validate = (request: express.Request, response: express.Response) => {
        return response.status(200).json({isValid: true});
    }

    private zipValidate = (request: express.Request, response: express.Response) => {
        const resp = {
            country: 'Israel',
            state: 'Ashdod Yam',
            city : 'Ashdod',
            street: 'Hayaalomim',
            houseNumber: '19',
            floor: '2',
            apartment: '9',
            location: '90',
            zipCode:'7080090',
            customData: {
                'custom' : 'custom'
            }
        }

        return response.status(200).json(resp);
    }
}

export default AddressController;
