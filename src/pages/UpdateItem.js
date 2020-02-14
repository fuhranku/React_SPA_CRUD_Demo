import React, {Component} from 'react';
import firebase from '../Firebase';
import Translate from 'react-translate-component';
import FormValidator from '../components/FormValidator';

class UpdateItem extends Component {
    constructor(props){
        super(props);
        this.validator = new FormValidator([
            {
                field: 'name',
                method: 'isEmpty',
                validWhen: false,
                message: 'Name is required.',
                messageES: 'Nombre requerido.'
            },
            {
                field: 'name',
                method: 'matches',
                args:[/^[a-zA-Z]*$/],
                validWhen: true,
                message: 'Only text is allowed.',
                messageES: 'Solo texto es permitido.'
            },
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required.',
                messageES: 'Email requerido.'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Invalid email.',
                messageES: 'Email inválido.'
            },
            {
                field: 'phone',
                method: 'isEmpty',
                validWhen: false,
                message: 'Phone is required.',
                messageES: 'Teléfono requerido.'
            },
            {
                field: 'phone',
                method: 'matches',
                args:[/^[0][2,4][1-9][1-9]-\d{3}\d{4}$/],
                validWhen: true,
                message: 'Invalid number. It must be like this ( 0212-0000000 ).',
                messageES: 'Número inválido. Debe ser así ( 0212-0000000 ).'
            },
            {
                field: 'age',
                method: 'isEmpty',
                validWhen: false,
                message: 'Age is required.',
                messageES: 'Edad requerida.'
            },
            {
                field: 'age',
                method: 'isInt',
                args: [{min:1, max:100}],
                validWhen: true,
                message: 'Age must be a integer between 1 and 100',
                messageES: 'Edad debe ser un entero entre 1 y 100.'
            },
            {
                field: 'answer',
                method: 'isEmpty',
                validWhen: false,
                message: 'You must answer something.',
                messageES: 'Este campo no puede estar vacío.'
            },
            
        ]);

        this.state = {
            key: '',
            name: '',
            email: '',
            phone: '',
            age: '',
            answer: '',
            validation: this.validator.valid()
        };

        this.counterpart = props.counterpart;
        this.submitted = false;
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
        const validation = this.validator.validate(this.state);
        this.setState({validation});
        this.submitted = true;

        if (validation.isValid){
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
        }else{
            console.error('ERROR::Data validation failed');
        }
    }

    render(){
        const {name, email, phone, age, answer} = this.state;
        let validation = this.submitted ? 
        this.validator.validate(this.state) :
        this.state.validation
        return(
            <div class="container">
                
                <Translate with={{ _name: name }}  content="titleUpdateFrom" component="h3"/> 

                <div className="container mt-5 w-50">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <Translate content="nameText"/>
                        <input type="text" className="form-control" id="inputName" name="name"  value={name} onChange={this.onChange} placeholder="Enter your name"/>
                        <div id="errorName"  className={validation.name.isInvalid ? 'alert alert-danger' : 'd-none'}>{this.counterpart.getLocale() == 'es' ? validation.name.messageES : validation.name.message}</div>
                    </div>
                    <div className="form-group">
                        <Translate content="emailText"/>
                        <input type="text" className="form-control" id="inputEmail" name="email"  value={email} onChange={this.onChange}  placeholder="Enter your email"/>
                        <div id="errorEmail" className={validation.email.isInvalid ? 'alert alert-danger' : 'd-none'}>{this.counterpart.getLocale() == 'es' ? validation.email.messageES : validation.email.message}</div>
                    </div>
                    <div className="form-group">
                        <Translate content="phoneText"/>
                        <input type="text" className="form-control" id="inputPhone" name="phone"  value={phone} onChange={this.onChange}  placeholder="Enter your phone number"/>
                        <div id="errorPhone" className={validation.phone.isInvalid ? 'alert alert-danger' : 'd-none'}>{this.counterpart.getLocale() == 'es' ? validation.phone.messageES : validation.phone.message}</div>
                    </div>
                    <div className="form-group">
                        <Translate content="ageText"/>
                        <input type="text" className="form-control" id="inputAge" name="age"  value={age} onChange={this.onChange}  placeholder="Enter your age"/>
                        <div id="errorAge" className={validation.age.isInvalid ? 'alert alert-danger' : 'd-none'}>{validation.age.messageES}</div>
                    </div>
                    <div className="form-group">
                        <Translate content="questionText"/>
                        <textarea class="form-control" id="inputQuestion" name="answer" rows="3" onChange={this.onChange} value={answer} placeholder="Enter your answer ">{answer}</textarea>
                        <div id="errorQuestion" className={validation.answer.isInvalid ? 'alert alert-danger' : 'd-none'}>{this.counterpart.getLocale() == 'es' ? validation.answer.messageES : validation.answer.message}</div>
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