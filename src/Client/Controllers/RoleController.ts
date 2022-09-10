import Role from "../../Shared/Api/Role/Role";
import RoleInnocent from "../../Shared/Api/Role/Roles/RoleInnocent";
import RoleDetective from "../../Shared/Api/Role/Roles/RoleDetective";
import RoleTraitor from "../../Shared/Api/Role/Roles/RoleTraitor";

/**
 * The role controller keeps track of all existing roles. On the client-side it's mostly used to display data about
 * those roles.
 */
export default class RoleController {

    private readonly _roles: Role[];

    public constructor() {
        this._roles = [];
    }

    /**
     * Initializes the role controller which mostly likely only registers the build in roles.
     */
    public initialize(): void {
        this.registerRole(RoleInnocent);
        this.registerRole(RoleDetective);
        this.registerRole(RoleTraitor);
    }

    /**
     * Registers the given role type as new role.
     *
     * @param type
     */
    public registerRole<T extends Role>(type: new () => T): void {
        this._roles.push(new type());
    }
}
