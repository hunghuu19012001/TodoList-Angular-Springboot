package com.example.todolist.entity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class TodoItemCreateDto {
    private String title;
    private String status;

    private String createdBy;

//    public void setCreatedBy(String createdBy){
//        this.createdBy = createdBy;
//    }

}
