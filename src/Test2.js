import React, { Component } from 'react';

import './App.css';

const test2 = [
    {id: 0, questions: "Which of the following methods of String object produces an HTML hypertext link for requesting another URL?", 
            optionsAnswers: ["link()",'sup()','sub()','small()'], 
            answer: 'link()'},
    {id: 1, questions: "How to get an element by id from document? ",
             optionsAnswers: ['getElementById(document, id)', "getElementsById(document, id)", 'document.getElementById(id)', 'document.getElementsById(id)'], 
             answer: "document.getElementById(id)"},
    {id: 2, questions: "What is the type of {}?", 
            optionsAnswers: ["object", 'null', 'syntax error', 'function'],
            answer: "object"},
    {id: 3, questions: "How to block default browser behaviour on an event? For example, block a redirection from a link.", 
            optionsAnswers: ["event.default = false", 'event.stopPropagation()', 'event.preventDefault()', 'event.stop()'], 
            answer: "event.preventDefault()"},
    {id: 4, questions: "How to declare a function in JS?", 
            optionsAnswers: ['def fn(){}', 'public static function(){}', "function fn(){}", 'set fn = function(){}'], 
            answer: "function fn(){}"}
  ];

class NavigationButton extends Component {
    render() {
        let style = {backgroundColor: this.props.btnDisableStatus ? "red" : ""}
        return (
            <div>
                   <button type="button" style={style} value={this.props.value} className="buttons2" onClick={this.props.onClick} disabled={this.props.btnDisableStatus}>
                   {this.props.buttonName}
                   </button>
             </div>
        )
    }
}


  
class Result extends Component{
  constructor(props){
    super()
      this.state = {userName: props.userName}
  }
  render(){
    return(
      <div className="Result">
      <div> Congratulations, {this.props.userName}!
      <br/>Сorrect answers - { this.props.correctResponsesCount }/5 </div>
      <p><Link to={{pathname:"/main", state: this.state.userName}}> to main page </Link> </p>
    </div>
    )
  }
} 
   


let Radio = props => <div >
                    <input type="radio" value={props.value} checked={props.response[props.current]===props.value} onChange={props.handleResponseChange} />
                     {' ' + props.option}
                    </div>

let OptionsAnswers = props => <div className="answer"> 
                                {props.questions[props.current].optionsAnswers.map( option =>
                                <Radio key={option} value={option} option={option} current={props.current} response={props.response}
                                handleResponseChange={props.handleResponseChange} />)}
                                </div>
let DisplayQuestion = props => <div>
                                <h1>Question № {props.questions[props.current].id + 1 }</h1>
                                <h2><b>{props.questions[props.current].questions}</b></h2>
                                <OptionsAnswers questions={props.questions} current={props.current} response={props.response} handleResponseChange={props.handleResponseChange} />

                                <div className ="lineButtons">
                                <NavigationButton   buttonName="<< Prev" value={parseInt(props.current, 10) - 1}
                                onClick={props.handleNavigation} btnDisableStatus={props.current>0 ? false:true} />

                                
                                <NavigationButton   buttonName="Next >>"
                                value={parseInt(props.current, 10) + 1}
                                onClick={props.handleNavigation} btnDisableStatus= {props.current<(props.questions.length - 1) ? false : true} />
                                 </div>
                                <button type="button" className="buttons2" onClick={props.handleSubmit}>Submit</button>
                               
                                </div>



  class Test extends Component {
    constructor(props) {
      super(props);
      this.state = {
        current: 0,
        response: Array(this.props.test.length).fill(''),
        formSubmitted: false,
        correctResponsesCount: null,
        userName: props.userName
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
        let nextQuestion = e.target.value;
     
        this.setState({
          current: nextQuestion,
        });
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
       return <Result correctResponsesCount = {this.state.correctResponsesCount } userName = {this.props.userName}/>

      }
      return (
            <div className="Test2">
              <DisplayQuestion current={this.state.current} 
                               questions={this.props.test}
                                response={this.state.response} 
                                handleResponseChange={this.handleResponseChange} 
                                handleSubmit={this.handleSubmit}
                                handleNavigation={this.handleNavigation}/>
              <div className = "link"><Link to={{pathname:"/main", state: this.state.userName}}> to main page </Link> </div>
 
            </div>
        );
    }
  }


  class Test2 extends Component {
    constructor (props){
        super()
    }
    render (){
      console.log(this.props.location.state)
        return (
            <div className = "Test2">
               <Test test= {test2} userName = {this.props.location.state}/>
             </div>
        )
    }
}

export default Test2;