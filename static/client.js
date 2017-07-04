import React from 'react';
import ReactDOM from 'react-dom';

import Dashboard from '../components/Dashboard';
import { synth } from '../audio/audio';

let socket = io();

let panel = new Array(30);
for (let i = 0; i < panel.length; i++) {
  panel[i] = new Array(20);
}

for (let i = 0; i < panel.length; i++) {
  for (let j = 0; j < panel[0].length; j++) {
    panel[i][j] = false;
  }
}

socket.on('connect', () => {
  console.log('Connected');
});


window.onload = () => {
  ReactDOM.render(<Dashboard panel={panel} socket={socket}/>, document.getElementById('app'));
};
