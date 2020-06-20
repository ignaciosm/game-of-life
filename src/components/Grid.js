import React, { useState } from 'react'

const Grid = () => {

    const numCols = 30;
    const numRows = 30;

    const buildGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => 0))
        }
        return cols
    }

    const [grid, setGrid] = useState(buildGrid())

    console.log(grid)

    return (

        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}
        >
            {
                grid.map((col, x) => (
                    col.map((row, y) => (
                        <div key={`${x}-${y}`}
                            style={{
                                width: 20,
                                height: 20,
                                background: grid[x][y] ? 'black' : 'white',
                                border: 'solid 1px black'
                            }}>

                        </div>
                    ))
                ))
            }
        </div >
    )
}

export default Grid
