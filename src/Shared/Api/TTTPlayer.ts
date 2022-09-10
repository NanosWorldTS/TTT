import {Player} from "nanosts";
import Role, {RoleChangeReason} from "./Role/Role";

/**
 * Represents a player in the TTT gamemode.
 */
export default class TTTPlayer {

    private _role: Role | null = null;

    public constructor(
        private readonly _player: Player
    ) {}

    /**
     * Returns the nanos world {@link Player} of this {@link TTTPlayer}.
     */
    public get player(): Player {
        return this._player;
    }

    /**
     * Returns whether the player has a role or not.
     */
    public get hasRole(): boolean {
        return this._role !== null;
    }

    /**
     * Returns the current role of this player. Throws an error if the player has no role.
     */
    public get role(): Role {
        if (this._role === null) {
            throw new Error("Player has no role");
        }

        return this._role;
    }

    /**
     * Sets the given role to the players new role.
     *
     * @param role   The new role.
     * @param reason The reason of the change.
     */
    public setRole(role: Role, reason: RoleChangeReason = RoleChangeReason.Script): void {
        this.clearCurrentRole(reason);

        if (role.onRoleAssigning(this, reason) === false) {
            return;
        }

        this._role = role;
        role.onRoleAssigned(this, reason);

        //TODO announce the role change to the player
    }

    /**
     * Clears the current role of this player.
     *
     * @param reason The reason of the role change.
     */
    public clearCurrentRole(reason: RoleChangeReason = RoleChangeReason.Script): void {
        if (!this.hasRole) {
            return;
        }

        if (this.role.onRoleRemoving(this, reason) === false) {
            return;
        }

        this._role = null;
        this.role.onRoleRemoved(this, reason);
    }
}
