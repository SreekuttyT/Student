import React, { Component } from "react";
import "./App.css";


class App extends Component {
  constructor(props) {
    super(props);

     this.state = {
      
      studName: '',   
      dob: '',
      division: 'select',
      class1: 'select',
      gender: 'select',
      formErrors: {}
    };
    this.initialState = this.state;
    
  }
  

  calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1);  // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    var age = null
    // console.log(age_now);

    if (age_now > 5 && age_now < 80) {
      age = true;
    }
    else {
      age = false;
    }
    // console.log(age)
    return age;
  }

  handleFormValidation() {
    const { studName, dob, division, class1, gender } = this.state;
    let formErrors = {};
    let formIsValid = true;
    let age_latest = null;
    // Name     
    if (!studName) {
      formIsValid = false;
      formErrors["studNameErr"] = "Name is required";
    }
    else {
        var pattern = /^[a-zA-Z\s]+$/;
        
        if (!pattern.test(studName)) {
            formIsValid = false;
            formErrors["studNameErr"] = "Invalid Name";
        }
    }
    
    
    // DOB   

    
    if (!dob) {
      formIsValid = false;
      formErrors["dobErr"] = "Date of birth is required.";
    }
    else {
       var pattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
      age_latest = this.calculate_age(dob);
      
      if (!pattern.test(dob)&& age_latest===false) {
        formIsValid = false;
        formErrors["dobErr"] = "Invalid date of birth the age must be between 5 and 80 ";

      }
    }

    //  Division   
    if (division === '' || division === "select") {
      formIsValid = false;
      formErrors["divisionErr"] = "Select division.";
    }

    //   gender

    if (gender === '' || gender === "select") {
      formIsValid = false;
      formErrors["genderErr"] = "Select gender.";
    }
    // Class    
    if (class1 === '' || class1 === "select") {
      formIsValid = false;
      formErrors["class1Err"] = "Select Class.";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }


  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.handleFormValidation()) {
      alert('You have been successfully registered.')
      this.setState(this.initialState)
    }
  }
  render() {

    const { studNameErr, dobErr, divisionErr, class1Err, genderErr } = this.state.formErrors;

    return (
      
      <div className="formDiv">
        
        <div><h1 style={{ textAlign: "center" }} >Student Information </ h1>   </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="studName"><b>Name:</b></label>
              <input type="text" name="studName"
                value={this.state.studName}
                onChange={this.handleChange}
                placeholder="Full Name"
                className={studNameErr ? ' showError' : ''} />
              {studNameErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{studNameErr}</div>
              }

            </div> 
            <br></br>
            <div>
              <label htmlFor="text"><b>Date of Birth:</b></label>
              <input type="date" name="dob"
                value={this.state.dob}
                onChange={this.handleChange}
                placeholder="DD/MM/YYYY"
                className={dobErr ? ' showError' : ''} />
              {dobErr &&
                <div style={{ color: "red", paddingBottom: 10 }}>{dobErr}</div>
              }
            </div>
            <br></br>

            <div className="gender">
                <label><b>Gender:</b></label></div>
                <div>
                <input type="radio"
                 name="gender"
                  value="Male"
                  checked={this.state.gender === "Male"}
                  onChange={this.handleChange} />Male
                  <input type="radio"
                  name="gender"
                  value="Female"
                  checked={this.state.gender === "Female"}
                  onChange={this.handleChange} />Female
                             

                {genderErr &&
                  <div style={{ color: "red", paddingBottom: 20 }}>{genderErr}</div>
                }
              </div>
              <br></br> 


            <div>
              <label htmlFor="class1"><b>Class:</b></label>
              <select name="class1"
                value={this.state.class1}
                onChange={this.handleChange}
                className={class1Err ? ' showError' : ''} >
                        <option value="-1" selected>Select</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="V1">V1</option>
                        <option value="V11">V11</option>
                        <option value="V111">V111</option>
                        <option value="1X">1X</option>
                        <option value="X">X</option>
                        <option value="X11">X11</option>
                        <option value="X12">X12</option>

              </select>
              <br></br>
              {class1Err &&
                <div style={{ color: "red", paddingBottom: 10 }}>{class1Err}</div>
              }

              
              <div>
                <label htmlFor="division"><b>Division:</b></label>
                <select name="division" onChange={this.handleChange}
                  className={divisionErr ? ' showError' : ''}
                  value={this.state.division} >
                  <option value="select">--Select--</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
                {divisionErr &&
                  <div style={{ color: "red", paddingBottom: 10 }}>{divisionErr}</div>
                }
              </div>
              

              <div className="submit">
                <center><button type="submit">Submit</button></center>

              </div>
            </div>
          </form>
        </div>
      </div >
    )
  }
}



export default App;