import RoleManager from "./Roles/RoleManager";

/**
 * The class representation for the client running the TTT gamemode.
 */
export default class TTTClient {

    private static readonly _instance: TTTClient = new TTTClient();
    private readonly _roleManager: RoleManager;

    private constructor() {
        this._roleManager = new RoleManager();
    }

    /**
     * Initializes the client part of the TTT gamemode.
     */
    public initialize(): void {
        this._roleManager.initialize();
    }

    /**
     * Returns the {@link RoleManager} of this {@link TTTClient}.
     */
    public get roleManager(): RoleManager {
        return this._roleManager;
    }

    /**
     * Returns the current instance of this {@link TTTClient}.
     */
    public static get instance(): TTTClient {
        return TTTClient._instance;
    }
}

TTTClient.instance.initialize();
