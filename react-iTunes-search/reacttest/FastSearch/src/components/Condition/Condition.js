import React, {Component, PropTypes} from 'react'

export default class Condition extends Component {
	
	render () {
		const {areas,title} = this.props;
		return (
			<div>
				<p>{title}</p>
				{ areas.map((item,index)=>
					<span key={index}>{item}</span>
				)}
			</div>
		)
	}
}