export type UserStats = {
  points: number;
  solves: number;
  codeLeagueRank: number;
  lastChallenge: string;
  totalPoints: number;
  totalChallenges: number;
  easyChallenges:number;
  totalEasyChallenges: number;
  mediumChallenges:number;
  totalMediumChallenges: number;
  hardChallenges:number;
  totalHardChallenges: number;
  totalDailyChallenges: number;
  dailyChallenges:number;
};
  
  export var globalUserData: UserStats | null = null;
  
  // Function to fetch user data
  async function fetchUserData(): Promise<UserStats | null> {
    try {
      const response = await fetch('/api/getUser');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: UserStats = await response.json();
      globalUserData = data;
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }
  
  // Function to get user data
  export async function getUserData(): Promise<UserStats | null> {
    if (globalUserData) {
      return globalUserData;
    }
    return await fetchUserData();
  }
  