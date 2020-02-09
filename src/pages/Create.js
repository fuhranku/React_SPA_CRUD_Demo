import React, {Component} from 'react';
import firebase from '../Firebase';

class Create extends Component{
    constructor(){
        super();
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
                <h3 class="panel-title">
                    Survey participants - CREATE
                </h3>
                <div className="container mt-5 w-50">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" className="form-control" name="name"  value={name} onChange={this.onChange} placeholder="Enter your name"/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email</label>
                        <input type="text" className="form-control" name="email"  value={email} onChange={this.onChange}  placeholder="Enter your email"/>
                    </div>
                    <div className="form-group">
                        <label for="phone">Phone number</label>
                        <input type="text" className="form-control" name="phone"  value={phone} onChange={this.onChange}  placeholder="Enter your phone number"/>
                    </div>
                    <div className="form-group">
                        <label for="age">Age</label>
                        <input type="text" className="form-control" name="age"  value={age} onChange={this.onChange}  placeholder="Enter your age"/>
                    </div>
                    <div className="form-group">
                        <label for="answer">What's your opinion about space traveling?</label>
                        <textarea class="form-control" name="answer" rows="3" onChange={this.onChange}  placeholder="Enter your answer ">{answer}</textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create;