import React, {Component} from 'react';
import firebase from '../Firebase';
import Translate from 'react-translate-component';


class Create extends Component{

    constructor(props){

        super(props);
        this.ref = firebase.firestore().collection('survey');
        this.state = {
            name: '',
            email: '',
            phone: '',
            age: '',
            answer: ''
        };

        

    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, phone, age, answer} = this.state;

        this.ref.add({
            name,
            email,
            phone,
            age,
            answer
        }).then((docRef) => {
            this.setState({
                name: '',
                email: '',
                phone: '',
                age: '',
                answer:  ''
            });
            this.props.history.push('/Read')
        }).catch((error) => {
            console.error('ERROR::',error);
        });
    }

    onCollectionUpdate = (querySnapshot) => {
        const surveys = [];
        querySnapshot.forEach((doc) => {
            const { name, email, phone, age, answer} = doc.data();
            surveys.push({
                key: doc.id,
                doc,
                name,
                email,
                phone,
                age,
                answer
            });
        });
        this.setState({
            surveys
        });
    }

    componentDidMount(){
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render(){
        const {name, email, phone, age, answer} = this.state;

        return(
            <div class="container">

                <Translate content="titleCreate" component="h3"/>

                <div className="container mt-5 w-50">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="name">
                            <Translate content="nameText"/>
                        </label>
                        <input type="text" id="inputName" className="form-control" name="name"  value={name} onChange={this.onChange} placeholder='Enter your name'/>
                    </div>
                    <div className="form-group">
                        <label for="email">
                            <Translate content="emailText"/>
                        </label>
                        <input type="text" id="inputEmail" className="form-control" name="email"  value={email} onChange={this.onChange}  placeholder='Enter your email'/>
                    </div>
                    <div className="form-group">
                        <label for="phone">
                            <Translate content="phoneText"/>
                        </label>
                        <input type="text" id="inputPhone" className="form-control" name="phone"  value={phone} onChange={this.onChange}  placeholder='Enter your phone number'/>
                    </div>
                    <div className="form-group">
                        <label for="age">
                            <Translate content="ageText"/>
                        </label>
                        <input type="text" id="inputAge" className="form-control" name="age"  value={age} onChange={this.onChange}  placeholder='Enter your age'/>
                    </div>
                    <div className="form-group">
                        <label for="answer">
                            <Translate content="questionText"/>
                        </label>
                        <textarea class="form-control" id="inputQuestion"  name="answer" rows="3" onChange={this.onChange}  placeholder='Enter your answer'></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <Translate content="buttonSubmit"/>
                    </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create;