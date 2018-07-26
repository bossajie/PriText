import React from 'react'
const FA = require('react-fontawesome');
import './styles.css';

export default class App extends React.Component{
    render(){
        return(
        <div className="container">
            <div className="row">
                <div className="col-md-5 offset-md-3">
                    <div className="card-body">
                        <div className="card row">
                            <div className="card-header">

                                &nbsp;
                            </div>
                            <form className="form-group no-padding">
                                <div className="input-group mb-1">
                                        <div className="input-group-prepend "> 
                                            <label className="input-group-text rounded-0" htmlFor="name">
                                            <FA style={{'width':'15px'}} name="user"/></label>
                                        </div>
                                            <input type="text" className="form-control rounded-0 form-control-sm" 
                                            id="name" name="name" placeholder="Name"/>
                                </div>
                                <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                       <div className="input-group-prepend "> 
                                            <label className="input-group-text rounded-0" htmlFor="number">
                                            <FA style={{'width':'15px'}} name="phone-square"/></label>
                                        </div>
                                            <input type="text" className="form-control rounded-0 form-control-sm" 
                                            id="number" name="number" placeholder="09123456789"/>   
                                </div>
                                <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                       <div className="input-group-prepend "> 
                                            <label className="input-group-text rounded-0" htmlFor="number">
                                            <FA style={{'width':'15px'}} name="comment"/></label>
                                        </div>
                                        <textarea placeholder="......" style={{'resize':'none','height':'150px'}} className="form-control rounded-0" aria-label="With textarea"></textarea> 
                                </div>
                                <div style={{'marginTop':'-4px','textAlign':'center'}}>
                                <button type="button" className="btn btn-success btn-lg btn-block">SEND</button>
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