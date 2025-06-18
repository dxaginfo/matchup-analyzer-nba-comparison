import axios from 'axios'
import { Player } from '../models/Player'

// For this mock version, we'll use some placeholder data
// In a real implementation, you would connect to an actual API

// Mock NBA players data
const mockPlayers: Player[] = [
  {
    id: '1',
    name: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'SF',
    jerseyNumber: '23',
    height: '6\'9"',
    weight: 250,
    age: 39,
    experience: 21,
    accolades: ['4x NBA Champion', '4x Finals MVP', '4x NBA MVP', '19x All-Star'],
    bio: 'LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers of the National Basketball Association (NBA). Nicknamed "King James", he is widely considered one of the greatest players ever and is often compared to Michael Jordan in debates over the greatest basketball player of all time.',
    seasonAverages: {
      ppg: 25.2,
      rpg: 7.3,
      apg: 8.3,
      spg: 1.3,
      bpg: 0.5,
      fg_pct: 0.54,
      fg3_pct: 0.41,
      ft_pct: 0.75,
      mpg: 35.5,
      topg: 3.5,
    },
    careerStats: {
      ppg: 27.1,
      rpg: 7.5,
      apg: 7.4,
      spg: 1.6,
      bpg: 0.8,
      fg_pct: 0.504,
      fg3_pct: 0.345,
      ft_pct: 0.735,
    },
    advancedStats: {
      per: 27.3,
      ts_pct: 0.586,
      vorp: 133.7,
      ws: 244.1,
      bpm: 8.8,
      pir: 18.4,
    }
  },
  {
    id: '2',
    name: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'PG',
    jerseyNumber: '30',
    height: '6\'2"',
    weight: 185,
    age: 36,
    experience: 15,
    accolades: ['4x NBA Champion', '1x Finals MVP', '2x NBA MVP', '10x All-Star'],
    bio: 'Wardell Stephen Curry II is an American professional basketball player for the Golden State Warriors of the National Basketball Association (NBA). Widely regarded as one of the greatest basketball players of all time, and as the greatest shooter in NBA history, Curry has revolutionized the game by inspiring teams and players to regularly utilize the three-point shot.',
    seasonAverages: {
      ppg: 26.4,
      rpg: 4.5,
      apg: 5.1,
      spg: 0.7,
      bpg: 0.4,
      fg_pct: 0.45,
      fg3_pct: 0.40,
      ft_pct: 0.92,
      mpg: 33.5,
      topg: 2.8,
    },
    careerStats: {
      ppg: 24.7,
      rpg: 4.7,
      apg: 6.5,
      spg: 1.6,
      bpg: 0.2,
      fg_pct: 0.473,
      fg3_pct: 0.428,
      ft_pct: 0.908,
    },
    advancedStats: {
      per: 24.6,
      ts_pct: 0.624,
      vorp: 63.9,
      ws: 128.8,
      bpm: 6.5,
      pir: 16.2,
    }
  },
  {
    id: '3',
    name: 'Giannis Antetokounmpo',
    team: 'Milwaukee Bucks',
    position: 'PF',
    jerseyNumber: '34',
    height: '7\'0"',
    weight: 242,
    age: 29,
    experience: 11,
    accolades: ['1x NBA Champion', '1x Finals MVP', '2x NBA MVP', '8x All-Star'],
    bio: 'Giannis Sina Ugo Antetokounmpo is a Greek-Nigerian professional basketball player for the Milwaukee Bucks of the National Basketball Association (NBA). Antetokounmpo\'s combination of size, speed, and ball-handling skills led to his nickname the "Greek Freak".',
    seasonAverages: {
      ppg: 30.4,
      rpg: 11.5,
      apg: 6.5,
      spg: 1.2,
      bpg: 1.1,
      fg_pct: 0.61,
      fg3_pct: 0.28,
      ft_pct: 0.72,
      mpg: 34.5,
      topg: 3.4,
    },
    careerStats: {
      ppg: 22.8,
      rpg: 9.6,
      apg: 4.8,
      spg: 1.2,
      bpg: 1.3,
      fg_pct: 0.547,
      fg3_pct: 0.286,
      ft_pct: 0.689,
    },
    advancedStats: {
      per: 29.8,
      ts_pct: 0.633,
      vorp: 53.2,
      ws: 93.3,
      bpm: 9.1,
      pir: 20.5,
    }
  },
  {
    id: '4',
    name: 'Nikola Jokić',
    team: 'Denver Nuggets',
    position: 'C',
    jerseyNumber: '15',
    height: '6\'11"',
    weight: 284,
    age: 29,
    experience: 9,
    accolades: ['1x NBA Champion', '1x Finals MVP', '3x NBA MVP', '6x All-Star'],
    bio: 'Nikola Jokić is a Serbian professional basketball player for the Denver Nuggets of the National Basketball Association (NBA) who plays the center position. A six-time NBA All-Star, he has been named to the All-NBA Team on five occasions (including four first-team selections), and has won the NBA Most Valuable Player Award for three consecutive seasons from 2021 to 2023.',
    seasonAverages: {
      ppg: 26.1,
      rpg: 12.3,
      apg: 9.0,
      spg: 1.4,
      bpg: 0.9,
      fg_pct: 0.58,
      fg3_pct: 0.35,
      ft_pct: 0.82,
      mpg: 34.6,
      topg: 3.0,
    },
    careerStats: {
      ppg: 20.7,
      rpg: 10.5,
      apg: 6.7,
      spg: 1.3,
      bpg: 0.7,
      fg_pct: 0.548,
      fg3_pct: 0.345,
      ft_pct: 0.825,
    },
    advancedStats: {
      per: 28.5,
      ts_pct: 0.616,
      vorp: 49.6,
      ws: 88.4,
      bpm: 10.2,
      pir: 21.4,
    }
  },
  {
    id: '5',
    name: 'Luka Dončić',
    team: 'Dallas Mavericks',
    position: 'PG',
    jerseyNumber: '77',
    height: '6\'7"',
    weight: 230,
    age: 25,
    experience: 6,
    accolades: ['5x All-Star', '4x All-NBA First Team', 'Rookie of the Year'],
    bio: 'Luka Dončić is a Slovenian professional basketball player for the Dallas Mavericks of the National Basketball Association (NBA). He also represents the Slovenian national team. Standing at 6 ft 7 in tall and weighing 230 lb, Dončić primarily plays as a point guard but can also play as a shooting guard or small forward.',
    seasonAverages: {
      ppg: 33.9,
      rpg: 9.2,
      apg: 9.8,
      spg: 1.4,
      bpg: 0.5,
      fg_pct: 0.48,
      fg3_pct: 0.38,
      ft_pct: 0.78,
      mpg: 37.1,
      topg: 4.1,
    },
    careerStats: {
      ppg: 28.0,
      rpg: 8.7,
      apg: 8.2,
      spg: 1.1,
      bpg: 0.4,
      fg_pct: 0.472,
      fg3_pct: 0.339,
      ft_pct: 0.739,
    },
    advancedStats: {
      per: 29.1,
      ts_pct: 0.585,
      vorp: 32.8,
      ws: 44.9,
      bpm: 9.7,
      pir: 19.8,
    }
  },
  {
    id: '6',
    name: 'Joel Embiid',
    team: 'Philadelphia 76ers',
    position: 'C',
    jerseyNumber: '21',
    height: '7\'0"',
    weight: 280,
    age: 30,
    experience: 8,
    accolades: ['NBA MVP', '6x All-Star', '4x All-NBA', '3x All-Defense'],
    bio: 'Joel Hans Embiid is a Cameroonian professional basketball player for the Philadelphia 76ers of the National Basketball Association (NBA). After one year of college basketball with the Kansas Jayhawks, he was drafted third overall by the 76ers in the 2014 NBA draft.',
    seasonAverages: {
      ppg: 34.7,
      rpg: 11.0,
      apg: 5.6,
      spg: 1.0,
      bpg: 1.7,
      fg_pct: 0.53,
      fg3_pct: 0.38,
      ft_pct: 0.88,
      mpg: 33.6,
      topg: 3.9,
    },
    careerStats: {
      ppg: 27.9,
      rpg: 11.2,
      apg: 3.6,
      spg: 0.9,
      bpg: 1.7,
      fg_pct: 0.502,
      fg3_pct: 0.336,
      ft_pct: 0.836,
    },
    advancedStats: {
      per: 30.2,
      ts_pct: 0.612,
      vorp: 32.1,
      ws: 57.3,
      bpm: 8.5,
      pir: 22.1,
    }
  },
  {
    id: '7',
    name: 'Kevin Durant',
    team: 'Phoenix Suns',
    position: 'SF',
    jerseyNumber: '35',
    height: '6\'10"',
    weight: 240,
    age: 35,
    experience: 16,
    accolades: ['2x NBA Champion', '2x Finals MVP', 'NBA MVP', '13x All-Star'],
    bio: 'Kevin Wayne Durant, also known by his initials KD, is an American professional basketball player for the Phoenix Suns of the National Basketball Association (NBA). He played one season of college basketball for the Texas Longhorns before being selected as the second overall pick by the Seattle SuperSonics in the 2007 NBA draft.',
    seasonAverages: {
      ppg: 27.1,
      rpg: 6.6,
      apg: 5.0,
      spg: 0.7,
      bpg: 1.2,
      fg_pct: 0.52,
      fg3_pct: 0.41,
      ft_pct: 0.87,
      mpg: 36.0,
      topg: 3.2,
    },
    careerStats: {
      ppg: 27.3,
      rpg: 7.0,
      apg: 4.4,
      spg: 1.1,
      bpg: 1.1,
      fg_pct: 0.499,
      fg3_pct: 0.385,
      ft_pct: 0.885,
    },
    advancedStats: {
      per: 26.3,
      ts_pct: 0.618,
      vorp: 75.5,
      ws: 152.4,
      bpm: 6.8,
      pir: 19.7,
    }
  },
  {
    id: '8',
    name: 'Jayson Tatum',
    team: 'Boston Celtics',
    position: 'SF',
    jerseyNumber: '0',
    height: '6\'8"',
    weight: 210,
    age: 26,
    experience: 7,
    accolades: ['NBA Champion', 'NBA Finals MVP', '5x All-Star', '3x All-NBA'],
    bio: 'Jayson Christopher Tatum Sr. is an American professional basketball player for the Boston Celtics of the National Basketball Association (NBA). A five-time NBA All-Star and three-time All-NBA Team selection, he led the Celtics to the NBA Finals in 2022, where they lost to the Golden State Warriors in six games.',
    seasonAverages: {
      ppg: 26.9,
      rpg: 8.1,
      apg: 4.9,
      spg: 1.0,
      bpg: 0.5,
      fg_pct: 0.47,
      fg3_pct: 0.37,
      ft_pct: 0.83,
      mpg: 36.3,
      topg: 2.7,
    },
    careerStats: {
      ppg: 22.5,
      rpg: 7.0,
      apg: 3.5,
      spg: 1.1,
      bpg: 0.7,
      fg_pct: 0.461,
      fg3_pct: 0.376,
      ft_pct: 0.828,
    },
    advancedStats: {
      per: 21.5,
      ts_pct: 0.574,
      vorp: 32.1,
      ws: 57.9,
      bpm: 5.4,
      pir: 16.8,
    }
  },
];

// Function to search for players by name
export const searchPlayersByName = async (query: string): Promise<Player[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In a real app, this would be an API call to a backend service
  // return axios.get<Player[]>(`/api/players?name=${query}`).then(res => res.data)
  
  // For this mock version, we'll filter the mock data
  const normalizedQuery = query.toLowerCase()
  return mockPlayers.filter(player => {
    return (
      player.name.toLowerCase().includes(normalizedQuery) ||
      player.team.toLowerCase().includes(normalizedQuery) ||
      player.position.toLowerCase().includes(normalizedQuery)
    )
  })
}

// Function to get a player by ID
export const getPlayerById = async (id: string): Promise<Player> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700))
  
  // In a real app, this would be an API call to a backend service
  // return axios.get<Player>(`/api/players/${id}`).then(res => res.data)
  
  // For this mock version, we'll find the player in the mock data
  const player = mockPlayers.find(p => p.id === id)
  
  if (!player) {
    throw new Error('Player not found')
  }
  
  return player
}

// Function to get head-to-head matchup data
export const getHeadToHeadMatchup = async (player1Id: string, player2Id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // This would be an API call in a real app
  // return axios.get(`/api/matchups?player1=${player1Id}&player2=${player2Id}`).then(res => res.data)
  
  // For this mock version, we'll return some random data
  return {
    games: 12,
    player1Stats: {
      ppg: (Math.random() * 10 + 20).toFixed(1),
      rpg: (Math.random() * 5 + 5).toFixed(1),
      apg: (Math.random() * 5 + 3).toFixed(1),
      fg_pct: (Math.random() * 0.1 + 0.45).toFixed(3),
    },
    player2Stats: {
      ppg: (Math.random() * 10 + 20).toFixed(1),
      rpg: (Math.random() * 5 + 5).toFixed(1),
      apg: (Math.random() * 5 + 3).toFixed(1),
      fg_pct: (Math.random() * 0.1 + 0.45).toFixed(3),
    },
    player1Wins: Math.floor(Math.random() * 12),
    player2Wins: Math.floor(Math.random() * 12),
  }
}
