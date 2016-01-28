import React, {Component, PropTypes} from 'react'

export default class Banner extends Component {
	render(){
		const arr = ['首页','整租','合租','短租','特价房','发布房源'];
		return (
			<ul className="banner-nav clearfix">
				{
					arr.map((item,index)=>
							<li key={index}><a className={index==0?'cur':''} href="#">{item}<i></i></a></li>
					)
				}
			</ul>
		)
	}
}