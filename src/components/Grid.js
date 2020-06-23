import React, { useState, useCallback, useRef, useEffect } from 'react'

const Grid = () => {

    const numCols = 30;
    const numRows = 30;

    // BUILD THE GRID
    const buildGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => Math.floor(Math.random() * 2)))
            // console.log('pairs', cols)
        }
        return cols
    }


    // STATE
    const [grid, setGrid] = useState(buildGrid())
    // const [gridNew, setGridNew] = useState(buildGrid())
    const [running, setRunning] = useState(false)
    const [gen, setGen] = useState(0)
    const [count, setCount] = useState(0)


    const toggle = () => {
        running ? setRunning(false) : setRunning(true)
        console.log('clicked start/stop')
    }

    const reset = () => {
        setRunning(false);
        setGen(0);
        setGrid(buildGrid());
    }


    const handleNext = () => {
        setGrid(newGrid)
    }

    useEffect(() => {
        let interval = null;
        if (running) {
            interval = setInterval(() => {
                setGrid(newGrid)
                setGen(gen => gen + 1);
            }, 10);
        } else if (!running && gen !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, gen]);

    console.log('gen', gen)
    // console.log('running', running, "gen", gen)


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
            if (xy === 1 && (count < 2 || count > 3)) {
                xy = 0
            }
            else if (xy === 0 && count === 3) {
                xy = 1
            }
            else {
                xy = xy
            }

            // console.log('row', row_index, "col", col_index, "value", grid[row_index][col_index])
            return xy
        })
    ))

    // console.log('pair', grid[0][0])

    return (
        <>
            <button onClick={() => (setRunning(!running))}>{running ? 'pause' : 'start'}</button>
            <button onClick={reset}>reset</button>
            <button onClick={handleNext}>{running ? 'next' : 'next'}</button>
            <div>Gen: {gen}</div>
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
