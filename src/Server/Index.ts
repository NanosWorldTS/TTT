import RoleManager from "./Roles/RoleManager";

/**
 * The class representation for the server running the TTT gamemode.
 */
export default class TTTServer {

    private static readonly _instance: TTTServer = new TTTServer();
    private readonly _roleManager: RoleManager;

    private constructor() {
        this._roleManager = new RoleManager();
    }

    /**
     * Initializes the server part of the TTT gamemode.
     */
    public initialize(): void {
        this._roleManager.initialize();
    }

    /**
     * Returns the {@link RoleManager} of this {@link TTTServer}.
     */
    public get roleManager(): RoleManager {
        return this._roleManager;
    }

    /**
     * Returns the current instance of this {@link TTTServer}.
     */
    public static get instance(): TTTServer {
        return TTTServer._instance;
    }
}

TTTServer.instance.initialize();
