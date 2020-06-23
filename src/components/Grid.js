import React, { useState, useCallback, useRef, useEffect } from 'react'

const Grid = () => {

    const numCols = 30;
    const numRows = 30;

    const buildGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => Math.floor(Math.random() * 2)))
            // console.log('pairs', cols)
        }
        return cols
    }


    const buildNewGrid = () => {
        let newGrid = grid;
        for (let x = 0; x < numCols; x++) {
            for (let y = 0; y < numRows; y++) {

                // newGrid.push(Array.from(Array(numRows), () => 0))
                newGrid[x][y] = 1
                console.log('newgrid[x][y]', x, y, newGrid[x][y])

            }
        }
        return newGrid
    }



    // STATE
    const [grid, setGrid] = useState(buildGrid())
    // const [gridNew, setGridNew] = useState(buildGrid())
    const [running, setRunning] = useState(false)

    const toggle = () => {
        setRunning(!running)
    }

    const handleNext = () => {
        setGrid(newGrid)
    }

    // useEffect(() => {
    //     running ? setGrid(buildGrid()) : console.log('stop')
    // }, [running, setRunning, grid])

    const newGrid = grid.map((row, row_index) => (
        row.map((xy, col_index) => {
            let count = 0;
            if (col_index > 0 && row_index > 0 && (col_index < numCols - 1) && (row_index < numRows - 1)) {
                count += grid[row_index - 1][col_index + 1];
                count += grid[row_index][col_index + 1];
                count += grid[row_index + 1][col_index + 1];
                count += grid[row_index - 1][col_index];
                // count += grid[row_index][col_index]
                count += grid[row_index + 1][col_index];
                count += grid[row_index - 1][col_index - 1];
                count += grid[row_index][col_index - 1];
                count += grid[row_index + 1][col_index - 1];
                // console.log('count', count)
            };
            if (xy === 1) {
                if (count < 2 || count > 3) {
                    xy = 0
                }
                else {
                    xy = 1
                }
            }
            else {
                if (count === 3) {
                    xy = 1
                }
            }

            console.log('row', row_index, "col", col_index, "value", grid[row_index][col_index])
            return xy
        })
    ))

    console.log('pair', grid[0][0])

    return (
        <>
            {/* <button onClick={toggle}>{running ? 'stop' : 'start'}</button> */}
            <button onClick={handleNext}>{running ? 'next' : 'next'}</button>
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
        </>
    )
}

export default Grid
