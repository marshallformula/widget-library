import React, { PropTypes } from "react";
import { Set, Map } from "immutable";
import FontAwesome from "react-fontawesome";

const styles = {
  selector: {
    borderRadius: '2px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid rgb(170, 170, 170)',
    color: 'rgb(85, 85, 85)',
    fontSize: 'inherit',
    overflow: 'hidden',
    padding: '5px 10px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '300px'
  },

  removableListItem: {
    padding: '0.25em',
    display: 'inline-block'
  },

  removable: {
    padding: '0.4em',
    backgroundColor: 'rgb(199, 202, 209)',
    fontSize: '0.7em',
    color: 'inherit',
    display: 'inline-block',
    textDecoration: 'none'
  },

  listReset: {
    listStyle: 'none',
    paddingLeft: 0
  }
}

export default React.createClass({

  getInitialState() {
    return { selected: Set(), valueMap: Map() }
  },

  getDefaultProps() {
    return { items: [] }
  },

  componentDidMount(){
    let valMap = this.props.items.reduce((m, item) => m.set(item.value, item.label), Map())
    this.setState({ valueMap: valMap })
  },

  propTypes: {
    placeholder: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any,
      label: PropTypes.any
    })).isRequired,
    select: PropTypes.func,
    remove: PropTypes.func,
    removableStyle: PropTypes.object,
    width: PropTypes.string
  },

  changed(event) {
    let val = Number(event.target.value)
    this.setState(({ selected }) => ({ selected: selected.add(val) }))
    if (this.props.select) {
      this.props.select(val)
    }
  },

  removed(event, val) {
    event.preventDefault()
    this.setState(({ selected }) => ({ selected: selected.delete(val) }))
    if (this.props.remove) {
      this.props.remove(val)
    }
  },


  render() {
    const { items } = this.props;

    const options = items
      .filter(item => !this.state.selected.has(item.value))
      .map(item => <option key={item.value} value={item.value}>{item.label}</option>)

    const liStyle = Object.assign(styles.removableListItem, this.props.removableStyle)

    const selectedItems = this.state.selected.toArray()
      .map(sel => <li style={liStyle} key={sel}>
        <a onClick={(e) => this.removed(e, sel)} style={styles.removable} href="">
          <FontAwesome name="times"/> {this.state.valueMap.get(sel)}
        </a>
      </li>)

    const selectorStyle = Object.assign(styles.selector, { width: this.props.width || styles.selector.width })

    return (
      <div className="multi-select-container">
        <select disabled={options.length < 1} style={selectorStyle} defaultValue={"nope"} onChange={this.changed}>
          <option value={"nope"} >{this.props.placeholder || ""}</option>
          {options}
        </select>
        <div className="selected-items">
          <ul className="listReset">
            {selectedItems}
          </ul>
        </div>
      </div>
    )
  }
})
