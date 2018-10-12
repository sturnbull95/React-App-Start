import React from 'react';
var Options = function(props){
  var start = () =>{
    console.log('start')
  }
    return(
      <div>
      <form onSubmit={props.onSubmit}>
        <label>
          Name:
          <input type="text" id="name"  />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
};
export default Options
