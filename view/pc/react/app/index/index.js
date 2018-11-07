import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import SNKEditor from '../../src/editor';
import './index.less';

ReactDOM.render(
	<SNKEditor show/>,
	document.getElementById('xz-lightapp-root'));