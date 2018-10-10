import React, { Component } from 'react';

import './App.css';

const test3 = [
    {id: 0, question: "Which symbol is used for single line comments in Javascript?",  answer: '//'},
    {id: 1, question: "Which of the following methods of String object produces an HTML hypertext link for requesting another URL? ",  answer: "link()"},
    {id: 2, question: "How can you convert the string of any base to integer in JavaScript?", answer: "parseInt()"},
    {id: 3, question: "What would following code return? - console.log(typeof typeof 1)", 
     answer: '"string"'},
    {id: 4, question: "Inside which HTML element do we put the JavaScript?", answer: "<script>"}
  ];





  class NavigationButton extends Component {
    render() {
        let style = {backgroundColor: this.props.btnDisableStatus ? "red" : ""}
        return (
            <div>
                   <button type="button" style={style} value={this.props.value} className="buttons" onClick={this.props.onClick} disabled={this.props.btnDisableStatus}>
                   {this.props.buttonName}
                   </button>
             </div>
        )
    }
}


  
let Result3 = props=>
    <div className="Result">
      <div> Congratulations,  {props.userName}!
      <br/>Сorrect answers - { props.correctResponsesCount }/5</div>
      <p><Link to="/main"> to main page </Link> </p>
    </div>



class InputAnswers extends Component{ 
  constructor(props){
    super()
  }
  onBlur(e) {
    this.inputAnswer.value = ''
  }

    render(){
        console.log (this.props.value)
        return (
            <div> 
            <input type ="text" className="inputAnswer" ref = {c=> this.inputAnswer = c} onBlur ={this.onBlur.bind(this)}  onChange={this.props.handleResponseChange}  />
                                
            </div>
        )
    }
}  
                                
let DisplayQuestion = props => <div>
                                
                                <h2><b>{props.questions[props.current].question}</b></h2>
                                
                                <InputAnswers questions={props.questions}  current={props.current} response={props.response} handleResponseChange={props.handleResponseChange} />
                                
                                <div className ="lineButtons">
                                <NavigationButton className="buttons"  buttonName="<< Prev" value={parseInt(props.current, 10) - 1}
                                onClick={props.handleNavigation} btnDisableStatus={props.current>0 ? false:true} />

                                
                                <NavigationButton className="buttons"  buttonName="Next >>"
                                value={parseInt(props.current, 10) + 1} 
                                onClick={props.handleNavigation} btnDisableStatus= {props.current<(props.questions.length - 1) ? false : true} />
                                </div>
                                <button type="button" className="buttons" onClick={props.handleSubmit}>Submit</button>
                                
                                </div>



  class Testy3 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        current: 0,
        response: Array(this.props.test.length).fill(''),
        formSubmitted: false,
        correctResponsesCount: null,
      };

      this.handleResponseChange = this.handleResponseChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleNavigation = this.handleNavigation.bind(this);
     
    }
  
      handleSubmit(e) {
        
        let i, count=0;
      for(i=0;i<this.props.test.length;i++) {
        if(this.props.test[i].answer === this.state.response[i]) {
          count++;
        }
      }
      this.setState({
        correctResponsesCount: count,
        formSubmitted: true},

      );
     
    }
    handleNavigation(e) {
        let nextQuestion = e.target.value 
        this.setState({
          current: nextQuestion,
          
        });
       
        console.log ("Hello", nextQuestion, this.state.response)
      }
      handleResponseChange(e) {
        let responseChange = this.state.response;
        responseChange[this.state.current] = e.target.value;
        this.setState({
          response: responseChange
        });
      }
  
    render() {
      if (this.state.formSubmitted === true){
       return <Result3 correctResponsesCount = {this.state.correctResponsesCount } userName = {this.props.userName}/>

      }
      return (
            <div className="Test3">
            <CountDownTimer handleSubmit={this.handleSubmit} className = 'time' />
              <DisplayQuestion current={this.state.current} 
                               questions={this.props.test}
                                response={this.state.response} 
                                handleSubmit={this.handleSubmit}
                                handleNavigation={this.handleNavigation}
                                handleResponseChange={this.handleResponseChange} />
           <div className = "link"><Link to="/main"> to main page </Link> </div>
 
            </div>
        );
    }
  }  
 
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  
    return i;
}

  class CountDownTimer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        min: '05',
        sec: '00'
      };
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      let second = this.state.sec;
      let minute = this.state.min
      second = parseInt(second,10);
      minute = parseInt(minute,10);
      if(second===0 && minute>0){
        minute -= 1;
        second = 59;
      }
      
      else if(second===0 && minute===0) {
        this.props.handleSubmit();
      }
      else {
        second -=1;
        

      }
      second = checkTime(second);  
      minute = checkTime(minute);
  
      
      this.setState({
        sec: second,
        min: minute
      });
    }
  
    render() {
      return (
        <div>
          <span className="time"> {this.state.min + ':' + this.state.sec} </span>
        </div>
      );
    }
  }
  

class Test3 extends Component {
    constructor (props){
        super()
    }
    render (){
      console.log(this.props.location.state)
        return (
            <div className = "Test3">
              
              <Testy3 test= {test3} userName = {this.props.location.state}/>
               
             </div>
        )
    }
}

export default Test3;