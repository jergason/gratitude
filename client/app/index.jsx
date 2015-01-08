var React = require('react');
var {component} = require('omniscient-tools');
var immstruct = require('immstruct');
var Immutable = require('immutable');


var data = immstruct({
  gratitudes: [],
  editingGratitude: {}
});

var App = component(function(props) {
  return (
    <div className="row">
      <h1>What Am I Grateful For Today?</h1>
      <GratitudeForm gratitudes={this.props.cursor.get('gratitudes')}
        cursor={this.props.cursor.get('editingGratitude')} />
      <GratitudeList cursor={this.props.cursor.get('gratitudes')} />
    </div>
  );

});

function updateCursor(cursor, key) {
  return function handleEvent(e) {
    cursor.update(key, function(oldVal) {
      return e.target.value;
    });
  }
}

function isChecked(name, cursor) {
  return cursor.get('name') == name;
}

function setName(name, cursor) {
  return function(e) {
    cursor.set('name', name);
  };
}

function saveGratitude(cursor, gratitudes) {
  return function(e) {
    var gratitude = cursor.deref().set('date', new Date());
    gratitudes.update(function(g) {
      return g.unshift(gratitude);
    });
    // clear out ze cursor
    cursor.update(function() { return Immutable.Map({}); });
  }
}

var GratitudeForm = component(function({cursor, gratitudes}) {
  console.log('cursor is', cursor.toString());
  console.log('text is', cursor.get('text'));
  return (
    <div className="row">
      <div className="small-6 columns">
        <textarea value={cursor.get('text')} onChange={updateCursor(cursor, 'text')} />
      </div>

      <div className="small-6 columns">
        <label>Elizabeth or Jamison</label>
        <input type="radio" name="jamison-or-elizabeth" value="Elizabeth"
          checked={isChecked('Elizabeth', cursor)} onChange={setName('Elizabeth', cursor)} />
        <label>Elizabeth</label>
        <input type="radio" name="jamison-or-elizabeth" value="Jamison"
          checked={isChecked('Jamison', cursor)} onChange={setName('Jamison', cursor)} />
        <label>Jamison</label>
      </div>
      <div className="small-12 columns">
        <button onClick={saveGratitude(cursor, gratitudes)}>Hooray!</button>
      </div>
    </div>
  )
});

function renderGratitude(item) {
  return (
  <li>
    Name: {item.get('name')} Date: {item.get('date')} Text: {item.get('text')}
  </li>
  );
}

var GratitudeList = component(function({cursor}) {
  return (
    <div className="row">
      <ul>
        {cursor.map(renderGratitude).toJS()}
      </ul>
    </div>
  );
});

function render() {
  React.render(<App cursor={data.cursor()} />, document.querySelector('.app'));
}

data.on('swap', render);
render();
