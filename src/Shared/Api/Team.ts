/**
 * The team describes a group of players that need to work together to achieve their goal.
 * Every player in that team has the same goal but can have special abilities to achieve it.
 */
export default class Team {

    /**
     * Default innocent team. Winning by finding all traitors and killing them.
     */
    public static readonly Innocent = Team.define('innocent', '#00ff00');
    /**
     * Default traitor team. Winning by killing all innocents.
     */
    public static readonly Traitor = Team.define('traitor', '#ff0000');

    private constructor(
        private readonly _name: string,
        private readonly _color: string
    ) {}

    /**
     * The name of the team. The name must be unique, lowercase and without spaces and is used for i18n identification.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * The hexadecimal color of the team. The color will be used in the scoreboard, if that player was revealed.
     */
    public get color(): string {
        return this._color;
    }

    /**
     * Defines a new team based on the given arguments.
     *
     * @param name  The name of the team. The name should be unique, lowercase and without spaces.
     * @param color The color of the team. Use hexadecimal color codes with a leading #.
     */
    public static define(name: string, color: string): Team {
        return new Team(name, color);
    }
}


