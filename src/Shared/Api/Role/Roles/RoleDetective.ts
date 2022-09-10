import RoleInnocent from "./RoleInnocent";

/**
 * The detective role belongs to the innocents and has the task to find all traitors, killing them and winning the game.
 * By default, the detective can buy items in its own shop and each player knows who the detectives are.
 */
export default class RoleDetective extends RoleInnocent {

    public constructor() {
        super("detective", {
            color: "#00FFFF",
            canUseShop: true,
            canGainPointsByFinding: true,
            canGainPointsByKilling: true,
            convars: {percentage: 0.13, minimum: 6, credits: 3}
        });
    }
}
