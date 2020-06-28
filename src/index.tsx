import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Button} from '@material-ui/core';
import {Alert} from '@/components/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const initState = {
    alertOpen: false,
    alertTitle: "提示",
    alertText: ""
};

class App extends React.Component {

	constructor(props){
		super(props);
		this.state = initState;
	}

	btnClickHandler(){
		this.setState({
			alertOpen: false,
			alertText: "确定要删除吗？"
		})
	}

	render(){
		return (
			<div>
      <p>呵！ React</p>
			<Button size='small' startIcon={<DeleteForeverIcon />} onClick={this.btnClickHandler}>Show Alert</Button>
			</div>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
