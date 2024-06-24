import dbConnect from "./lib/database/dbConnect";
import Challenge from "./lib/database/schemas/Challenge";

export async function deleteExpiredChallenges() {

    const allChallenges = await Challenge.find({});

    for (let challenge of allChallenges) {

        if (parseInt(challenge.creationTimestamp) + (24 * 60 * 60 * 1000) < Date.now()) {
            await Challenge.findOneAndDelete({id: challenge.id});
        }

    }

}

(async () => {
    await dbConnect();
    setInterval(deleteExpiredChallenges, 60 * 1000);
})()

deleteExpiredChallenges();

export function register() {}