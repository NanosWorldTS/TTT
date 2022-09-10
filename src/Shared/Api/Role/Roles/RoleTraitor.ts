import Role from "../Role";
import Team from "../../Team";

/**
 * The traitor roles describes the bad guys trying to kill all innocents and winning the game.
 * By default, traitor can shop in their own shop.
 */
export default class RoleTraitor extends Role {

    public constructor() {
        super(Team.Traitor, "traitor", {
            color: "#FF0000",
            canUseShop: true,
            canGainPointsByFinding: true,
            canGainPointsByKilling: true,
            convars: {percentage: 0.25, credits: 2}
        });
    }
}
