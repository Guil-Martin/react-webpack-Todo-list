import React, { useState, useEffect } from 'react';
import { render } from "react-dom"
import {
	Container, Grid,
	Button,
	ButtonGroup,
	TextField,
} from '@material-ui/core';
import Person from "./Person.ts";

import './style.scss';

// const person = new Person();

const App = (props) => {
		
	console.log("App render");

	const [inputValue, setInputValue] = useState();
	const [todoList, setTodoList] = useState([]);

	// useEffect(() => {
	// 	setMessage("Hello ")
	// 	setMessage(messList[Math.floor(Math.random()*messList.length)])
	// }, [])

	const handleAdd = (value) => {
		console.log(value)
		if (value !== "") {
			const newItem = { id: new Date().getTime().toString(), title: value };
			setTodoList([...todoList, newItem])
		}
	}

	return (
		<Container>

			<Grid container spacing={2} justifyContent="center">

				<Grid item xs={12}>
					<TextField style={ { width:'80%', height:50, } }
						id="outlined-basic" label="ToDo" variant="outlined"
						onChange={(e) => { setInputValue(e.target.value) }} />

					<Button variant="contained" style={ {width:'20%', height:'100%',} }
						onClick={(e) => { handleAdd(inputValue); }}
					>
						Add ToDo
					</Button>
				</Grid>

				<Grid item xs={12}>

					<Grid container spacing={2}>

						{ todoList.map((item) => (
							<Grid item xs={4}>
								<div>{ item.title }</div>
								<div>{ item.id }</div>
								<ButtonGroup variant="contained" aria-label="outlined primary button group">

									<Button onClick={(e) => {
										
									}}>Modify</Button>

									<Button onClick={(e) => {
										setTodoList(todoList.filter((it) => it.id !== item.id));
									}}>Delete</Button>

								</ButtonGroup>
							</Grid>
						)) }
					</Grid>
					
				</Grid>

			</Grid>
		</Container>
	);

};

const appDiv = document.getElementById("app");
render(<App />, appDiv);