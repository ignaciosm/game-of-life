import React, { useState, useEffect } from 'react'


const Grid = () => {
    const [gridSize, setGridSize] = useState(40)
    const numCols = gridSize;
    const numRows = numCols;


    // BUILD EMPTY GRID
    const emptyGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => 0))
            // console.log('pairs', cols)
        }
        return cols
    }

    // BUILD RANDOM GRID
    const randomGrid = () => {
        let cols = [];
        for (let i = 0; i < numCols; i++) {
            cols.push(Array.from(Array(numRows), () => Math.floor(Math.random() * 2)))
            // console.log('pairs', cols)
        }
        return cols
    }


    // STATE
    const [grid, setGrid] = useState(emptyGrid())
    // const [gridNew, setGridNew] = useState(buildGrid())
    const [running, setRunning] = useState(false)
    const [gen, setGen] = useState(0)
    // const [count, setCount] = useState(0)
    const [speed, setSpeed] = useState(50)
    const [cellSize, setCellSize] = useState(10)



    const toggle = () => {
        running ? setRunning(false) : setRunning(true)
        console.log('clicked start/stop')
    }

    const reset = () => {
        setRunning(false);
        setGen(0);
        setGrid(emptyGrid());
    }

    const random = () => {
        setRunning(false);
        setGen(0);
        setGrid(randomGrid());
    }

    const slower = () => {
        setSpeed(speed + 10)
    }

    const faster = () => {
        if (speed > 0) { setSpeed(speed - 10) }
    }

    const bigger = () => {
        setCellSize(cellSize + 1)
    }

    const smaller = () => {
        if (cellSize > 1) { setCellSize(cellSize - 1) }
    }

    const biggerGrid = () => {
        setGridSize(gridSize + 1)
    }

    const smallerGrid = () => {
        if (gridSize > 1) { setGridSize(gridSize - 1) }
    }

    const select = (y, x) => {
        if (!running) {
            console.log('x:', x, 'y:', y);
            let modGrid = [...grid];
            let box = modGrid[x][y];
            // 3. Replace the property you're intested in
            console.log('box', box)
            box = box ? 0 : 1;
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            modGrid[x][y] = box;
            // 5. Set the state to our new copy
            setGrid(modGrid);
        }
    }

    const handleCellSize = e => {
        setCellSize(e.target.value)
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
            }, speed);
        } else if (!running && gen !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, gen]);

    console.log('gen', gen)
    // console.log('running', running, "gen", gen)

    // range of the neighborhood
    let neighborhood = (grid, x, y) => {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let a = (x + i + numCols) % numCols;
                let b = (y + j + numRows) % numRows;
                count += grid[a][b]
            }
        }
        count -= grid[x][y];
        return count
    }


    const newGrid = grid.map((row, row_index) => (
        row.map((xy, col_index) => {

            let count = neighborhood(grid, row_index, col_index)

            if (xy === 1 && (count < 2 || count > 3)) {
                xy = 0
            }
            else if (xy === 0 && count === 3) {
                xy = 1
            }
            else {
                xy = xy
            }
            return xy
        })
    ))

    return (
        <>
            <button onClick={() => (setRunning(!running))}>{running ? 'pause' : 'start'}</button>
            <button onClick={reset}>reset</button>
            <button onClick={random}>random</button>
            <button onClick={handleNext}>{running ? 'next' : 'next'}</button>
            {/* <input type="text" value={cellSize} onChange={handleCellSize} /> */}
            <div>
                <h5>Speed: {speed} ms</h5>
                <button onClick={slower}>Slower</button>
                <button onClick={faster}>Faster</button>
            </div>
            <div>
                <h5>Cell Size: {cellSize} px</h5>
                <button onClick={smaller}>Smaller</button>
                <button onClick={bigger}>Bigger</button>
            </div>
            <div>
                <h5>Grid cells: {gridSize} x {gridSize}</h5>
                <button onClick={smallerGrid}>Fewer</button>
                <button onClick={biggerGrid}>More</button>
            </div>
            <div>Gen: {gen}</div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`
                }}
            >
                {
                    grid.map((col, x) => (
                        col.map((row, y) => (
                            <div
                                onClick={() => select(y, x)}
                                value={row}
                                key={`${x}-${y}`}
                                style={{
                                    width: `${cellSize}px`,
                                    height: `${cellSize}px`,
                                    background: row ? 'black' : 'white',
                                    border: 'solid 1px black'
                                }}>
                                {/* <span style={{ color: 'blue' }}>{row}</span> */}
                            </div>
                        ))
                    ))
                }
            </div >
        </>
    )
}

export default Grid
