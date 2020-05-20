import React, { Component } from 'react'
import axios, { post } from 'axios';

class CustomTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delimiter: null,
            dataAry: []
        }
    }

    changeDelimiter = (e) => {
        let state = this.state;
        this.setState({ delimiter: '|' })
        console.log('hey delimiter');
    }
    changeRowCount = (e) =>{
        console.log('row count')
    }
    render() {
        let elem = this.props.data.map((ele,index)=>{
        return <li key={index}>{ele.map((e)=> <span key={e}>{e}</span>)}</li>
        })
        return (
            <div>
                <ul>
                    {elem}
                </ul>
            </div>
        )
    }
}


export default CustomTable