import Role from "../Role";
import Team from "../../Team";
import RoleOptions from "../RoleOptions";

/**
 * The innocent roles describes the good guys trying to find all traitors, killing them and winning the game.
 * By default, innocents have no special abilities.
 */
export default class RoleInnocent extends Role {

    /**
     * If used with default options, the role is a normal innocent. Otherwise, it is a custom role with the
     * innocent as a base role.
     *
     * @param name Overrides the name of the role. Should be lowercase and without spaces. Is used for i18n identification.
     * @param opts Overrides the options for the role.
     */
    public constructor(name?: string, opts?: RoleOptions) {
        super(
            Team.Innocent,
            name || "innocent",
            opts || {color: "#00FF00", convars: {percentage: 0.5}}
        );
    }
}
