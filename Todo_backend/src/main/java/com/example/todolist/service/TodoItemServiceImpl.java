package com.example.todolist.service;
import com.example.todolist.entity.TodoItem;
import com.example.todolist.entity.dto.request.TodoItemCreateDto;
import com.example.todolist.exception.NotFoundException;
import com.example.todolist.repo.TodoRepo;
import com.example.todolist.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;



@Service
//@Transactional
public class TodoItemServiceImpl implements TodoItemService {
    @Autowired
    TodoRepo todoRepo;
    @Autowired
    private TodoItemServiceImpl todoItemService;
    @Autowired
    private UserRepository userRepo;


    @Override
    public List<TodoItem> getTodoItem(){
        return todoRepo.findAll();
    }
    @Override
    public TodoItem getTodoItemById(Integer id){
        Optional<TodoItem> todo = todoRepo.findById(id);
        if(todo.isPresent())
            return todo.get();
        throw new NotFoundException("done");
        }


    @Override
    public TodoItem updateTodoItem(Integer id, TodoItem todoItemRequest) {
        TodoItem todoItem = todoRepo.findById(id).get();

        todoItem.setTitle(todoItemRequest.getTitle());
        todoItem.setStatus(todoItemRequest.getStatus());
        return todoRepo.save(todoItem);
    }
    @Override
    public TodoItem createTodoItem(TodoItemCreateDto todoItem) {
        TodoItem todo = new TodoItem();
        todo.setTitle(todoItem.getTitle());
        todo.setStatus(todoItem.getStatus());
        return todoRepo.save(todo);
    }


    @Override
    public void hardRemoveTemplateById(Integer id){
        try{
            todoRepo.deleteById(id);
        }catch (Exception e){
            throw new NotFoundException("done");
        }
    }

    @Override
    public void deleteTodoItem(Integer id) {
        TodoItem todoItem = todoRepo.findById(id).get();
        todoRepo.delete(todoItem);
    }

    @Override
    public void markTodoAsInProgress(int id) {
        Optional<TodoItem> todoOptional = todoRepo.findById(id);

        if (todoOptional.isPresent()) {
            TodoItem todo = todoOptional.get();
            todo.setStatus("in progress");
            todoRepo.save(todo);
        } else {
            throw new NotFoundException("Todo not found");
        }
    }
    @Override
    public void markTodoAsDone(int id) {
        Optional<TodoItem> todoOptional = todoRepo.findById(id);

        if (todoOptional.isPresent()) {
            TodoItem todo = todoOptional.get();
            todo.setStatus("done");
            todoRepo.save(todo);
        } else {
            throw new NotFoundException("Todo not found");
        }
    }

    @Override
    public List<TodoItem> getTodoItemsByCreatedBy(String createdBy) {
        return todoRepo.findByCreatedBy(createdBy);
    }
}


