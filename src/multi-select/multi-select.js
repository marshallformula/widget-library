import React, { PropTypes } from 'react'

export default React.createClass({

  getDefaultProps() {
    return { items: [] }
  },

  propTypes: {
    items: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any
    })).isRequired,
  },

  render() {

    const { items } = this.props;
    const options = items.map(item => <option key={item.value} value={item.value}>{item.label}</option>)

    const changed = (event) => {
      console.log(event.target.value)
    }

    return (
      <div className="multi-select-container">
        <select onChange={changed}>
          {options}
        </select>
      </div>
    )
  }
})
