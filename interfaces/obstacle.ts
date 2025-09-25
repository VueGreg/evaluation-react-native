export interface Obstacle {
    id: string,
    title: string,
    type: TypeObstacle,
    description: string,
    userName: string,
    userSurname: string,
    truckRegistration: string,
    latitude: number | undefined,
    longitude: number | undefined,
    state: boolean,
    image_url: string
}

export interface TypeObstacle {
    id: number,
    name: string
}