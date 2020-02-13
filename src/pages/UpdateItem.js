import React, {Component} from 'react';
import firebase from '../Firebase';
import Translate from 'react-translate-component';

class UpdateItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            key: '',
            name: '',
            email: '',
            phone: '',
            age: '',
            answer: ''
        };
    }

    componentDidMount(){
        const ref = firebase.firestore().collection('survey').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if(doc.exists){
                const survey = doc.data();
                this.setState({
                    key: doc.id,
                    name: survey.name,
                    email: survey.email,
                    phone: survey.phone,
                    age: survey.age,
                    answer: survey.answer
                });
            }else{
                console.log('ERROR::No such document');
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({survey:state});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name,email,phone,age,answer} = this.state;
        const updateRef = firebase.firestore().collection('survey').doc(this.state.key);
        updateRef.set({
            name,
            email,
            phone,
            age,
            answer
        }).then((docRef) => {
            this.setState({
                key: '',
                name: '',
                email: '',
                age: '',
                answer: ''
            });
            this.props.history.push('../Update')
        }).catch((error) => {
            console.error('ERROR::Couldn\'t add document ', error);
        });
    }

    render(){
        const {name, email, phone, age, answer} = this.state;
        return(
            <div class="container">
                
                <Translate content="titleUpdateFrom" component="h3"/> 
                <h3 class="panel-title" id="panelTitleUpdate"> {name}</h3>

                <div className="container mt-5 w-50">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Translate content="nameText"/>
                        <input type="text" className="form-control" id="inputName" name="name"  value={name} onChange={this.onChange} placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                         <Translate content="emailText"/>
                        <input type="text" className="form-control" id="inputEmail" name="email"  value={email} onChange={this.onChange}  placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <Translate content="phoneText"/>
                        <input type="text" className="form-control" id="inputPhone" name="phone"  value={phone} onChange={this.onChange}  placeholder="Enter your phone number"/>
                    </div>
                    <div className="form-group">
                        <Translate content="ageText"/>
                        <input type="text" className="form-control" id="inputAge" name="age"  value={age} onChange={this.onChange}  placeholder="Enter your age"/>
                    </div>
                    <div className="form-group">
                        <Translate content="questionText"/>
                        <textarea class="form-control" name="answer" id="inputQuestion" rows="3" onChange={this.onChange} value={answer} placeholder="Enter your answer ">{answer}</textarea>
                    </div>
                    <button type="submit" className="btn btn-warning">
                        <Translate content="buttonUpdate"/>
                    </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UpdateItem;