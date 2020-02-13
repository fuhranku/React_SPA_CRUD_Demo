import React, {Component} from 'react';
import en from '../lang/en';
import es from '../lang/es';

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search;
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    return (
      <li className={liClassName}>
        <a href={props.path} className="nav-link">
        {props.name}
        {(props.path === pageURI) ? (<span className="sr-only">(current)</span>) : ''}
        </a>
      </li>
    );
}

class Navigation extends Component{

    constructor(props){
        super(props);
        this.counterpart = props.counterpart;

        this.counterpart.registerTranslations('en',en);
        this.counterpart.registerTranslations('es',es);

        this.counterpart.setLocale('en');


        this.changeSpanish = this.changeSpanish.bind(this);
        this.changeEnglish = this.changeEnglish.bind(this);
    }

    changeSpanish(lang){
        this.counterpart.setLocale('es');

        //change placeholders
        if(!document.getElementById('inputName')) return;

        document.getElementById('inputName').placeholder = this.counterpart.translate("placeholderName",{});
        document.getElementById('inputEmail').placeholder = this.counterpart.translate("placeholderEmail",{});
        document.getElementById('inputPhone').placeholder = this.counterpart.translate("placeholderPhone",{});
        document.getElementById('inputAge').placeholder = this.counterpart.translate("placeholderAge",{});
        document.getElementById('inputQuestion').placeholder = this.counterpart.translate("placeholderQuestion",{});

    }

    changeEnglish(){
        this.counterpart.setLocale('en');

        //change placeholders
        if(!document.getElementById('inputName')) return;

        document.getElementById('inputName').placeholder = this.counterpart.translate("placeholderName",{});
        document.getElementById('inputEmail').placeholder = this.counterpart.translate("placeholderEmail",{});
        document.getElementById('inputPhone').placeholder = this.counterpart.translate("placeholderPhone",{});
        document.getElementById('inputAge').placeholder = this.counterpart.translate("placeholderAge",{});
        document.getElementById('inputQuestion').placeholder = this.counterpart.translate("placeholderQuestion",{});
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">React-CRUD</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavItem path='/Create' name="Create"/>
                    <NavItem path='/Read' name="Read"/>
                    <NavItem path='/Update' name="Update"/>
                    <NavItem path='/Delete' name="Delete"/>
                </ul>
                <button onClick={this.changeEnglish}>English</button>
                <button onClick={this.changeSpanish}>Spanish</button>
            </div>
            </nav>
        );
    }
}

export default Navigation;