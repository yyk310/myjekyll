import React from 'react';
import { render } from 'react-dom';
import Condition from './src/components/Condition/Condition';
import Banner from './src/components/Banner/Banner';
import Slider from './src/components/Slider/Slider';

render(
	<div className="banner clearfix">
		<Slider />
		<div className="banner-con">
			<Banner />
			<Condition />
		</div>
	</div>
	,	
	document.querySelector('#app')
);
