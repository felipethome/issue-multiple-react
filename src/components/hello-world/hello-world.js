var React = require('react');
var ReactTransitionGroup = require('react-addons-transition-group');

var HelloWorld = React.createClass({
  
  displayName: 'HelloWorld',

  render: function () {
    return (
      <ReactTransitionGroup>
        <h1>
          {"Hello world"}
        
        </h1>
      </ReactTransitionGroup>
    );
  }

});

module.exports = HelloWorld;