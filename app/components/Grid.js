import React, { Component } from 'react';
import classnames from 'classnames';

// Components
import Rover from './Rover';

const GRID = {
  rows: [...Array(16).keys()],
  columns: [...Array(16).keys()]
};

const OBSTACLES = [
  [1, 5],
  [5, 6],
  [3, 4],
  [2, 7],
  [9, 7],
  [8, 2],
  [6, 3]
];


export default class Grid extends Component {
  render() {
    const width = `${100 / GRID.rows.length}%`;
    const height = `${100 / GRID.columns.length}%`;

    return (
      <div className="c-grid">
        <ul className="grid-list">

          <Rover
            width={width}
            height={height}
            grid={GRID}
            obstacles={OBSTACLES}
            command="frffffflfffflfffffrfffffrfffflfffffffrfffffrfffffrfffflffflffrffrffffffflffll"
          />

          {GRID.rows.map((row, i) =>
            GRID.columns.map((col, j) => {
              const classNames = classnames({
                '-colored': (i % 2 === 0 && j % 2 === 0) || (i % 2 !== 0 && j % 2 !== 0),
                '-obstacle': OBSTACLES.map(coords => coords[0] === j && coords[1] === i).some(bool => bool)
              });

              return (
                <li className={`grid-item ${classNames}`} style={{ width, height }}>
                  <div className="grid-cell">
                    {/* <span className="grid-cell-number">{`${row} - ${col}`}</span> */}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
}
