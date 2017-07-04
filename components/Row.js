import React from 'react';

export default class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ row: nextProps.row });
  }

  checkHandler(e) {
    this.props.socket.emit('changePanel', {
      row: this.props.row_index,
      col: e.target.value,
      val: !this.state.row[e.target.value]
    });
  }

  renderRow() {
    return this.state.row.map((val, index) => {
      let idName = `checkbox_${this.props.row_index}_${index}`;
      return (
        <div key={index} className={index === this.props.interval ? "checkbox time-interval" : "checkbox"}>
          <input id={idName} type="checkbox" checked={this.state.row[index]} value={index} onChange={this.checkHandler.bind(this)}/>
          <label htmlFor={idName}/>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="row">
        {this.renderRow()}
      </div>
    );
  }
};
