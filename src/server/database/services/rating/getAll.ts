import { QueryFailedError } from "typeorm";
import connection from "../../connection.js";
import { Rating } from "../../entities/rating/Rating.js";

const getAll = async (): Promise<Rating[]> => {
    try {
        const repository = connection.getRepository(Rating);

        const builder = repository.createQueryBuilder();
        const ratings: Rating[] = await builder
            .select("rating")
            .addSelect("User.username", "user")
            .addSelect("Game.name", "game")
            .leftJoin("game", "Game", "gameId = Game.id")
            .leftJoin("user", "User", "userId = User.id")
            .execute();

        return ratings;
    } catch (err: unknown) {
        if (err instanceof QueryFailedError) {
            console.error(err.message);
        }

        return [];
    }
};

export { getAll };