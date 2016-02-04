import React, {Component, PropTypes} from 'react'

export default class SubItem extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    showOption: false	   
	  }
	}  	
	
	handleHover(e) {		
		this.setState({showOption: !this.state.showOption})
	}

	render(){

		const {url,id,name,children,stations,letter,itemCount} = this.props;
		const show = {
			display:'block'
		};
		const hide = {
			display:'none'
		}	

		var temp = [];
		var stemp = [];	
		stations && stations.map((s,index)=>{
			if ( typeof stemp[parseInt(index/itemCount, 10)] == "undefined") {
				stemp[parseInt(index/itemCount, 10)] = [];
			}
			stemp[parseInt(index/itemCount, 10)].push(s);
		})
			
		return (
				<li className = { this.state.showOption ? "on" : "" } onMouseEnter = {this.handleHover.bind(this)} onMouseLeave = {this.handleHover.bind(this)}>
					<a href={url} target="_blank">{name}</a>											
						
							{
								letter && <div className="draw-info" style={this.state.showOption?show:hide}>
								<div className= "qx-list" >
								<p><a href="#">不限</a></p>
								<ul>
									{																
										 letter.map((l,index)=>
											{
												if ( temp.length === 2 ) {
													var temparr = temp.concat();
													temp = [];
													return(<li key={index}>																	
													{
														temparr.map((t,index)=>
														<dl key={index} className={ index === 0 ? "floatl" : "floatr" }>
														<dt>{ t.letter + (t.letter ? "：" : '') }</dt>																						
															
																<dd>
																	{
																		t.sublist.map((s,index)=>
																			<a key={index} href={s.url} target="_blank">{s.name}</a>
																		)
																	}
																</dd>																																									
															</dl>		
															)}
																															
														</li>)
													
												}else {
													if(children[l]){
														temp.push({letter:l,sublist:children[l]})
													}												
													
													if ((l=='Z' && temp.length===1)|| temp.length===2) {
														if(temp.length===1){temp.push({letter:'',sublist:[]})}
														var temparr = temp.concat();
														temp = [];
														return(<li key={index}>																	
															{
																temparr.map((t,index)=>
																<dl key={index} className={ index === 0 ? "floatl" : "floatr" }>
																<dt>{t.letter+(t.letter?"：":'')}</dt>
																	<dd>
																		{
																			t.sublist.map((s,index)=>
																				<a key={index} href={s.url} target="_blank">{s.name}</a>
																			)
																		}
																	</dd>																																									
																</dl>		
															)}																																	
														</li>)
													};
												}																		
											}												
										)
									}																							
								</ul>
							</div></div>	
							}
							{
								stemp.length > 0 && 
								<div className="draw-info" style={this.state.showOption?show:hide}>
								{stemp.map((s,index)=>
									<div key={index} className="subway-line">
										<p className="sub-line"></p>
										<ul>
											{
												s.map((ss,index)=>
													<li key={index}><a href={url.substring(url.length-1,0) +"-k0"+ss.Esf_id+"/"} target="_blank"><span className="icon-line"></span>{ss.Name}</a></li>
												)
											}											
										</ul>
									</div>
								)}
								</div>
							}		
																					
				</li>
				
		)
	}
}