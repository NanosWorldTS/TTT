import Team from "../Team";

/**
 * The options for a role.
 */
export default interface RoleOptions {
    /**
     * Hexadecimal color code with a leading #.
     */
    color: string;
    /**
     * If true, the role can find shop points by looting corpses. Defaults to false.
     */
    canGainPointsByFinding?: boolean;
    /**
     * If true, the role can find shop points by killing other players. Defaults to false.
     */
    canGainPointsByKilling?: boolean;
    /**
     * If true, the role can use the shop of its team. Defaults to false.
     */
    canUseShop?: boolean;
    /**
     * By default, the role can use the shop of its team. If this array is not empty, the role can only use the shops of
     * the teams that are in this array.
     */
    shopOverride?: Team[];
    /**
     * If true, the role prevents the winning of all teams. As long as a player with that role is alive, no team can win.
     * The time runs out and the game ends in a draw. Defaults to false.
     */
    preventWin?: boolean;
    /**
     * Default values for the basic configurable variables like the chances of getting this role.
     */
    convars: ConfigurableVariables;
}

/**
 * Default values for configurable variables which can be adjusted at runtime.
 */
export interface ConfigurableVariables {
    /**
     * Percentage of getting this role selected (per player).
     */
    percentage: number;
    /**
     * The maximum amount of players which can get this role per round. If omitted, no maximum is set.
     */
    maximum?: number;
    /**
     * The minimum amount of players needed to get this role. Defaults to 0.
     */
    minimum?: number;
    /**
     * Numbers of credits this role starts with at the beginning of each round. Defaults to 0.
     */
    credits?: number;
}
