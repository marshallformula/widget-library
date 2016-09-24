import React from 'react';
import DisplayBox from './display-box/display-box'
import MultiSelect from './multi-select'

let items = [
  {value: 2, label: 'two'},
  {value: 3, label: 'three'}
]

const App = React.createClass({
  render() {
    return (
      <DisplayBox>
        <MultiSelect items={items} />
      </DisplayBox>
    )
  }
})

export default App;
