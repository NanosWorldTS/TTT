import Team from "../Team";
import RoleOptions, {ConfigurableVariables} from "./RoleOptions";
import {Package, Server} from "nanosts";
import TTTPlayer from "../TTTPlayer";

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
     * @param _name The name of the role. Should be lowercase and without spaces. Must be unique. Is used for i18n identification.
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
     * Gets called when the role is initialized.
     */
    public onInitialize(): void {}

    /**
     * Gets called when the given player is getting this role. Can be cancelled by returning false.
     */
    public onRoleAssigning(player: TTTPlayer, reason: RoleChangeReason): void|false {}

    /**
     * Gets called when the given player gets this role.
     */
    public onRoleAssigned(player: TTTPlayer, reason: RoleChangeReason): void {}

    /**
     * Gets called when the given player looses this role. Can be cancelled by returning false.
     */
    public onRoleRemoving(player: TTTPlayer, reason: RoleChangeReason): void|false {}

    /**
     * Gets called when the given player lost this role.
     */
    public onRoleRemoved(player: TTTPlayer, reason: RoleChangeReason): void {}

    /**
     * Registers the given type as new role. The type must extend {@link Role} or any of its children.
     */
    public static register<T extends Role>(type: new () => T) {
        if (Server) {
            const data = Package.Require("../../../Server/Index.lua");
            const TTTServer = data.default;
            TTTServer.instance.roleManager.registerRole(type);
        } else {
            const data = Package.Require("../../../Client/Index.lua");
            const TTTClient = data.default;
            TTTClient.instance.roleManager.registerRole(type);
        }
    }
}

/**
 * The reason which defines why the role of a player changes/changed.
 */
export enum RoleChangeReason {
    /**
     * The role changed manually through e.g. commands.
     */
    Manually,
    /**
     * The role was changed because the round started.
     */
    RoundStart,
    /**
     * The role was changed because the round ended.
     */
    RoundEnd,
    /**
     * The role was changed because the player died and now enters spectator mode.
     */
    Death,
    /**
     * The role was changed because through a script.
     */
    Script
}
