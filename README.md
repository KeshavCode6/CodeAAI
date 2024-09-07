# Code AAI
A coding challenge site developed for the Coding Clubs

## Code Conventions
- Consistent variable names in database and code
- Place all useStates after all other hooks

Example of fetch

export async function getLeaderboard() {

  const response = await fetch('/api/getLeaderboard');
  const json = await response.json();

  const formattedJson = json.sort((a: any, b: any) => parseFloat(b.points) - parseFloat(a.points));

  return formattedJson;
}

## Features
- General Coding Challenges
- Tutorials
- Challenge Creation
- Team-Based Challenges