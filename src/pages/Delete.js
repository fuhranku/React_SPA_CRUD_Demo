import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import Translate from 'react-translate-component';



class Delete extends Component{

    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('survey');
        this.unsubscribe = null;
        this.state = {
            surveys: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const surveys = [];
        querySnapshot.forEach((doc) => {
            const {name, email, phone, age, answer} = doc.data();
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

    // Delete by id
    delete(id){
        firebase.firestore().collection('survey').doc(id).delete().then(() => {
            console.log("UPDATE::Document deleted successfully");
            this.props.history.push('/Read');
        }).catch((error) => {
            console.error('ERROR::',error);
        });
    }

    render(){
        return(
            <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  Survey participants - DELETE
                </h3>
              </div>
              <div class="panel-body">
                <table class="table table-stripe">
                  <thead>
                    <tr>
                      <th><Translate content="nameText"/></th>
                      <th><Translate content="emailText"/></th>
                      <th><Translate content="phoneText"/></th>
                      <th><Translate content="ageText"/></th>
                      <th><Translate content="questionText"/></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.surveys.map(survey =>
                      <tr>
                        <td>{survey.name}</td>
                        <td>{survey.email}</td>
                        <td>{survey.phone}</td>
                        <td>{survey.age}</td>
                        <td>{survey.answer}</td>
                        <td>
                            <button onClick={this.delete.bind(survey,survey.key)} className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
}

export default Delete;