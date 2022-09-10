import RoleController from "./Controllers/RoleController";

/**
 * The class representation for the server running the TTT gamemode.
 */
export default class TTTServer {

    private static readonly _instance: TTTServer = new TTTServer();
    private readonly _roleController: RoleController;

    private constructor() {
        this._roleController = new RoleController();
    }

    /**
     * Initializes the server part of the TTT gamemode.
     */
    public initialize(): void {
        this._roleController.initialize();
    }

    /**
     * Returns the {@link RoleController} of this {@link TTTServer}.
     */
    public get roleController(): RoleController {
        return this._roleController;
    }

    /**
     * Returns the current instance of this {@link TTTServer}.
     */
    public static get instance(): TTTServer {
        return TTTServer._instance;
    }
}

TTTServer.instance.initialize();
