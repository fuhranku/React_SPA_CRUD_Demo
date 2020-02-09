import React, {Component} from 'react';

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
                <ul className="navbar-nav">
                    <NavItem path='/' name='Language'/>
                </ul>
            </div>
            </nav>
        );
    }
}

export default Navigation;