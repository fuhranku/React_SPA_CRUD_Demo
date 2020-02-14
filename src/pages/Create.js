import React, {Component} from 'react';
import firebase from '../Firebase';
import Translate from 'react-translate-component';
import FormValidator from '../components/FormValidator';


class Create extends Component{

    constructor(props){

        super(props);
        this.ref = firebase.firestore().collection('survey');

        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Name is required.'
            },
            {
                field: 'name',
                method: 'matches',
                args:[/^[a-zA-Z0-9_ ]*$/],
                validWhen: true,
                message: 'Only text is allowed.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Invalid email.'
            },
            {
                field: 'phone',
                method: 'isEmpty',
                validWhen: false,
                message: 'Phone is required.'
            },
            {
                field: 'phone',
                method: 'matches',
                args:[/^[0][2,4][1-9][1-9]-\d{3}\d{4}$/],
                validWhen: true,
                message: 'Invalid number. It must be like this ( 0212-0000000 )'
            },
            {
                field: 'age',
                method: 'isEmpty',
                validWhen: false,
                message: 'Age is required.'
            },
            {
                field: 'age',
                method: 'isInt',
                args: [{min:1, max:100}],
                validWhen: true,
                message: 'Age must be a integer between 1 and 100'
            },
            {
                field: 'answer',
                method: 'isEmpty',
                validWhen: false,
                message: 'You must answer something.'
            },
            
        ]);

        this.state = {
            name: '',
            email: '',
            phone: '',
            age: '',
            answer: '',
            validation: this.validator.valid()
        };

        this.submitted = false;

    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);

    }

    onSubmit = (e) => {
        e.preventDefault();
        const {name, email, phone, age, answer} = this.state;
        const validation = this.validator.validate(this.state);
        this.setState({validation});
        this.submitted = true;

        if (validation.isValid){
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
        }else{
            console.error('ERROR::Data validation failed');
        }

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
        let validation = this.submitted ? 
                         this.validator.validate(this.state) :
                         this.state.validation

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
                            <div className={validation.name.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.name.message}</div>
                    </div>
                    <div className="form-group">
                            <label for="email">
                                <Translate content="emailText"/>
                            </label>
                            <input type="text" id="inputEmail" className="form-control" name="email"  value={email} onChange={this.onChange}  placeholder='Enter your email'/>
                            <div className={validation.email.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.email.message}</div>
                    </div>
                    <div className="form-group">
                        <label for="phone">
                            <Translate content="phoneText"/>
                        </label>
                        <input type="text" id="inputPhone" className="form-control" name="phone"  value={phone} onChange={this.onChange}  placeholder='Enter your phone number'/>
                        <div className={validation.phone.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.phone.message}</div>
                    </div>
                    <div className="form-group">
                        <label for="age">
                            <Translate content="ageText"/>
                        </label>
                        <input type="text" id="inputAge" className="form-control" name="age"  value={age} onChange={this.onChange}  placeholder='Enter your age'/>
                        <div className={validation.age.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.age.message}</div>
                    </div>
                    <div className="form-group">
                        <label for="answer">
                            <Translate content="questionText"/>
                        </label>
                        <textarea class="form-control" id="inputQuestion"  name="answer" rows="3" onChange={this.onChange}  placeholder='Enter your answer'></textarea>
                        <div className={validation.answer.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.answer.message}</div>
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