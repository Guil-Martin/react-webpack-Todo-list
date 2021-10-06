import React, { useState, useRef } from 'react';
import { render } from "react-dom"
import {
	Container, Grid, Typography,
	Button,
	IconButton,
	ButtonGroup,
	TextField,
	Card,
	CardActions,
	CardContent,
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/BorderColor';
import PriorityIcon from '@mui/icons-material/DateRange';

import './style.scss';

const colorPriority = [
	{priority: 'lowest', color: '#81c784'}, 
	{priority: 'low', color: '#4fc3f7'}, 
	{priority: 'medium', color: '#ffb74d'}, 
	{priority: 'high', color: '#e57373'}
]

const App = (props) => {
		
	const textFieldTodo = useRef(null);

	const [rerender, setRerender] = useState(false);
	
	const [inputValue, setInputValue] = useState();
	const [todoList, setTodoList] = useState([]);

	const [isEditing, setIsEditing] = useState(false);
	const [idToEdit, setIdToEdit] = useState();
	
	const handleAdd = (value) => {
		if (value != "") {

			// Set priority for how many ! are added at the start of the string, they remove them
			let PriorityMarkCounter = 0
			for (let i = 0; i < 3; i++) { if (value[i] === '!') { PriorityMarkCounter+=1 } }
			value = value.substring(PriorityMarkCounter).trim();

			const currentDate = new Date()
			const newItem = { id: currentDate.getTime().toString(), 
												title: value, 
												priority: colorPriority[PriorityMarkCounter].priority,
												color: colorPriority[PriorityMarkCounter].color, 
												date: currentDate };

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

	const handlePriority = (item) => {
		let colorState = colorPriority.findIndex(x => x.priority === item.priority);
		colorState = colorState > (colorPriority.length - 2) ? 0 : colorState + 1;
		item.priority = colorPriority[colorState].priority;
		item.color = colorPriority[colorState].color;
		setRerender(!rerender);
	}

	return (
		<Container>

			<Grid container spacing={2} justifyContent="center">

				<Grid item xs={12}>

					{ isEditing ?
					
					<>
						<TextField style={ { width:'80%', height:50, } } variant="outlined"
							id="outlined-basic" 
							label= {idToEdit + " - Edit ToDo"} 
							inputRef={ textFieldTodo }
							onKeyPress={(e) => {
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
						<TextField style={ { width:'80%', height:50, } } variant="outlined"
						id="outlined-basic" 
						label="ToDo" 
						inputRef={ textFieldTodo }
						onKeyPress={(e) => { if (e.key === 'Enter') { handleAdd(inputValue); } }}
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
								<Card sx={{ minWidth: 275 }}>

									<CardContent>
										{/* <Typography sx={{ fontSize: 14 }} style={{color:'#42a5f5'}} gutterBottom>
											Todo num: { item.id }
										</Typography> */}
										<Typography variant="h5" component="div">
											{ item.title }
										</Typography>

										<Typography sx={{ mb: 1.5 }} style={{color:'#81c784'}}>
											Published: { item.date.getFullYear() + "/" +  item.date.getDate() + "/" +  item.date.getMonth() + " at " +  item.date.getHours() + "H" +  item.date.getMinutes()  }
										</Typography>
									</CardContent>

									<CardActions disableSpacing>
										<IconButton aria-label="Edit" style={{color:'#ffb74d'}} onClick={(e) => {
											setIsEditing(true);
											setIdToEdit(item.id);
											textFieldTodo.current.focus();
										}}>
											<EditIcon />
										</IconButton>

										<IconButton aria-label="Delete" style={{color:'#d32f2f'}} onClick={(e) => {
												setTodoList(todoList.filter((it) => it.id !== item.id));
											}}>
											<DeleteIcon />
										</IconButton>
										
										<IconButton aria-label="Priority" style={{backgroundColor: item.color}} onClick={(e) => {
												handlePriority(item);
											}}>
											<PriorityIcon /> 
											<Typography sx={{ mb: 1.5 }}>
												{ item.priority.toUpperCase() }
											</Typography>
										</IconButton>
									</CardActions>

								</Card>
							</Grid>
						))}

					</Grid>
					
				</Grid>

			</Grid>
		</Container>
	);

};

const appDiv = document.getElementById("app");
render(<App />, appDiv);