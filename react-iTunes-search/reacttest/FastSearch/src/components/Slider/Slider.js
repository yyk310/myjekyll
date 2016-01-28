import React, {Component, PropTypes} from 'react'

import reqwest from 'reqwest';


export default class Slider extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	imgArr:[]
	    };
	}

	componentWillMount() {
    	reqwest({
        url: '/RentSearch/PostService/HomeLog2016.aspx',
        type: 'json'
      })
      .then(response => this.setState({ imgArr:response}))
      .fail(err => this.setState({ type: 'error' }));
  	}
  	
	render() {
		const relative = {
			position:'relative',
			height:'446px'
		}
		
		const imgArr = this.state.imgArr;
		
		return(
			<div ref="mySlider" className="flexslider" style={relative}>
		  		<ul className="slides">
					{
						imgArr.length > 0 && imgArr.map((item,index)=>
							<li key={index}>
	        					<a style={{background:'url('+item.src+') no-repeat center top'}} target="_blank" href={item.url}> </a>
							</li>
						)
					}
		  		</ul>
		    </div>
		)
	}
}