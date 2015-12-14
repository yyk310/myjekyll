import React, { Component } from 'react';
import emitter from '../emitter';
import Suggestions from './Suggestions';
import reqwest from 'reqwest';

const keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40
};

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      highlightedItem:-1,
      suggestions:[], 
      searchTerm:'',     
      value: ''
    };
    this.resizeTimer = null;    
  }
  scroll(key) {
    const {highlightedItem: item,suggestions} = this.state;
    const lastItem = suggestions.length - 1;
    let nextItem;

    if (key === keyCodes.UP) {
      nextItem = (item <= 0) ? lastItem : item - 1;
    } else {
      nextItem = (item === lastItem) ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: nextItem,
      value: suggestions[nextItem]
    });
  }
  _onKeyDown(e){ 
    const key = e.which || e.keyCode;
    switch (key) {
      case keyCodes.UP:
      case keyCodes.DOWN:
        e.preventDefault();
        this.scroll(key);
        break;

      case keyCodes.ENTER:
        this.search();
        break;

      case keyCodes.ESCAPE:
        this.refs.input.blur();
        break;
        default:
    }
  }
  onSelection(suggestion) {
    this.setState({value: suggestion}, () => this.search());
  }
  search(){
    
  }
  _onChange (e) {
    clearTimeout(this.resizeTimer);
    this.setState({
      query: e.target.value
    });
    if (e.target.value) {
      this.resizeTimer = setTimeout(() => emitter.emit('search', e.target.value), 200);
    }else{
       this.setState({
        suggestions: []
      });
    };    
        
  }
  mainRender() {        
    return (
      <div>
      { this.state.suggestions.length > 0 &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.onSelection.bind(this)} /> }
            </div>
            );    

  }
  componentDidMount () {
    emitter.on('search', (query) => {

      this.setState({ type: 'loading' });

      reqwest({
        url: 'http://zu.sh.test.fang.com/RentSearch/PostService/Suggestion.aspx?callback=?&omitzero=true&q=' + query.split(' ').join('+'),
        type: 'jsonp'
      })
      .then(response => this.setState({ suggestions:response.hit}))
      .fail(err => this.setState({ type: 'error' }));
    });

  }

  componentWillUnmount () {
    emitter.removeListener('search');
  }

 

  render () {

    return (  
      <div>      
        <input type="text" onKeyDown={this._onKeyDown.bind(this)} onChange={this._onChange.bind(this)} placeholder="Search..." autoFocus />
        {this.mainRender()}    
      </div>  
    );
  }

}

export default SearchBar;
