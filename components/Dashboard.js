import React from 'react';
import Row from './Row';
import { synth } from '../audio/audio';

import Navbar from './Navbar';
import Footer from './Footer';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panel: this.props.panel,
      freqs: [932.328, 880,
      830.609, 783.991, 739.989, 698.456, 659.255, 622.254, 587.330,
      554.365, 523.251, 493.883, 466.164, 440],
      freqs2: ['A0', 'B0', 'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
      'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2', 'C3', 'D3', 'E3', 'F3',
      'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5',
      'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6', 'D6', 'E6'],
      time_interval: 0
     };
  }

  componentDidMount() {
    this.props.socket.on('newPanel', (data) => {
      this.setState({ panel: data.new_panel });
    });

    this.props.socket.on('timeEvent', (data) => {
      this.setState({ time_interval: data.interval });
      let notes = [];
      for (let i = 0; i < this.state.panel.length; i++) {
        if (this.state.panel[i][data.interval]) {
          notes.push(this.state.freqs2[i + 10]);
        }
      }
      synth.triggerAttackRelease(notes, "8n");
    });
  }

  renderPanel() {
    return this.state.panel.map((row, row_index) => {
      return <Row key={row_index} interval={this.state.time_interval} row={row} row_index={row_index} socket={this.props.socket}/>
    });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="panel">
          {this.renderPanel()}
        </div>
        <Footer/>
      </div>
    );
  }
}
