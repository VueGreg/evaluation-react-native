import { TypeObstacle } from "./obstacle";

export interface Contact {
    id: string,
    name: string,
    type: TypeObstacle,
    description: string,
    phoneNumber: string,
    adress: string,

}