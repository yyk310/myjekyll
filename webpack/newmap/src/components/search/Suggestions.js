import React from 'react';
import classNames from 'classnames';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    };
  }
  
  render() {
    const {highlightedItem,searchTerm, suggestions} = this.props;
    const {activeItem} = this.state;
    return (
      <ul
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState({activeItem: -1})}>
        {suggestions.map((item, index) =>
          <li
            className={classNames({
              highlighted: highlightedItem === index || activeItem === index
            })}
            key={index}
            onClick={() => this.props.onSelection(item)}
            onMouseEnter={() => this.setState({activeItem: index})}
            onMouseDown={(e) => e.preventDefault()}
           >
            <span>
              {item.projname}
              <strong></strong>
            </span>
          </li>
        )}
      </ul>
    );
  }
}

Suggestions.propTypes = {
  highlightedItem: React.PropTypes.number,
  searchTerm: React.PropTypes.string.isRequired,
  suggestions: React.PropTypes.array.isRequired
};

export default Suggestions;