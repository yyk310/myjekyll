import React from 'react';
import { render } from 'react-dom';
import { data } from './src/components/Condition/data';
import App from './src/components/Condition/Condition';

render(
	<div>
		{ data.map((item,index)=>
			<App key={index} areas={item.arr} title={item.title}/>
		)}
	</div>,	
	document.querySelector('#app')
);
