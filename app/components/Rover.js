import React, { Component } from 'react';

// Constants
const DIRECTIONS = ['N', 'E', 'S', 'W'];
const TIME = 250;
export default class Rover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      position: [0, 0],
      direction: 'E',
      degrees: 90 * DIRECTIONS.indexOf('E')
    };
  }

  componentDidMount() {
    const { command } = this.props;
    if (command) {
      this.executeComand(command);
    }
  }

  executeComand(command) {
    const letters = command.split('');

    letters.forEach((letter, index) => {
      if (letter === 'f' || letter === 'b') {
        ((i, l) => {
          setTimeout(() => {
            this.move(l);
          }, TIME + (TIME * i));
        })(index, letter);
      }

      if (letter === 'r' || letter === 'l') {
        ((i, l) => {
          setTimeout(() => {
            this.turn(l);
          }, TIME + (TIME * i));
        })(index, letter);
      }
    });
  }

  checkObstacle(position) {
    return this.props.obstacles
      .map(coords => coords[0] === position[0] && coords[1] === position[1])
      .some(bool => bool);
  }

  move(dir) {
    const { grid } = this.props;
    const { direction, position } = this.state;
    const newPosition = position.slice();

    switch (dir) {
      case 'f': {
        if (direction === 'N') {
          newPosition[1] = (position[1] === 0) ? 0 : position[1] - 1;
        } else if (direction === 'E') {
          newPosition[0] = (position[0] === grid.columns.length - 1) ? grid.columns.length - 1 : position[0] + 1;
        } else if (direction === 'S') {
          newPosition[1] = (position[1] === grid.rows.length - 1) ? grid.rows.length - 1 : position[1] + 1;
        } else if (direction === 'W') {
          newPosition[0] = (position[0] === 0) ? 0 : position[0] - 1;
        }
        break;
      }

      case 'b':
        if (direction === 'N') {
          newPosition[1] = (position[1] === grid.rows.length - 1) ? grid.rows.length - 1 : position[1] + 1;
        } else if (direction === 'E') {
          newPosition[0] = (position[0] === 0) ? 0 : position[0] - 1;
        } else if (direction === 'S') {
          newPosition[1] = (position[1] === 0) ? 0 : position[1] - 1;
        } else if (direction === 'W') {
          newPosition[0] = (position[0] === grid.columns.length - 1) ? grid.columns.length - 1 : position[0] + 1;
        }
        break;

      default:
        console.error('Unknown dir');
    }

    if (!this.checkObstacle(newPosition)) {
      this.setState({ position: newPosition });
    }
  }

  turn(dir) {
    const { direction, degrees } = this.state;
    const index = DIRECTIONS.indexOf(direction);
    let newDirection = direction;
    let newDegrees = degrees;

    switch (dir) {
      case 'l':
        newDirection = (index !== 0) ? DIRECTIONS[index - 1] : DIRECTIONS[DIRECTIONS.length - 1];
        newDegrees -= 90;
        break;

      case 'r':
        newDirection = (index !== DIRECTIONS.length - 1) ? DIRECTIONS[index + 1] : DIRECTIONS[0];
        newDegrees += 90;
        break;

      default:
        console.error('Unknown dir');
    }

    this.setState({
      direction: newDirection,
      degrees: newDegrees
    });
  }

  render() {
    const { width, height, grid } = this.props;
    const { position, direction, degrees } = this.state;
    return (
      <div
        className={`c-rover -${direction}`}
        style={{
          width,
          height,
          top: `${position[1] * grid.rows.length}%`,
          left: `${position[0] * grid.columns.length}%`,
          transform: `rotate(${degrees}deg)`
        }}
      >
        <div className="rover-body">
          <header />
          <footer />
        </div>
      </div>
    );
  }
}

Rover.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  grid: React.PropTypes.object,
  obstacles: React.PropTypes.array,
  command: React.PropTypes.string
};
