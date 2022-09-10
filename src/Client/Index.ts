import RoleController from "./Controllers/RoleController";

/**
 * The class representation for the client running the TTT gamemode.
 */
export default class TTTClient {

    private static readonly _instance: TTTClient = new TTTClient();
    private readonly _roleController: RoleController;

    private constructor() {
        this._roleController = new RoleController();
    }

    /**
     * Initializes the client part of the TTT gamemode.
     */
    public initialize(): void {
        this._roleController.initialize();
    }

    /**
     * Returns the {@link RoleController} of this {@link TTTClient}.
     */
    public get roleController(): RoleController {
        return this._roleController;
    }

    /**
     * Returns the current instance of this {@link TTTClient}.
     */
    public static get instance(): TTTClient {
        return TTTClient._instance;
    }
}

TTTClient.instance.initialize();
