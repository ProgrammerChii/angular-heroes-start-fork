import { HeroProfile } from "./heroProfile";
import { Team } from "./team";

export interface Heroe {
    id: string,
    name: string,
    heroProfile: HeroProfile,
    thumbnail: Object,
    resourceURI: string,
    teamColor: Team
}
