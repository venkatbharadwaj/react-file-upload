import React, { Component, Fragment} from 'react'
import axios, { post } from 'axios';
import CustomTable from './CustomTable';

class FileUpload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      data:[],
      delimiter: ',',
      rowCount: 2
    }
  }

  onFormSubmit = (e)=> {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      if (response.data.uploaded) {
        return response.data;
      } else {
        throw Error('unable to upload')
      }
    }).then((data)=>{
      // make a request to download the file by sending delimiter and number
      console.log(data, 'belly');
      //make call of change
      this.parseData();
    });
  }

  onChange = (e)=> {
    console.log(e.target.files[0])
    this.setState({ file: e.target.files[0] })
  }
  changeDelimiter = (e) =>{
    let state = this.state;
    this.setState({
      ...state,
      delimiter: e.target.value
    });
  }

  changeRowCount = (e)=>{
    let state = this.state;
    this.setState({
      ...state,
      rowCount: e.target.value
    });
  }

  fileUpload = (file) => {
    const url = 'http://localhost:8080/api/upload';
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config);
  }

  parseData = ()=>{
    console.log('ana');
    axios.get(`http://localhost:8080/api/data/${this.state.delimiter}/row/${this.state.rowCount}`).then((res) =>{
      console.log(res.data.data);
      let state = this.state;
      this.setState({
        ...state,
        data: res.data.data
      });
    });
  }

    render() {
        return (
          <Fragment>
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
            <input type='text' name="delimiter" onChange={this.changeDelimiter} value={this.state.delimiter} />
            <input type='number' name="row-count" onChange={this.changeRowCount} value={this.state.rowCount}/>
          <CustomTable data={this.state.data}></CustomTable>
          </Fragment>
        )
    }
}

export default FileUpload