import React, { useCallback, useEffect } from 'react';
import { Button, Typography } from '../../atoms';
import { useGrooming, useSocket } from 'contexts';
import { IconChevronLeft, IconDragDrop } from '@tabler/icons-react';
import { GroomingTask, Task } from '../../interfaces';
import { GroomingTaskCard } from '../groomingTaskCard';
import { DragDropContext, Droppable, Draggable, DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';
import translate from 'translations';

export const SelectGroomingTasks = () => {
  const {
    setIsSelectSelected,
    getGroomingTeamTasks,
    tasks,
    setTasks,
    teamTasks,
    setTeamTasks,
    updateGroomingTasks,
    removeGroomingTask,
    groomingData,
    setShowAddTaskToGameModal,
    isSelectSelected,
    isGameStarted
  } = useGrooming();
  const socket = useSocket();

  const handleBackToGroomingClick = () => {
    setIsSelectSelected(false);
  };

  const handleAddClick = () => {
    setShowAddTaskToGameModal(true);
  };

  useEffect(() => {
    const fetchTeamTasks = async () => {
      await getGroomingTeamTasks();
    };
    if (isSelectSelected) {
      fetchTeamTasks();
    }
    window.scrollTo(0, 0);
  }, [getGroomingTeamTasks, isSelectSelected]);

  const formatTasksWithOrder = (tasksToFormat: GroomingTask[]) => {
    return tasksToFormat.map((destinationTask: GroomingTask, index: number) => {
      return { ...destinationTask, order: index };
    });
  };

  const handleDragEnd = useCallback(
    async (result) => {
      if (!result.destination) {
        return;
      }

      // Reorder tasks within the same column (tasks array)
      if (result.source.droppableId === 'groomingTasks' && result.destination.droppableId === 'groomingTasks') {
        const updatedTasks = Array.from(tasks);
        const [removedTask] = updatedTasks.splice(result.source.index, 1);
        updatedTasks.splice(result.destination.index, 0, removedTask);
        setTasks(updatedTasks);
        socket.emit('taskSelection', {groomingId: groomingData._id ,tasks: updatedTasks})
        const updatedTasksWithOrder = formatTasksWithOrder(updatedTasks);
        await updateGroomingTasks(updatedTasksWithOrder);
      }

      // Disable reordering in the same column for team tasks
      if (result.source.droppableId === 'groomingTeamTasks' && result.destination.droppableId === 'groomingTeamTasks') {
        return;
      }

      // Move task from grooming team tasks to grooming tasks
      if (result.source.droppableId === 'groomingTeamTasks' && result.destination.droppableId === 'groomingTasks') {
        const sourceTasks = Array.from(teamTasks);
        const destinationTasks: GroomingTask[] = Array.from(tasks);
        const [movedTask] = sourceTasks.splice(result.source.index, 1);
        const modifiedMovedTask = { detail: movedTask, order: result.destination.index };
        destinationTasks.splice(result.destination.index, 0, modifiedMovedTask as GroomingTask);
        const updatedOrderDestinationTasks = formatTasksWithOrder(destinationTasks);
        setTeamTasks(sourceTasks);
        setTasks(destinationTasks);
        socket.emit('taskSelection', {groomingId: groomingData._id ,tasks: destinationTasks})
        await updateGroomingTasks(updatedOrderDestinationTasks, movedTask._id);
      }

      // Move task from grooming tasks to grooming team tasks
      if (result.source.droppableId === 'groomingTasks' && result.destination.droppableId === 'groomingTeamTasks') {
        const sourceTasks = Array.from(tasks);
        const destinationTasks: Task[] = Array.from(teamTasks);
        const [movedTask] = sourceTasks.splice(result.source.index, 1);
        const modifiedMovedTask = { ...movedTask.detail, gameId: '' };
        destinationTasks.splice(result.destination.index, 0, modifiedMovedTask as Task);
        setTasks(sourceTasks);
        setTeamTasks(destinationTasks);
        socket.emit('taskSelection', {groomingId: groomingData._id ,tasks: sourceTasks})
        await removeGroomingTask(modifiedMovedTask._id);
      }
    },
    [updateGroomingTasks, setTasks, setTeamTasks, tasks, teamTasks, removeGroomingTask, socket, groomingData._id]
  );

  if (!isSelectSelected || isGameStarted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-y-10">
      <Button variant="blackText" onClick={handleBackToGroomingClick} className="text-left">
        <div className="flex gap-x-2">
          <IconChevronLeft />
          <span>{translate('BACK_TO_GROOMING')}</span>
        </div>
      </Button>
      <Button variant="text" onClick={handleAddClick} className="w-fit ml-auto">
        {translate('ADD')}
      </Button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          data-testid="grooming-tasks-drag-drop-container"
          className="border-dashed border-primary rounded-lg border"
        >
          <Droppable droppableId="groomingTasks">
            {(provided: DroppableProvided) => (
              <div
                className="w-full min-h-[288px] flex flex-col gap-y-2 p-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {!tasks.length ? (
                  <div className="flex flex-col items-center min-h-[288px] justify-center">
                    <IconDragDrop className="text-primary w-12 h-12" />
                    <Typography element="p" weight="semibold" size="md">
                      Drag tasks here for this grooming
                    </Typography>
                  </div>
                ) : (
                  tasks.map((task: GroomingTask, index) => (
                    <Draggable key={task.detail._id} draggableId={task.detail._id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <GroomingTaskCard
                            title={task?.detail?.title}
                            taskId={task?.detail?._id}
                            description={task?.detail?.description}
                            gameId={task?.detail?.gameId}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <Typography element="p" color="gray" size="md" weight="semibold">
            {groomingData.team.name}
          </Typography>
          <Typography element="p" color="darkgray" size="xxs" weight="regular">
            {translate('REORDER_WARNING')}
          </Typography>
        </div>
        <div data-testid="grooming-team-tasks-drag-drop-container" className="border border-bordergray rounded-lg">
          <Droppable droppableId="groomingTeamTasks">
            {(provided: DroppableProvided) => (
              <div
                className="w-full min-h-[288px] flex flex-col gap-y-2 p-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {teamTasks.map(
                  (task: Task, index) =>
                    !task.gameId && (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided: DraggableProvided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <GroomingTaskCard
                              title={task.title}
                              taskId={task._id}
                              description={task.description}
                              gameId={task.gameId}
                              disableEdit={true}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
