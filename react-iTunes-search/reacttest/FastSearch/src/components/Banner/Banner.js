import React, {Component, PropTypes} from 'react'

export default class Banner extends Component {
	render(){
		const arr = [{text:'首页',url:'#'},{text:'整租',url:'/house/n31/'},{text:'合租',url:'/hezu/'},{text:'短租',url:'http://www.youtx.com/tianjin/'},{text:'特价房',url:'#'},{text:'发布房源',url:'/chuzuinput/'}];
		return (
			<ul className="banner-nav clearfix">
				{
					arr.map((item,index)=>
							<li key={index}><a className={index==0?'cur':''} href={item.url}>{item.text}<i></i></a></li>
					)
				}
			</ul>
		)
	}
}