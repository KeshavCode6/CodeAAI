export type UserStats = {
  points: number;
  solves: number;
  image: string;
  name: string;
  codeLeagueRank: number;
  lastChallenge: string;
  totalPoints: number;
  totalChallenges: number;
  easyChallenges: number;
  totalEasyChallenges: number;
  mediumChallenges: number;
  totalMediumChallenges: number;
  hardChallenges: number;
  totalHardChallenges: number;
  totalDailyChallenges: number;
  dailyChallenges: number;
};


// Function to fetch user data
export async function getMyUserData(): Promise<UserStats | null> {
  try {
    const response = await fetch('/api/getUserData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: UserStats = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

