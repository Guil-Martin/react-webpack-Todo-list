import React, { useState, useRef } from 'react';
import { render } from "react-dom"
import {
	Container, Grid,
	Button,
	ButtonGroup,
	TextField,
} from '@material-ui/core';

import './style.scss';

const App = (props) => {
		
	const textFieldTodo = useRef(null);
	
	const [inputValue, setInputValue] = useState();
	const [todoList, setTodoList] = useState([]);

	const [isEditing, setIsEditing] = useState(false);
	const [idToEdit, setIdToEdit] = useState();
	
	const handleAdd = (value) => {
		if (value !== "") {
			const newItem = { id: new Date().getTime().toString(), title: value };
			setTodoList([...todoList, newItem]);
			textFieldTodo.current.value = '';
			textFieldTodo.current.focus();
		}
	}

	const handleEdit = (value) => {
		setIsEditing(false);
		const toDoToEdit = todoList.find(x => x.id === idToEdit);
		toDoToEdit.title = value;
		textFieldTodo.current.value = '';
		textFieldTodo.current.focus();
	}

	return (
		<Container>

			<Grid container spacing={2} justifyContent="center">

				<Grid item xs={12}>

					{ isEditing ?
					
					<>
						<TextField id="textField" style={ { width:'80%', height:50, } }
							id="outlined-basic" label= {idToEdit + " - Edit ToDo"} variant="outlined"
							inputRef={ textFieldTodo }
							onKeyPress={(e) => {
								console.log(`Pressed keyCode ${e.key}`);
								if (e.key === 'Enter') { 
									handleEdit(inputValue);
									e.currentTarget.value = '';
								}
							}}
							onChange={(e) => { setInputValue(e.currentTarget.value) }} />

						<Button variant="contained" style={ {width:'20%', height:'100%',} }
							onClick={(e) => { handleEdit(inputValue); }}
						>
							Edit ToDo
						</Button>
					</>

					:

					<>
						<TextField style={ { width:'80%', height:50, } }
						id="outlined-basic" label="ToDo" variant="outlined"
						inputRef={ textFieldTodo }
						onKeyPress={(e) => {
							console.log(`Pressed keyCode ${e.key}`);
							if (e.key === 'Enter') { handleAdd(inputValue); }
						}}
						onChange={(e) => { setInputValue(e.currentTarget.value) }} />

						<Button variant="contained" style={ {width:'20%', height:'100%',} }
							onClick={(e) => { handleAdd(inputValue); }}
						>
							Add ToDo
						</Button>
					</>
					}
				</Grid>

				<Grid item xs={12}>

					<Grid container spacing={2}>

						{ todoList.map((item) => (
							<Grid item xs={4}>
								<div>{ item.title }</div>
								<div>{ item.id }</div>
								<ButtonGroup id={item.id} variant="contained" aria-label="outlined primary button group">

									<Button onClick={(e) => {
										setIsEditing(true);
										setIdToEdit(e.currentTarget.parentNode.id);
										textFieldTodo.current.focus();
									}}>
										Modify
									</Button>

									<Button onClick={(e) => {
										setTodoList(todoList.filter((it) => it.id !== item.id));
									}}>
										Delete
									</Button>

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