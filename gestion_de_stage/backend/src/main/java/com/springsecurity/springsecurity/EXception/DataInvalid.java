package com.springsecurity.springsecurity.EXception;

import org.hibernate.exception.DataException;

import java.sql.SQLException;

public class DataInvalid extends Exception {
    public DataInvalid(String message) {
        super(message);
    }
}
