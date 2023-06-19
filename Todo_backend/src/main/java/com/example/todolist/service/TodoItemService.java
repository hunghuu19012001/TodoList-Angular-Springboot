package com.example.todolist.service;

import com.example.todolist.entity.TodoItem;
import com.example.todolist.entity.dto.request.TodoItemCreateDto;
import com.example.todolist.repo.TodoRepo;

import java.util.Collection;
import java.util.List;

public interface TodoItemService {
    List<TodoItem> getTodoItem();
    TodoItem createTodoItem(TodoItemCreateDto todoItem);

    TodoItem getTodoItemById(Integer id);

    TodoItem updateTodoItem(Integer id, TodoItem todoItem);

    void hardRemoveTemplateById(Integer id);

    void deleteTodoItem(Integer id);


    void markTodoAsInProgress(int id);

    void markTodoAsDone(int id);


    List<TodoItem> getTodoItemsByCreatedBy(String createdBy) ;

    
}
