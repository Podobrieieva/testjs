import React, { Component } from 'react';

import './App.css';

import { connect, Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunk from 'redux-thunk';

import {Router, Route, Link, Switch} from 'react-router-dom';
import createHistory from "history/createBrowserHistory";




const test3 = [
  {id: 0, question: "Which symbol is used for single line comments in Javascript?",  answer: '//'},
  {id: 1, question: "Which of the following methods of String object produces an HTML hypertext link for requesting another URL? ",  answer: "link()"},
  {id: 2, question: "How can you convert the string of any base to integer in JavaScript?", answer: "parseInt()"},
  {id: 3, question: "What would following code return? - console.log(typeof typeof 1)", 
   answer: '"string"'},
  {id: 4, question: "Inside which HTML element do we put the JavaScript?", answer: "<script>"}
];





class NavigationButton3 extends Component {
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



class Result3 extends Component{
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
  static get defaultProps(){
    return {userName: "Student"};
}
} 


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
                              
let DisplayQuestion3 = props => <div>
                              
                              <h2><b>{props.questions[props.current].question}</b></h2>
                              
                              <InputAnswers questions={props.questions}  current={props.current} response={props.response} handleResponseChange={props.handleResponseChange} />
                              
                              <div className ="lineButtons">
                              <NavigationButton3 className="buttons"  buttonName="<< Prev" value={parseInt(props.current, 10) - 1}
                              onClick={props.handleNavigation} btnDisableStatus={props.current>0 ? false:true} />

                              
                              <NavigationButton3 className="buttons"  buttonName="Next >>"
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
            <DisplayQuestion3 current={this.state.current} 
                             questions={this.props.test}
                              response={this.state.response} 
                              handleSubmit={this.handleSubmit}
                              handleNavigation={this.handleNavigation}
                              handleResponseChange={this.handleResponseChange} />
         <div className = "link"><Link to={{pathname:"/main", state: this.state.userName}}> to main page </Link> </div>

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
///////////////
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


  
class Result2 extends Component{
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
  static get defaultProps(){
    return {userName: "Student"};
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



  class Testy2 extends Component {
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
       return <Result2 correctResponsesCount = {this.state.correctResponsesCount } userName = {this.props.userName}/>

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
               <Testy2 test= {test2} userName = {this.props.location.state}/>
             </div>
        )
    }
}

////////////////////////// 
function todayDate() {
  let today = new Date();
  return today.toLocaleDateString()
}

class UserForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      emailId: '',
      btnDisableValue: true
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    
    this.setState({[e.target.name]: e.target.value}, () => {
      if(this.state.name && this.state.emailId) {
        this.setState({
          btnDisableValue: false
        })
      }
      else {
        this.setState({
          btnDisableValue: true
        })
      }
    });
  }
  handleSubmit(e) {
    this.props.userName(this.state.name);
    e.preventDefault();
    console.log ( e.preventDefault)
  }

  render(){
    let style = {backgroundColor: this.state.btnDisableValue ? "red" : ""}
    return(
      <div className="userForm">
      <form onSubmit={this.handleSubmit} >
        <div className="name">
          <input type="text"  name="name" value={this.state.name} placeholder="Name" onChange={this.handleInputChange} />
        </div>
        <div className="email">
          <input type="email" name="emailId"  value={this.state.email} placeholder="Email" onChange={this.handleInputChange} />
        </div>
        <div className="date">
          <input type="text"  value={todayDate()} />
        </div>
        <button type="submit"  className= "button" style ={style} disabled={this.state.btnDisableValue === true}> Выбрать тест</button>
      </form>
    </div>
    );
  }
}

let answerSum = 0

let test = {
      name: "JavaScript/Base JS",
      questions: [
        {question: "How to add a new element to an array?",
        answers: [
                {text: "newArray.put(newElement)", weight: 0},
                {text:"newArray.addNew(newElement)", weight: 0},
                {text: "newArray.push(newElement)", weight: 50},
                {text:"newArray.unshift(newElement)", weight: 50}
                ],
        type: "one"
        },
        {question: "How is the comment created in Javascript?",
        answers: [
              {text: "<? comment ?>", weight: 0},
              {text:"<!-- comment -->", weight: 0},
              {text: "#comment", weight: 0},
              {text:"/* comment */", weight: 50},
              {text: "// comment", weight: 50},
              
              ],
        type: "one"
      },
          {question: "Which statement returns TRUE?",
          answers: [
                  {text: "null == undefined", weight: 50},
                  {text:"null == false", weight: 0},
                  {text: "NaN !== NaN", weight: 50},
                  {text:"!![]", weight: 50},
                  ],
          type: "one"
          },
          {question: "Choose a non-object from the list",
          answers: [
                {text: "'Lorem Ipsum' ", weight: 50},
                {text:"156", weight: 50},
                {text: "{}", weight: 0},
                {text:"[]", weight: 0},
                ],
          type: "one"
        }
      ]
  }


// let quesIndexReducer = (state, action) => {
//   if (state === undefined){
//     return { quesIndex: 0 };
//   }
//   if (action.type === "NEXT_QUESTION"){
//       return {quesIndex: state.quesIndex +1 }
//   }

//   return state;
// }

let checkedReducer = (state, action) => {
  if (state === undefined){
    return {answers: []};
  }
  if (action.type === "CLICKED"){
    state.answers[action.id] = action.check
    return {answers: [...state.answers],
            checked: action.id};
  }
  if (action.type === "RESET") {
    
    return {answers: [] };
  }
  return state;
 
}

function actionReset (check){
  return{
    type: "RESET",
    check: !check
  }
  
}

// function actionNext () {
//   return {
//     type: "NEXT_QUESTION",
//     data: {answer: "true"}

//   }
// }

function actionChecked (id, check) {
  return {
    type: "CLICKED",
    id,
    check
  }
}

const reducers = combineReducers ({
  
  checked: checkedReducer
})

const store = createStore(reducers, applyMiddleware(thunk));



let mapStateToProps = state => ({ answers: state.checked.answers, check: state.checked.checked})
let mapDispatchToProps = { actionChecked, actionReset};

// let ConnectedViewQuestion = connect (mapStateToProps)(props =><div>{props.quesIndex} </div>)


// store.dispatch (actionNext ())

let answerStatus = []
let Answer = props => {
    
    let saveAnswers = ( id, status) => answerStatus[id] = status;
    console.log (answerStatus)
    
  return (
        <div>
          <input type = "checkbox" onChange = {e=>{ props.actionChecked(props.id, e.target.checked ), saveAnswers(props.id, e.target.checked) } } checked={props.checked[props.id]}  />
        {props.answer.text}
        
      </div>
      )}



let Answers = props => <div> {props.question.answers.map( (answer, i) => <Answer answer ={answer} id = {i} checked={props.answers}/>)} </div>

let Question = props => <div><h2>{props.question.question}</h2>
                             <Answers question = {props.question} answers={props.answers}/>
                        </div>

class Result extends Component{
  constructor(props){
    super ()
    this.state ={userName: props.userName}
  }

  // Restart(e){
  //   window.location.reload()
  // }
  render () {
     
    return (
        <div className = "Result">
            
            <div> Congratulations, {this.props.userName}! <br/> You scored {answerSum}/450 points </div>
            <br/><p> <Link to={{pathname:"/main", state: this.state.userName}}>  to main page </Link> </p>
        </div>

    )
  }
  static get defaultProps(){
    return {userName: "Student"};
}
}

class Test extends Component {
  constructor(props){
    super()
      this.state = {currentValue: 0,
                    userName: props.userName
                    }
                  }
  
    onMouseover(e){
                    this.butNext.style.color = "rgb(162, 0, 255)"
                    this.butNext.style.backgroundColor = "rgb(247, 0, 255)"
                    this.butNext.style.cursor = "pointer"
                    this.butNext.style.height = "55px"
                    this.butNext.style.width = "120px"
                    this.butNext.style.transition = "0.5s"
                    this.butNext.style.fontSize= "25px"
              
                }
              
    onMouseout (e){
                  this.butNext.style.color = "rgb(247, 0, 255)"
                  this.butNext.style.backgroundColor = "rgb(162, 0, 255)"
                  this.butNext.style.height = "50px"
                  this.butNext.style.width = "100px"
                  this.butNext.style.fontSize= "20px"
                }               
  addAnswerWeight () {
      let sum = 0;
      for (var i=0; i<test.questions[this.state.currentValue].answers.length; i++){
          if (answerStatus[i] && answerStatus[i] == true)
          sum += test.questions[this.state.currentValue].answers[i].weight 
          console.log ('привет', sum)
      }
      return  answerSum += sum;
     

    }

  onClick (e){
    if (this.props.answers == false){
      return alert ("Введите ответ")
    } else { 
           // this.props.actionNext ()
           this.props.actionReset ()
           this.addAnswerWeight ()
           answerStatus = [];
         
         this.setState((prevState, props)=>{
           return {
             currentValue:  prevState.currentValue +1, 
           }        
           })
         }
      
}
  render() {
      console.log (this.props)
      console.log (this.props.checked)
      if (test.questions[this.state.currentValue] === undefined){
        return < Result userName = {this.props.userName}/> 
      }
      
   
    return (
      <div className = "Test">
        <h1> { this.props.tests}</h1>
        <div className= "Question"><Question  question= {test.questions[this.state.currentValue] }  answers={this.props.answers} /></div> 
        <button ref = {butt => this.butNext = butt }  onClick = {this.onClick.bind(this)}  onMouseOver = {this.onMouseover.bind(this)} onMouseOut = {this.onMouseout.bind(this)} >Next</button>
        <div className = "link"><Link to={{pathname:"/main", state: this.state.userName}}> to main page </Link> </div>
      </div>
    )
  }
}
Test = connect (mapStateToProps, mapDispatchToProps)(Test)
Answer = connect (mapStateToProps, mapDispatchToProps)(Answer)

class Main1 extends Component {
  constructor(props){
    super()
    this.state = {userName: props.location.state }
  }
  render () {
    console.log (this.state.userName)
        return (
      <div className = "Main"> 
      
      <h2>Please, choose test! </h2> 
      <ul> 
            <li> <Link to= {{pathname:"/test1", state: this.state.userName}} className="li"> Test №1 </Link></li> 
            <li> <Link to={{pathname:"/test2", state: this.state.userName}} className="li"> Test №2 </Link></li> 
            <li> <Link to={{pathname:"/test3", state: this.state.userName}} className="li"> Test №3 </Link></li>
            
      </ul>
    
      
      </div>
    )
  }
}
class Main extends Component {
  constructor(props){
    super()
    this.state = {userName: props.userName}
  }
  render () {
    console.log (this.state.userName)
        return (
      <div className = "Main"> 
      
      <h2>Please, choose test! </h2> 
      <ul> 
            <li> <Link to= {{pathname:"/test1", state: this.state.userName}} className="li"> Test №1 </Link></li> 
            <li> <Link to={{pathname:"/test2", state: this.state.userName}} className="li"> Test №2 </Link></li> 
            <li> <Link to={{pathname:"/test3", state: this.state.userName}} className="li"> Test №3 </Link></li>
            
      </ul>
    
      
      </div>
    )
  }
}


class LogIn extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userFormSubmitStatus: false,
      userName: ''
    }
    this.handleUserFormSubmit = this.handleUserFormSubmit.bind(this);
    
  }

  handleUserFormSubmit(userName) {
    this.setState({
      userFormSubmitStatus: true,
      userName: userName
    })
  }
  render(){
    let element;
    if(this.state.userFormSubmitStatus === false) {
      element = <UserForm userName={this.handleUserFormSubmit} />
    }
  
    else  {
      element = < Main  userName={this.state.userName}/>          
    }
    
    return (
      <div className = "LogIn">
        <h1>Welcome to the test world!</h1>
        {element} 
      </div>
    )
  }
}

class NotFound extends Component{
  constructor(props){
    super()
    this.state={userName: props.userName}
  }
  render(){
    return(
      <div className ="Error"> Error 404 <br />
                        <Link to={{pathname:"/main", state: this.state.userName}}> ... Go back to main page</Link></div>
    )
  }
}


const Test1 = props => <div> < Test tests = {test.name} userName = {props.location.state} /> </div>



class App extends Component {
  render() {
    return (
      <Provider store = {store}>
      <Router history= {createHistory()}>
          <div className="App">
            <Switch>
                <Route path = "/" component= {LogIn} exact />
                <Route path = "/main" component = {Main1}  />
                <Route path = "/test1" component = {Test1 } exact />
                <Route path = "/test2" component = {Test2} exact/>
                <Route path = "/test3" component = {Test3} exact/>
                <Route path = "/test1/result" component = {Result}  />
                <Route component= {NotFound} />
                
            </Switch>
            
           
          </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
