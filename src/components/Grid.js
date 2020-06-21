import React, { useState, useCallback, useRef, useEffect } from 'react'

const Grid = () => {

    const numCols = 30;
    const numRows = 30;

    const buildGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => Math.floor(Math.random() * 2)))
        }
        return cols
    }

    // STATE
    const [grid, setGrid] = useState(buildGrid())
    // const [gridNew, setGridNew] = useState(buildGrid())
    const [running, setRunning] = useState(false)

    // const toggle = () => {
    //     setRunning(!running)
    // }

    // useEffect(() => {
    //     running ?
    //         setGrid(buildGrid()) :
    //         console.log('stop')
    // })

    console.log(grid)

    return (
        <>
            {/* <button onClick={toggle}>{running ? 'stop' : 'start'}</button> */}
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
