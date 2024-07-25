import { Technologie } from "./technologieType"

type UserType = {
    id: string,
    name: string,
    username: string,
    technologies: Technologie[]
}

const user = [] as UserType[];
export { UserType, user }