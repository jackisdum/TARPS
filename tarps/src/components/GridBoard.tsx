import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';

// Define the possible states/colors for each cell
const STATES = [
  { label: 'Empty', color: '#fff' },
  { label: 'Sleep', color: '#b39ddb' },
  { label: 'Wasted', color: '#ef9a9a' },
  { label: 'Productive', color: '#a5d6a7' },
  { label: 'Unavoidable', color: '#90caf9' },
];

// 12x12 grid: 4 quadrants, 6 hours per quadrant, 6 intervals per hour (10-min)
const GRID_SIZE = 12;
const CELL_SIZE = 26;
const MID = GRID_SIZE / 2; // 6

// Helper to create a 12x12 grid initialized to 0 (Empty)
const createInitialGrid = () => Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));

// Map grid position to hour/minute
function getHourAndMinute(row: number, col: number): { hour: number, minute: number } {
  // Minutes: reverse left-to-right
  const minute = 50 - (col % 6) * 10;

  // Quadrant I (top-right): row 0-5, col 6-11 => 00:00-05:50
  if (row < MID && col >= MID) {
    const hour = col - MID;
    return { hour, minute };
  }
  // Quadrant II (top-left): row 0-5, col 0-5 => 06:00-11:50
  if (row < MID && col < MID) {
    const hour = col + 6;
    return { hour, minute };
  }
  // Quadrant III (bottom-left): row 6-11, col 0-5 => 12:00-17:50
  if (row >= MID && col < MID) {
    const hour = col + 12;
    return { hour, minute };
  }
  // Quadrant IV (bottom-right): row 6-11, col 6-11 => 18:00-23:50
  if (row >= MID && col >= MID) {
    const hour = 23 - (col - MID);
    return { hour, minute };
  }
  // Fallback
  return { hour: 0, minute: 0 };
}

const GridBoard: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(createInitialGrid());

  // Handle cell click: cycle to next state (will change to legend-driven in next step)
  const handleCellClick = (row: number, col: number) => {
    setGrid(prev => {
      const newGrid = prev.map(r => [...r]);
      newGrid[row][col] = (newGrid[row][col] + 1) % STATES.length;
      return newGrid;
    });
  };

  // Render hour labels for the left and right
  const renderHourLabel = (row: number, side: 'left' | 'right') => {
    let label = '';
    if (side === 'left') {
      if (row < MID) label = (6 + row).toString().padStart(2, '0') + ':00'; // 06:00-11:00
      else label = (12 + row - MID).toString().padStart(2, '0') + ':00'; // 12:00-17:00
    } else {
      if (row < MID) label = (5 - row).toString().padStart(2, '0') + ':00'; // 05:00-00:00 (reverse)
      else label = (23 - (row - MID)).toString().padStart(2, '0') + ':00'; // 23:00-18:00 (reverse)
    }
    // Apply red color to 12:00 (left) and 00:00 (right)
    const isRed = (side === 'left' && row === MID) || (side === 'right' && label === '00:00');
    return (
      <td
        style={{
          width: 44,
          fontWeight: 'bold',
          fontSize: 12,
          textAlign: side === 'left' ? 'right' : 'left',
          color: isRed ? '#d32f2f' : '#333',
          borderTop: row === MID ? '2px solid #333' : undefined,
        }}
      >
        {label}
      </td>
    );
  };

  // Render minute labels for the top and bottom
  const renderMinuteLabels = (pos: 'top' | 'bottom') => (
    <tr>
      <th style={{ width: 44 }}></th>
      {Array.from({ length: GRID_SIZE }).map((_, colIdx) => {
        const minute = 60 - (colIdx % MID) * 10;
        return (
          <th
            key={colIdx}
            style={{
              width: CELL_SIZE,
              height: 18,
              textAlign: 'left',
              fontWeight: 'normal',
              fontSize: 12,
              borderBottom: pos === 'top' ? '1px solid #bbb' : undefined,
              borderTop: pos === 'bottom' ? '1px solid #bbb' : undefined,
              borderLeft: colIdx === MID ? '2px solid #333' : undefined,
            }}
          >
            {String(minute).padStart(2, '0')}
          </th>
        );
      })}
      <th style={{ width: 44 }}></th>
    </tr>
  );

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>24-Hour Quadrant Grid</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', margin: 0 }}>
            <thead>{renderMinuteLabels('top')}</thead>
            <tbody>
              {Array.from({ length: GRID_SIZE }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {/* Left hour label */}
                  {renderHourLabel(rowIdx, 'left')}
                  {/* Grid cells */}
                  {Array.from({ length: GRID_SIZE }).map((_, colIdx) => {
                    const isAxisRow = rowIdx === MID;
                    const isAxisCol = colIdx === MID;
                    return (
                      <td
                        key={colIdx}
                        style={{
                          padding: 0,
                          borderLeft: colIdx === MID ? '2px solid #333' : '1px solid #bbb',
                          borderTop: rowIdx === MID ? '2px solid #333' : '1px solid #bbb',
                          borderRight: colIdx === GRID_SIZE - 1 ? '1px solid #bbb' : undefined,
                          background: (rowIdx === MID || colIdx === MID) ? '#f5f5f5' : undefined,
                        }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleCellClick(rowIdx, colIdx)}
                          sx={{
                            minWidth: CELL_SIZE,
                            minHeight: CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            backgroundColor: STATES[grid[rowIdx][colIdx]].color,
                            color: '#222',
                            border: 'none',
                            boxShadow: 'none',
                            p: 0,
                            m: 0,
                            fontSize: 11,
                            '&:hover': { backgroundColor: STATES[grid[rowIdx][colIdx]].color },
                          }}
                        >
                          {grid[rowIdx][colIdx] === 0 ? '' : STATES[grid[rowIdx][colIdx]].label[0]}
                        </Button>
                      </td>
                    );
                  })}
                  {/* Right hour label */}
                  {renderHourLabel(rowIdx, 'right')}
                </tr>
              ))}
              {/* Bottom minute labels */}
              {renderMinuteLabels('bottom')}
            </tbody>
          </table>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Click a cell to cycle through states. (Sleep, Wasted, Productive, Unavoidable)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GridBoard; 