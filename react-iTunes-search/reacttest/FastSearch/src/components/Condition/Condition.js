import React, {Component, PropTypes} from 'react'
import { data } from './data';
import reqwest from 'reqwest';
import Item from './Item';

export default class Condition extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      areas:{},
	      stations:{}
	    };
	  }
  	componentWillMount () {
    	reqwest({
        url: '/RentSearch/PostService/GetCondition.aspx',
        type: 'json'
      })
      .then(response => this.setState({ areas:response}))
      .fail(err => this.setState({ type: 'error' }));

      reqwest({
        url: '/RentSearch/PostService/GetCondition.aspx?type=track',
        type: 'json'
      })
      .then(response => this.setState({ stations:response}))
      .fail(err => this.setState({ type: 'error' }));
  	}
  	
	render () {
		const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ];
		const {CList,District} = this.state.areas;
		data[0].options = [];
		data[0].letter = letter;
		District && District.map((item)=>{
			data[0].options.push(item);
		})
		data[0].options && data[0].options.map((o)=>{
			 o.children = {};
			 letter.map((l,index)=>{			 	
			 	CList && CList.map((c)=>{
			 		if (c.Area_pinyin.toUpperCase() == l && c.did==o.id) {
			 			
			 			if (!o.children[l]) {
			 				o.children[l] = [];
			 			};
			 				
			 		    o.children[l].push(c);
			 					 			
			 		}
			 	});

			})		
		})
		
		const {entitylist} = this.state.stations
		
		data[1].options = [];
		entitylist && entitylist.map((item)=>{
			data[1].options.push({name: item.Name,url:"/house1-j0" + item.Esf_id + "/",stations:item.Stations});
		})		
		return (
			<div className="side-menu">
				<h3>快速找房</h3>			
				<ul className="side-menu-list">
					{
						data.map((item,index)=>
							<Item key={index} {...data[index]}/>						
						)		
					}				
				</ul>
				<a className="zy_btn" href="#" target="_blank">房天下自营</a>
			</div>	
		)
	}
}