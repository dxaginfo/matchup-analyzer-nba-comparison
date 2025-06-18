import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Player } from '../../models/Player'

type RadarChartProps = {
  players: Player[]
}

// Stats to include in the radar chart
const STATS = [
  { key: 'ppg', label: 'Points' },
  { key: 'rpg', label: 'Rebounds' },
  { key: 'apg', label: 'Assists' },
  { key: 'spg', label: 'Steals' },
  { key: 'bpg', label: 'Blocks' },
  { key: 'fg_pct', label: 'FG%', scale: 100 },  // Convert decimal to percentage
]

// Colors for each player
const COLORS = [
  '#4299E1',  // blue-500
  '#F56565',  // red-500
  '#48BB78',  // green-500
  '#ED8936',  // orange-500
]

const RadarChart = ({ players }: RadarChartProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  
  useEffect(() => {
    if (!svgRef.current || players.length === 0) return
    
    // Clear any existing chart
    d3.select(svgRef.current).selectAll('*').remove()
    
    // Set up dimensions
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight
    const margin = 60
    const radius = Math.min(width, height) / 2 - margin
    const svg = d3.select(svgRef.current)
    
    // Create the center group for the radar chart
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
    
    // Calculate the max value for each stat
    const maxValues = STATS.reduce((acc, stat) => {
      let max = 0
      players.forEach(player => {
        const value = (player.seasonAverages?.[stat.key] || 0) * (stat.scale || 1)
        max = Math.max(max, value)
      })
      return { ...acc, [stat.key]: max * 1.2 }  // 20% padding
    }, {} as Record<string, number>)
    
    // Convert the data to the format needed for the radar chart
    // We need to normalize each value to a range of 0-1 based on the max value
    const radarData = players.map(player => {
      return STATS.map(stat => {
        const key = stat.key
        const value = (player.seasonAverages?.[key] || 0) * (stat.scale || 1)
        return {
          axis: stat.label,
          value: value / maxValues[key],  // Normalize
          rawValue: value,
          player,
        }
      })
    })
    
    // Number of axes (stats)
    const numAxes = STATS.length
    
    // Angle between each axis
    const angleSlice = (Math.PI * 2) / numAxes
    
    // Scale for the radius
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 1])
    
    // Draw the circular grid lines
    const gridLevels = 5
    for (let j = 0; j < gridLevels; j++) {
      const levelFactor = radius * ((j + 1) / gridLevels)
      g.selectAll('.gridCircle')
        .data([1]) // Dummy data
        .enter()
        .append('circle')
        .attr('class', 'gridCircle')
        .attr('r', levelFactor)
        .style('fill', 'none')
        .style('stroke', '#CDCDCD')
        .style('stroke-dasharray', '4,4')
    }
    
    // Draw the axes (spokes)
    const axis = g.selectAll('.axis')
      .data(STATS)
      .enter()
      .append('g')
      .attr('class', 'axis')
    
    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => rScale(1) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('stroke', '#CDCDCD')
      .style('stroke-width', '1px')
    
    // Add axis labels
    axis.append('text')
      .attr('class', 'legend')
      .attr('dy', '0.35em')
      .attr('x', (d, i) => rScale(1.15) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => rScale(1.15) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.label)
      .style('font-size', '10px')
      .style('text-anchor', (d, i) => {
        const angle = angleSlice * i
        if (angle < Math.PI) return 'start'
        if (angle === Math.PI) return 'middle'
        return 'end'
      })
    
    // Draw the radar chart blobs
    // Function to generate the path for each player's blob
    const radarLine = d3.lineRadial<{axis: string, value: number}>()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed)
    
    // Create a wrapper for the blobs
    const blobWrapper = g.selectAll('.radarWrapper')
      .data(radarData)
      .enter()
      .append('g')
      .attr('class', 'radarWrapper')
    
    // Create the outlines
    blobWrapper.append('path')
      .attr('class', 'radarArea')
      .attr('d', d => radarLine(d) || '')
      .style('fill', (d, i) => COLORS[i])
      .style('fill-opacity', 0.1)
      .style('stroke', (d, i) => COLORS[i])
      .style('stroke-width', '2px')
    
    // Create the data points
    blobWrapper.selectAll('.radarCircle')
      .data((d, i) => d.map(stat => ({ ...stat, playerIndex: i })))
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', 4)
      .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
      .style('fill', d => COLORS[d.playerIndex])
      .style('stroke', '#fff')
      .style('stroke-width', '1px')
    
    // Create a legend
    const legendX = width / 2 - 120
    const legendY = -height / 2 + 30
    
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${legendX}, ${legendY})`)
    
    players.forEach((player, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`)
      
      legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', COLORS[i])
      
      legendRow.append('text')
        .attr('x', 15)
        .attr('y', 9)
        .attr('font-size', '10px')
        .text(player.name)
    })
    
  }, [players])
  
  return (
    <div className="w-full h-full">
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  )
}

export default RadarChart
