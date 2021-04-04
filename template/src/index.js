import view from './view';
import model from './model';
import app from './app';

const node = document.getElementById('app');

app(node, view, model)