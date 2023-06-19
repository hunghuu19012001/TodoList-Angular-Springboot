package com.example.todolist.repo;

import com.example.todolist.security.model.UserDao;
import com.example.todolist.security.model.UserDto;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<UserDto, Long> {
    UserDto findByUsername(String username);

}