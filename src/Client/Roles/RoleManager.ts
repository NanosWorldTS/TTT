import Role from "../../Shared/Api/Role/Role";
import RoleInnocent from "../../Shared/Api/Role/Roles/RoleInnocent";
import RoleDetective from "../../Shared/Api/Role/Roles/RoleDetective";
import RoleTraitor from "../../Shared/Api/Role/Roles/RoleTraitor";

/**
 * The role manager keeps track of all existing roles. On the client-side it's mostly used to display data about
 * those roles.
 */
export default class RoleManager {

    private readonly _roles: Role[];

    public constructor() {
        this._roles = [];
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
    }
}
