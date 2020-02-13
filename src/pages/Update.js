import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import Translate from 'react-translate-component';

class Update extends Component{

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




    // componentDidMount(){
    //         const ref= firebase.firestore().collection('survey').doc(this.props.match.params.id);
    //   ref.get().then((doc) => {
    //     if (doc.exists) {
    //       const survey = doc.data();
    //       this.setState({
    //         key:doc.id,
    //         name: survey.name,
    //         email: survey.email,
    //         phone: survey.phone,
    //         age: survey.age,
    //         answer: survey.answer
    //       });
    //     }else{
    //       console.log("ERROR::No such document");
    //     }
    //   });
    //     this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // }

    render(){
        return(
            <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  <Translate content="titleUpdate" component="h3"/>
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
                            <Link to={`/Update/${survey.key}`}className="btn btn-success">
                              <Translate content="buttonUpdate"/>
                            </Link>
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

export default Update;