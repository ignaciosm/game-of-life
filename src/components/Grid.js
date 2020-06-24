import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const Grid = () => {
    // GRID SIZE
    const [gridSize, setGridSize] = useState({
        cols: 60,
        rows: 40
    });

    // const numCols = gridSize.cols;
    // const numRows = gridSize.rows;


    // BUILD EMPTY GRID
    const emptyGrid = () => {
        let rows = [];
        for (let i = 0; i < gridSize.rows; i++) {
            rows.push(Array.from(Array(gridSize.cols), () => 0))
            // console.table(rows)
        }
        return rows
    }

    // BUILD RANDOM GRID
    const randomGrid = () => {
        let rows = [];
        for (let i = 0; i < gridSize.rows; i++) {
            rows.push(Array.from(Array(gridSize.cols), () => Math.floor(Math.random() * 2)))
            // console.table(rows)
        }
        return rows
    }



    // STATE
    const [grid, setGrid] = useState(randomGrid())
    const [running, setRunning] = useState(false)
    const [gen, setGen] = useState(0)
    const [speed, setSpeed] = useState(10)
    const [cellSize, setCellSize] = useState(10)


    // CONTROLLERS

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


    const changeGridSize = e => {
        setGridSize({ ...gridSize, [e.target.name]: Number(e.target.value) });
        console.log(e.target.name, Number(e.target.value))
    }

    const submitGridSize = e => {
        e.preventDefault();
        // setGrid(emptyGrid(gridSize.rows, gridSize.cols));
        setGrid(emptyGrid(gridSize.rows, gridSize.cols))
        console.log('submit')
    }

    const select = (row_index, col_index) => {
        if (!running) {
            console.log('row:', row_index, 'col:', col_index);
            let modGrid = [...grid];
            // console.table(modGrid)
            // modGrid[2, 2] = 1
            let box = modGrid[row_index][col_index];
            // 3. Replace the property you're intested in
            box = box ? 0 : 1;
            // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
            modGrid[row_index][col_index] = box;
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

    // REPLACE OLD GRID WITH NEW GRID WHEN RUNNING
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


    // CALCULATE NEIGHBORHOOD
    let neighborhood = (grid, row_index, col_index) => {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let row = (row_index + i + gridSize.rows) % gridSize.rows;
                let col = (col_index + j + gridSize.cols) % gridSize.cols;
                count += grid[row][col]
            }
        }
        count -= grid[row_index][col_index];
        return count
    }

    // CREATE NEW GRID FOR THE NEXT GENERATION
    const newGrid = grid.map((row, row_index) => (
        row.map((box, col_index) => {
            let count = neighborhood(grid, row_index, col_index)
            if (box === 1 && (count < 2 || count > 3)) {
                box = 0
            }
            else if (box === 0 && count === 3) {
                box = 1
            }
            else {
                box = box;
            }
            return box
        })
    ))

    // console.log(newGrid)

    return (
        <>
            <Header>
                <h1>Conway's Game of Life</h1>
            </Header>
            <MainWrap>
                <Sub>
                    <div>
                        <button onClick={() => (setRunning(!running))}>{running ? 'pause' : 'start'}</button>
                        <button onClick={reset}>reset</button>
                        <button onClick={random}>random</button>
                        <button onClick={handleNext}>{running ? 'next' : 'next'}</button>
                    </div>

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
                        <h5>Grid cells: {gridSize.cols} x {gridSize.rows}</h5>
                        <form onSubmit={submitGridSize}>
                            <span>
                                <label>Columns:</label>
                                <input type="text" name="cols" placeholder="columns" onChange={changeGridSize} value={gridSize.cols} />
                            </span>
                            <span> </span>
                            <span>
                                <label>Rows:</label>
                                <input type="text" name="rows" placeholder="rows" onChange={changeGridSize} value={gridSize.rows} />
                            </span>
                            <input type="submit" />
                        </form>
                        {/* <button onClick={smallerGrid}>Fewer</button>
                <button onClick={biggerGrid}>More</button> */}
                    </div>
                    <div>Gen: {gen}</div>
                </Sub>
                <Sub>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${gridSize.cols}, ${cellSize}px)`
                        }}
                    >
                        {
                            grid.map((row, row_index) => (
                                row.map((box, col_index) => (
                                    <div
                                        onClick={() => select(row_index, col_index)}
                                        key={`${row_index}-${col_index}`}
                                        style={{
                                            width: `${cellSize}px`,
                                            height: `${cellSize}px`,
                                            background: box ? 'black' : 'white',
                                            border: 'solid 1px black'
                                        }}>
                                        {/* <span style={{ color: 'blue' }}>{row}</span> */}
                                    </div>
                                ))
                            ))
                        }
                    </div >

                </Sub>
            </MainWrap>
            <Footer>
                <h3>Rules</h3>
                <ul>
                    <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                    <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                    <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
                </ul>
            </Footer>
        </>
    )
}

export default Grid


// STYLED COMPONENTS

const MainWrap = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    margin: 0 auto;
`;

const Sub = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin: 0 5%;
`;

const Header = styled.div`
    margin: 0 auto;
    width: 80%;
`;

const Footer = styled.div`
    margin: 0 auto;
    width: 60%;
`;
