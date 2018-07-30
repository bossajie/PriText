import React from 'react'
const FA = require('react-fontawesome');
import './styles.css';
import Logo from './logo.png'

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isError: false,
            errorMsg: '',
            number: '',
            message: '',
        }
    }

    onChangeHandle(e){
        console.log(e.target.name)
    }
    
    onSubmitHandle(e){
        this.setState({
            isError: !this.state.isError
        })
    }

    render(){
        return(
        <div className="container">
            <div className="row" >
                <div className="col-md-4 offset-md-4">
                    <div className="card-body" >
                        <div className="card row">
                            <div className="card-header">
                                &nbsp;
                            </div>
                            <form className="form-group no-padding">
                            <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                {this.state.isError ? 
                                    <div className="status">
                                        <label>Message Sent!!</label>
                                    </div>
                                    :''
                                    }
                                </div>
                                <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                       <div className="input-group-prepend "> 
                                            <label className="input-group-text rounded-0" htmlFor="number">
                                            <FA style={{'width':'15px'}} name="phone-square"/></label>
                                        </div>
                                            <input onChange={this.onChangeHandle.bind(this)}
                                             type="text" className="form-control rounded-0 error" 
                                            id="number" name="number" placeholder="09123456789"/>   
                                </div>
                                <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                       <div className="input-group-prepend "> 
                                            <label className="input-group-text rounded-0">
                                            <FA  style={{'width':'15px'}} name="comment"/></label>
                                        </div>
                                        <textarea onChange={this.onChangeHandle.bind(this)} name="message" placeholder="......" style={{'resize':'none','height':'200px'}}
                                         className="form-control rounded-0 success"></textarea> 
                                </div>
                                <div style={{'marginTop':'-4px','textAlign':'center','marginBottom':'-16px'}}>
                                <button onClick={this.onSubmitHandle.bind(this)} type="button" className="btn btn-success btn-lg btn-block ">SEND</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )
    }
}