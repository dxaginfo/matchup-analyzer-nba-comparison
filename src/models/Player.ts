export interface Player {
  id: string
  name: string
  imageUrl?: string
  team: string
  position: string
  jerseyNumber?: string
  height?: string
  weight?: number
  age?: number
  experience?: number
  bio?: string
  accolades?: string[]
  seasonAverages?: Record<string, number>
  careerStats?: Record<string, number>
  advancedStats?: Record<string, number>
}
