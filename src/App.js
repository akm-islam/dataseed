import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Heatmap from './components/Heatmap';
import * as algorithms from "./algorithms/fetch.js"
import {InputGroupText,InputGroup,InputGroupAddon,Button,Row,Col,Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Input,Label,Form,FormText,ListGroup,ListGroupItem} from 'reactstrap';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    file:{},
    modal: false,
    xLabels:null,
    yLabels:['Sun', 'Mon', 'Tue'],
    data:null,
    features:null,
  }
};

//-----------------------------------------------------------------Upload Files
handleFile=(e)=>{
  let file=e.target.files
  this.setState({file:file})
}
handleUpload=(e)=>{
  let file=this.state.file;
  let formdata=new FormData()
  for (var key in this.state.file) {
  formdata.append('file',this.state.file[key])
  }
  axios({
    url:'http://localhost:5000/uploader',
    method:"POST",
    headers:{
    authorizition:'Hello'
    },
    data:formdata
  }).then((respose_from_server)=>{
  // then is the response
  alert("Uploaded successfull")  
  console.log(respose_from_server.data)
  },(err)=>{
    console.log(err)
  })
}
//-----------------------------------------------------------------JsonHandler
jsonHandler=()=>{
  const self=this;
  algorithms.jsonHandler().then(function(result) {
    self.setState({features:Object.values(result)})
  });
  console.log(this.state.features)
  var a=this.state.features!=null?this.state.features[0].map((item)=>{
    console.log(item)
    return item;
  }):""
}
//-----------------------------------------------------------------Render function starts here  
render() {
  return (
    <div>

<Navbar color="light" light expand="md">
        <NavbarBrand href="/">Reactstrap</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Share
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Option 1
                </DropdownItem>
                <DropdownItem>
                  Option 2
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    <div className="search-bar-container">
    <InputGroup>
    <Input placeholder="Keyword" />
        <InputGroupAddon addonType="append">
          <InputGroupText>Search</InputGroupText>
        </InputGroupAddon>
    </InputGroup>
    </div>
    </div>

    );
  }
}
export default App;

