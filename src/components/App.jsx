import React from 'react'
const FA = require('react-fontawesome');

var Recaptcha = require('react-recaptcha');
import prefix from './PH_PrefixNumbers'
import axios from 'axios'
import APIKEY from './API_KEY';
// var request = require('request');
import request from "superagent";


const MAX_MESSAGE = 100

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state={
            isError: false,
            errorMsg: '',
            number: '',
            message: '',
            recaptchaInstance:'',
            maxLengthMessage: '',
        }
    }
    componentDidMount(){

    }

    //every onchange event on the number and textmessage inputs.
    onChangeHandle(e){
        //For input number validation
        if(e.target.name==='number'){
            const re = /^[0-9\b]+$/;
            if (e.target.value=='' || re.test(e.target.value)){
                this.setState({number:e.target.value,isError:false})
            }
        }
        else{
            let max_length = 0
                max_length = this.state.maxLengthMessage
            this.setState({
                maxLengthMessage: (MAX_MESSAGE) - (e.target.value.length),
                message: e.target.value
            })
        }

    }
    //check for number  prefix if invalid
    onBlurHandle(e){
        if (e.target.name==='number'){
            let substring=e.target.value.substring(1,4)
            if(prefix.indexOf(parseInt(substring)) > -1 && e.target.value.length===11 || e.target.value===''){
                this.setState({
                    errorMsg: '',
                    isError: false,
                })
            }
            else{
                this.setState({
                    errorMsg: 'Invalid Number',
                    isError: true,
                })
            }
        }
    }


    // SENT THE MESSAGE NOW!
    onSubmitHandle(e){


        // check number, it should be exact 11 digits
        if (this.state.number.length!==11){
            this.setState({
                isError:true,
                errorMsg: 'Invalid. Phone number should be 11 digits.'
            })
        }
        // message should not more than 100 characters and not empty
        if (this.state.message.length===0 && this.state.message.length<100){
            this.setState({
                isError: true,
                errorMsg: 'Invalid. Message should not be empty and not more than 100 characters.'
            })
        }
        else{
            const payload ={
                "1": this.state.number,
                "2": this.state.message,
                "3": APIKEY,
            }
            request
            .post('https://cors-anywhere.herokuapp.com/https://www.itexmo.com/php_api/api.php')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Access-Control-Allow-Origin','*')
            .set('accept', 'json')
            .send(payload)
            .end((err, res) => {
                // "0" = Sent , "3" = Failed
                if (res.text==="0"){
                    this.setState({
                        isError: true,
                        errorMsg: 'Message Sent!',
                        number:'',
                        message:'',
                        maxLengthMessage:'',
                    })
                    console.log('message sent')
                }
                else{
                    this.setState({
                        isError: true,
                        errorMsg: 'Message Failed!',
                    })
                    alert('message failed')
                }
            }); 
        }


    }

    reCaptchaOnload(response){
        console.log('Recaptcha loaded')
    }
    executeCaptcha(e){
        e.preventDefault()
        this.state.recaptchaInstance.execute();
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
                                <form className="form-group no-padding"  onSubmit={this.executeCaptcha.bind(this)} >
                                <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                    {this.state.isError ? 
                                        <div className="status">
                                            <label style={this.state.errorMsg.includes('Invalid') || this.state.errorMsg.includes('Failed') ? {'color':'red',}: {}}>{this.state.errorMsg}</label>
                                        </div>
                                        :''
                                        }
                                    </div>
                                    <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                        <div className="input-group-prepend "> 
                                                <label className="input-group-text rounded-0" htmlFor="number">
                                                <FA style={{'width':'15px'}} name="phone-square"/></label>
                                            </div>
                                                <input
                                                    onBlur={this.onBlurHandle.bind(this)}
                                                    pattern=".{11}"
                                                    required
                                                    maxLength="11" 
                                                    onChange={this.onChangeHandle.bind(this)}
                                                    value={this.state.number}
                                                    type="text" 
                                                    className={this.state.number.length!==11 ? "form-control rounded-0 error" : "form-control rounded-0 success" }
                                                    id="number" name="number" placeholder="11 DIGITS NUMBER (09125990393)"
                                                />   
                                    </div>
                                    <div style={{'marginTop':'-4px'}} className="input-group mb-1">
                                        <div className="input-group-prepend "> 
                                                <label className="input-group-text rounded-0">
                                                <FA  style={{'width':'15px'}} name="comment"/></label>
                                            </div>
                                            <textarea
                                                pattern=".{100}"
                                                maxLength="100" 
                                                required
                                                onChange={this.onChangeHandle.bind(this)}
                                                value={this.state.message} 
                                                name="message" placeholder="......" 
                                                style={{'resize':'none','height':'200px'}}
                                                className={this.state.message.length===0? "form-control rounded-0 error" : "form-control rounded-0 success" }
                                                >
                                            </textarea> 
                                    </div>
                                    <div style={{'textAlign':'center','fontSize':'11px'}} >
                                        <label>{this.state.maxLengthMessage}</label>
                                    </div>
                                    <div style={{'marginTop':'-4px','textAlign':'center','marginBottom':'-16px'}}>
                                    <button disabled={this.state.isError} className="btn btn-success btn-lg btn-block">SEND</button>
                                    <Recaptcha
                                        ref={e => this.state.recaptchaInstance = e}
                                        render="explicit"
                                        sitekey="6LfOV2cUAAAAAAu7BQKDdDzppHxi8ZCIseVqIyKK"
                                        size="invisible"
                                        verifyCallback={this.onSubmitHandle.bind(this)}
                                        onloadCallback= {this.reCaptchaOnload.bind(this)}
                                    />
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