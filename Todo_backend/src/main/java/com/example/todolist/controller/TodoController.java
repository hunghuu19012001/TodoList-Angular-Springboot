package com.example.todolist.controller;

import com.example.todolist.entity.dto.TodoItemDto;
import com.example.todolist.entity.TodoItem;
import com.example.todolist.entity.dto.request.TodoItemCreateDto;
import com.example.todolist.repo.TodoRepo;
import com.example.todolist.repo.UserRepository;
import com.example.todolist.security.model.UserDao;
import com.example.todolist.security.servicejwt.JwtUserDetailsService;
import com.example.todolist.service.TodoItemService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/todo")
//@CrossOrigin(origins = "http://localhost:4200")
public class TodoController {
    @Autowired
    private TodoRepo todoRepo;
    @Autowired
    private TodoItemService todoItemService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private AuditorAware<String> auditorAware;
    @GetMapping
    public List<TodoItemDto> findAll() {
        return todoItemService.getTodoItem().stream().map(todo -> mapper.map(todo, TodoItemDto.class)).collect(Collectors.toList());
    }

    @GetMapping("/{current-user}")
    public ResponseEntity<List<TodoItemDto>> getTodoItemsOfCurrentUser(@PathVariable("current-user") String currentUser) {


        // Lấy danh sách TodoItem của người dùng hiện tại dựa trên createdBy
        List<TodoItem> todoItems = todoItemService.getTodoItemsByCreatedBy(currentUser);

        // Chuyển đổi danh sách TodoItem sang DTO
        List<TodoItemDto> todoItemResponse = todoItems.stream()
                .map(todo -> mapper.map(todo, TodoItemDto.class))
                .collect(Collectors.toList());

        return ResponseEntity.ok(todoItemResponse);
    }


    @GetMapping(path = "{id}",consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = "application/json")
    public ResponseEntity<TodoItemDto> getTodoById(@PathVariable Integer id){
        TodoItem todoItem = todoItemService.getTodoItemById(id);
        TodoItemDto todoItemResponse = mapper.map(todoItem, TodoItemDto.class);

        return ResponseEntity.ok().body(todoItemResponse);
    }

    @PostMapping
    public ResponseEntity<TodoItemDto> createTodoItem(@RequestBody TodoItemCreateDto todoItemDto) {
        TodoItem todoItem = todoItemService.createTodoItem(todoItemDto);

        // convert entity to DTO
        TodoItemDto todoItemResponse = mapper.map(todoItem, TodoItemDto.class);

        return ResponseEntity.ok(todoItemResponse);

    }



    @PutMapping("{id}")
    public ResponseEntity<TodoItemDto> updateTodoItem(@PathVariable Integer id, @RequestBody TodoItemDto todoItemDto) {

        // convert DTO to Entity
        TodoItem todoItemRequest = mapper.map(todoItemDto, TodoItem.class);

        TodoItem todoItem = todoItemService.updateTodoItem(id, todoItemRequest);

        // entity to DTO
        TodoItemDto todoItemResponse = mapper.map(todoItem, TodoItemDto.class);

        return ResponseEntity.ok().body(todoItemResponse);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<TodoItemDto> deleteTodoItem(@PathVariable Integer id) {
        todoItemService.hardRemoveTemplateById(id);
        TodoItemDto todoItemDto = new TodoItemDto();
        return new ResponseEntity<>(todoItemDto,HttpStatus.OK);
    }
    //updatestatus

    @PutMapping("/{id}/inprogress")
    public ResponseEntity<?> markTodoAsInProgress(@PathVariable int id) {
        todoItemService.markTodoAsInProgress(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/done")
    public ResponseEntity<?> markTodoAsDone(@PathVariable int id) {
        todoItemService.markTodoAsDone(id);
        return ResponseEntity.ok().build();
    }
}




