package com.example.todolist.repo;

import com.example.todolist.entity.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface TodoRepo extends JpaRepository<TodoItem, Integer> {

    List<TodoItem> findByCreatedBy(String createdBy);

}
