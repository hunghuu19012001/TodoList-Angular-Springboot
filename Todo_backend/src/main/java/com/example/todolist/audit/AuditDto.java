package com.example.todolist.audit;

import java.util.Date;

public abstract class AuditDto {
    private String createdBy;
    private Date createdDate;
    private String lastModifiedBy;
    private Date lastModifiedDate;
}
