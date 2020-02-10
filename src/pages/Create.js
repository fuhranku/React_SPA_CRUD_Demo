import React, {Component} from 'react';
import firebase from '../Firebase';
import Translate from 'react-translate-component';
import en from '../lang/en';
import es from '../lang/es';



class Create extends Component{

    constructor(props){

        super(props);
        this.ref = firebase.firestore().collection('survey');
        this.state = {
            name: '',
            email: '',
            phone: '',
            age: '',
            answer: '',
            locale: 'en'
        };

        this.counterpart = props.counterpart; 
        this.counterpart.registerTranslations('en',en);
        this.counterpart.registerTranslations('es',es);
        this.counterpart.setLocale(this.state.locale);

    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        state[e.target.locale] = this.counterpart.getLocale();
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

                <Translate content="title" component="h3"/>

                <div className="container mt-5 w-50">
                    <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="name">
                            <Translate content="nameText"/>
                        </label>
                        <input type="text" className="form-control" name="name"  value={name} onChange={this.onChange} placeholder={this.counterpart.translate("placeholderName",{})}/>
                    </div>
                    <div className="form-group">
                        <label for="email">
                            <Translate content="emailText"/>
                        </label>
                        <input type="text" className="form-control" name="email"  value={email} onChange={this.onChange}  placeholder={this.counterpart.translate("placeholderEmail",{})}/>
                    </div>
                    <div className="form-group">
                        <label for="phone">
                            <Translate content="phoneText"/>
                        </label>
                        <input type="text" className="form-control" name="phone"  value={phone} onChange={this.onChange}  placeholder={this.counterpart.translate("placeholderPhone",{})}/>
                    </div>
                    <div className="form-group">
                        <label for="age">
                            <Translate content="ageText"/>
                        </label>
                        <input type="text" className="form-control" name="age"  value={age} onChange={this.onChange}  placeholder={this.counterpart.translate("placeholderAge",{})}/>
                    </div>
                    <div className="form-group">
                        <label for="answer">
                            <Translate content="questionText"/>
                        </label>
                        <textarea class="form-control" name="answer" rows="3" onChange={this.onChange}  placeholder={this.counterpart.translate("placeholderQuestion",{})}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create;