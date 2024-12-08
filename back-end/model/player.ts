export class Player {
    private static currentId = 0;
    private id: number;
    public username: string;
    public score: number;
    public is_host: boolean;

    constructor(player: { id?: number; username: string; score: number; is_host: boolean }) {
        this.id = player.id ?? ++Player.currentId;
        this.username = player.username;
        this.score = player.score;
        this.is_host = player.is_host;
    }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    getScore() {
        return this.score;
    }

    getIsHost() {
        return this.is_host;
    }
}
