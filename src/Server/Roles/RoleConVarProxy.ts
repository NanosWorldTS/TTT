import Role from "../../Shared/Api/Role/Role";

export default class RoleConVarProxy {

    private readonly _pctConVar: Convar<number>;
    private readonly _maximumConVar: Convar<number>;
    private readonly _minimumConVar: Convar<number>;
    private readonly _creditsConVar: Convar<number>;

    public constructor(
        private readonly _role: Role
    ) {
        this._pctConVar = DefineConvar<number>(TYPE_NUMBER, "ttt_role_" + this._role.name + "_pct", "ttt_role_" + this._role.name + "_pct", "Percentage of players that will be assigned to this role.", _role.convars.percentage);
        this._maximumConVar = DefineConvar<number>(TYPE_NUMBER, "ttt_role_" + this._role.name + "_max", "ttt_role_" + this._role.name + "_max", "Maximum amount of players that can be assigned to this role.", _role.convars.maximum || 0);
        this._minimumConVar = DefineConvar<number>(TYPE_NUMBER, "ttt_role_" + this._role.name + "_min", "ttt_role_" + this._role.name + "_min", "Minimum amount of players needed in a round.", _role.convars.minimum || 0);
        this._creditsConVar = DefineConvar<number>(TYPE_NUMBER, "ttt_role_" + this._role.name + "_credits", "ttt_role_" + this._role.name + "_credits", "Start credits that will be given to players of this role.", _role.convars.credits || 0);
    }

    public get name(): string {
        return this._role.name;
    }

    public get percentage(): number {
        return this._pctConVar.get();
    }

    public get maximum(): number {
        return this._maximumConVar.get();
    }

    public get minimum(): number {
        return this._minimumConVar.get();
    }

    public get credits(): number {
        return this._creditsConVar.get();
    }
}
