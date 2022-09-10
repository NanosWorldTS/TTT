import Team from "../Team";
import RoleOptions, {ConfigurableVariables} from "./RoleOptions";
import {Server} from "nanosts";
import TTTServer from "../../../Server";
import TTTClient from "../../../Client";

/**
 * The role describes the special abilities - if there are any - of a player, for which the player is fighting and
 * which winning goal that player has.
 */
export default abstract class Role {

    private readonly _color: string;
    private readonly _canGainPointsByFinding: boolean;
    private readonly _canGainPointsByKilling: boolean;
    private readonly _canUseShop: boolean;
    private readonly _shops: Team[];
    private readonly _preventWin: boolean;
    private readonly _convars: ConfigurableVariables;

    /**
     * @param _team The {@link Team} that role belongs to.
     * @param _name The name of the role. Should be lowercase and without spaces. Is used for i18n identification.
     * @param opts  The options for the role.
     */
    protected constructor(
        private readonly _team: Team,
        private readonly _name: string,
        opts: RoleOptions
    ) {
        this._color = opts.color;
        this._canGainPointsByFinding = opts.canGainPointsByFinding || false;
        this._canGainPointsByKilling = opts.canGainPointsByKilling || false;
        this._canUseShop = opts.canUseShop || false;
        this._preventWin = opts.preventWin || false;
        this._shops = opts.shopOverride || (this._canUseShop ? [_team] : []);

        this._convars = opts.convars;
        this._convars.minimum = this._convars.minimum || 0;
        this._convars.credits = this._convars.credits || 0;
    }

    /**
     * The team the role belongs to.
     */
    public get team(): Team {
        return this._team;
    }

    /**
     * The name of the role. Should be lowercase and without spaces. Is used for i18n identification.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * The hexadecimal color of the role.
     */
    public get color(): string {
        return this._color;
    }

    /**
     * Whether the role can gain points by looting corpses.
     */
    public get canGainPointsByFinding(): boolean {
        return this._canGainPointsByFinding;
    }

    /**
     * Whether the role can gain points by killing other players.
     */
    public get canGainPointsByKilling(): boolean {
        return this._canGainPointsByKilling;
    }

    /**
     * Whether the role can use the shop of its team.
     */
    public get canUseShop(): boolean {
        return this._canUseShop;
    }

    /**
     * The array containing the teams that the role can use the shop of.
     */
    public get shops(): Team[] {
        return this._shops;
    }

    /**
     * Whether the role prevents the winning of all teams.
     */
    public get preventWin(): boolean {
        return this._preventWin;
    }

    /**
     * The default convars for this role.
     */
    public get convars(): ConfigurableVariables {
        return this._convars;
    }

    /**
     * Registers the given type as new role. The type must extend {@link Role} or any of its children.
     */
    public static register<T extends Role>(type: new () => T) {
        if (Server) {
            TTTServer.instance.roleController.registerRole(type);
        } else {
            TTTClient.instance.roleController.registerRole(type);
        }
    }
}
