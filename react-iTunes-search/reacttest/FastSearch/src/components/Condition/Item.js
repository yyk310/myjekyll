import React, {Component, PropTypes} from 'react'
import SubItem from './SubItem';

export default class Item extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	showOption: false,
	    	changeWidth: false   
	    }
	}  	
	handleHover() {		
		this.setState({showOption: !this.state.showOption})
	}	
	render(){

		const {title,conditions,options,letter} = this.props;		
		const show = {
			display:'block'
		};
		const hide = {
			display:'none'
		}
		const height = {
			height:'400px'
		}
		
		const itemCount = options && 
						options[0] && options[0].stations && options.length <= 12 ? 11 : 16; 
		return (				
				<li className={'tit-li' + (options ?' draw':'')} onMouseEnter = { this.handleHover.bind(this)} onMouseLeave = {this.handleHover.bind(this)}>
				<h4>{title}</h4>
				<p>
					{ 
						conditions.map((item,index)=>
						<a key={index} href={item.url} target="_blank">{item.text}</a>
						)
					}
				</p>				
				{
					options &&
					<div className="draw-con" style={ this.state.showOption ? show : hide }>
						<div className="draw-l" style={ options.length <= 12 ? height : {}}>
							<ol>{
									options.map((item,index)=>
										<SubItem {...item} key={index} itemCount={itemCount} letter={letter} />
									)
								}
							</ol>
						</div>
					</div>	
				}		
			</li>	
				
		)
	}
}