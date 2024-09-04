import { prismaClient } from "./lib/prisma";
export async function register() {

    await prismaClient.stats.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            totalChallenges: 0,
            totalPoints: 0,
            totalEasyChallenges: 0,
            totalHardChallenges: 0,
            totalMediumChallenges: 0,
            totalDailyChallenges: 0
        },
    });

    setInterval(clearTmpDirectory, 5*60*1000)
}


async function clearTmpDirectory() {
    if (process.env.NEXT_RUNTIME === "nodejs") {
        const fs = await import("fs")
        const path = await import("path")


        const tmpDir = path.join(process.cwd(), 'tmp'); // Adjust path as needed

        // Read the tmp directory
        fs.readdir(tmpDir, (err, files) => {
            if (err) {
                console.error(`Error reading tmp directory: ${err}`);
                return;
            }

            // Iterate over all files and delete them
            files.forEach(file => {
                const filePath = path.join(tmpDir, file);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting file ${file}: ${err}`);
                    } else {
                        console.log(`Successfully deleted file: ${file}`);
                    }
                });
            });
        });
    }
}