import React, { Fragment, useState, useRef, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	StyleSheet
} from 'react-native'

import { Task } from './TasksList'
import { EditTaskArgs } from '../pages/Home'

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'

interface TaskItemProps {
	task: Task;
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [saveNewTitleTask, setSaveNewTitleTask] = useState(task.title)
	const textInputRef = useRef<TextInput>(null)

	function handleStartEditing() {
		setIsEditing(true)
	}

	function handleCancelEditing() {
		setSaveNewTitleTask(task.title)
		setIsEditing(false)
	}

	function handleSubmitEditing() {
		editTask({ taskId: task.id, taskNewTitle: saveNewTitleTask })
		setIsEditing(false)
	}

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus()
			} else {
				textInputRef.current.blur()
			}
		}
	}, [isEditing])

	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<TouchableOpacity
					// testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(task.id)}
				>
					<View
						// testID={`marker-${index}`}
						//TODO - use style prop
						style={task.done ? styles.taskMarkerDone : styles.taskMarker}
					>
						{task.done && (
							<Icon
								name="check"
								size={12}
								color="#FFF"
							/>
						)}
					</View>

					<TextInput
						style={task.done ? styles.taskTextDone : styles.taskText}
						value={saveNewTitleTask}
						onChangeText={setSaveNewTitleTask}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						ref={textInputRef}
					/>
					{/* <Text style={task.done ? styles.taskTextDone : styles.taskText}>
						{task.title}
					</Text> */}
				</TouchableOpacity>
			</View>

			<View style={styles.iconsContainer}>
				{isEditing ? (
					<TouchableOpacity onPress={handleCancelEditing}>
						<Icon name='x' size={20} color='#b2b2b2' />
						{/* <Image source={trashIcon} /> */}
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handleStartEditing}>
						<Icon name='edit' size={20} color='#b2b2b2' />
						{/* <Image source={trashIcon} /> */}
					</TouchableOpacity>
				)}
				<View style={styles.splitIcons}></View>
				<TouchableOpacity
					style={{ opacity: isEditing ? 0.2 : 1 }}
					onPress={() => removeTask(task.id)}
					disabled={isEditing}
				>
					<Image source={trashIcon} />
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	infoContainer: {
		flex: 1
	},
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 12,
		paddingRight: 24
	},
	splitIcons: {
		width: 2,
		height: 24,
		backgroundColor: 'rgba(196, 196, 196, 0.24)',
		marginHorizontal: 15
	},
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center'
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium'
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium'
	}
})