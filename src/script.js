import './style.scss';
import Person from './Person'

let nico = new Person('Nico', 'Le Chenic');
let wrapper = document.querySelector('#wrapper');

wrapper.innerHTML = `<p>${nico.message()}</p>`;