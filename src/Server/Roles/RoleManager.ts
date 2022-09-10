import Role from "../../Shared/Api/Role/Role";
import RoleInnocent from "../../Shared/Api/Role/Roles/RoleInnocent";
import RoleDetective from "../../Shared/Api/Role/Roles/RoleDetective";
import RoleTraitor from "../../Shared/Api/Role/Roles/RoleTraitor";
import RoleConVarProxy from "./RoleConVarProxy";

/**
 * The role manager keeps track of all existing roles, their selection, handling of abilities and handling of the
 * shop. It also handles the build in roles.
 */
export default class RoleManager {

    private readonly _roles: Role[];
    private readonly _roleConvars: RoleConVarProxy[];

    public constructor() {
        this._roles = [];
        this._roleConvars = [];
    }

    /**
     * Initializes the role manager which mostly likely only registers the build in roles.
     */
    public initialize(): void {
        this.registerRole(RoleInnocent);
        this.registerRole(RoleDetective);
        this.registerRole(RoleTraitor);
    }

    /**
     * Returns the role belonging to the given name - if any.
     *
     * @param name The wanted name.
     */
    public getRole(name: string): Role|undefined {
        return this._roles.find(role => role.name === name);
    }

    /**
     * Returns the role convars belonging to the role behind the given name - if any.
     *
     * @param name The name of the wanted role.
     */
    public getRoleConVars(name: string): RoleConVarProxy|undefined {
        return this._roleConvars.find(role => role.name === name);
    }

    /**
     * Registers the given role type as new role.
     *
     * @param type
     */
    public registerRole<T extends Role>(type: new () => T): void {
        const role: Role = new type();
        if (this.getRole(role.name)) {
            throw new Error("A role with the name " + role.name + " already exists!");
        }

        role.onInitialize();
        this._roles.push(role);
        this._roleConvars.push(new RoleConVarProxy(role));
    }
}
