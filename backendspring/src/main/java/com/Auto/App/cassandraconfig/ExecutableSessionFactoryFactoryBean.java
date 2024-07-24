package com.Auto.App.cassandraconfig;

import org.springframework.data.cassandra.config.SessionFactoryFactoryBean;

public  class ExecutableSessionFactoryFactoryBean extends  SessionFactoryFactoryBean{
    @Override
    public void createTables(boolean drop, boolean dropUnused, boolean ifNotExists) {
        super.createTables(drop, dropUnused, ifNotExists);
    }
}
