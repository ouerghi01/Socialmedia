package com.Auto.App.cassandraconfig;


import java.time.Duration;
import java.util.Arrays;
import java.util.List;

import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.cassandra.CassandraProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.cassandra.SessionFactory;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.config.CqlSessionFactoryBean;
import org.springframework.data.cassandra.config.SchemaAction;
import org.springframework.data.cassandra.config.SessionBuilderConfigurer;
import org.springframework.data.cassandra.config.SessionFactoryFactoryBean;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.CassandraTemplate;
import org.springframework.data.cassandra.core.convert.CassandraConverter;
import org.springframework.data.cassandra.core.convert.MappingCassandraConverter;
import org.springframework.data.cassandra.core.cql.keyspace.CreateKeyspaceSpecification;
import org.springframework.data.cassandra.core.cql.keyspace.KeyspaceOption;
import org.springframework.data.cassandra.core.cql.session.init.ResourceKeyspacePopulator;
import org.springframework.data.cassandra.core.cql.session.init.SessionFactoryInitializer;
import org.springframework.data.cassandra.core.mapping.CassandraMappingContext;
import org.springframework.data.cassandra.core.mapping.SimpleUserTypeResolver;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.CqlSessionBuilder;
import com.datastax.oss.driver.api.core.config.DefaultDriverOption;
import com.datastax.oss.driver.api.core.config.DriverConfigLoader;

import lombok.RequiredArgsConstructor;

@Configuration
@PropertySource(value = { "classpath:application.properties" })
@EnableCassandraRepositories(basePackages = "com.Auto.App.Entity")
@RequiredArgsConstructor
public class CassandraConfig extends AbstractCassandraConfiguration {
   
  



    @Value("${spring.cassandra.local-datacenter}")
    private String localDataCenter;

    @Value("${spring.cassandra.contact-points}")
    private String contactPoints;

    @Value("${spring.cassandra.keyspace-name}")
    private String keyspace;

    @Value("${spring.cassandra.entity-base-package}")
    private String entityBasePackage;

    @Override
    protected String getKeyspaceName() {
        return keyspace;
    }

    @Override
    public String getContactPoints() {
        return contactPoints;
    }

    @Override
    protected int getPort() {
        return 9042;
    }

    @Override
    protected String getLocalDataCenter() {
        return localDataCenter;
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[] { entityBasePackage };
    }

    @Bean
    @Override
    public CqlSessionFactoryBean cassandraSession() {
      CqlSessionFactoryBean cassandraSession = super.cassandraSession();//super session should be called only once
   
      cassandraSession.setContactPoints(contactPoints);
      cassandraSession.setPort(9042);
      cassandraSession.setLocalDatacenter(localDataCenter);
      cassandraSession.setKeyspaceName(keyspace);
      cassandraSession.setSessionBuilderConfigurer(new SessionBuilderConfigurer() {
          @Override
          public CqlSessionBuilder configure(CqlSessionBuilder cqlSessionBuilder) {
              System.out.println("Configuring CqlSession Builder");
              return cqlSessionBuilder;
          }
      });

      return cassandraSession;
    }
    /* 
    @Bean
   
    public SessionFactoryFactoryBean sessionFactory(CqlSession session, CassandraConverter converter) {
        SessionFactoryFactoryBean sessionFactory = new SessionFactoryFactoryBean();
        sessionFactory.setSession(session);
        sessionFactory.setConverter(converter);
        sessionFactory.setSchemaAction(SchemaAction.NONE);
        return sessionFactory;
    }

    public CassandraMappingContext cassandraMappingContext() {
        return new CassandraMappingContext();
    }

    @Bean
    @Primary
    public CassandraConverter cassandraConverter(CqlSession cqlSession, CassandraMappingContext mappingContext) {
        MappingCassandraConverter cassandraConverter = new MappingCassandraConverter(mappingContext);
        cassandraConverter.setUserTypeResolver(new SimpleUserTypeResolver(cqlSession));
        return cassandraConverter;
    }

    @Bean
public CassandraOperations cassandraTemplate(SessionFactory sessionFactory, CassandraConverter converter) {
    return new CassandraTemplate(sessionFactory, converter);
}

*/

 @Bean
  public  SessionFactoryInitializer sessionFactoryInitializer(SessionFactory sessionFactory) {

    SessionFactoryInitializer initializer = new SessionFactoryInitializer();
    initializer.setSessionFactory(sessionFactory);

    ResourceKeyspacePopulator populator = new ResourceKeyspacePopulator();
    populator.setSeparator(";");
    //populator.setScripts(new ClassPathResource("com/myapp/cql/db-schema.cql"));

    initializer.setKeyspacePopulator(populator);

    return initializer;
  }

   
  protected SessionBuilderConfigurer getSessionBuilderConfigurer() {
    return new SessionBuilderConfigurer() {

      @Override
      public CqlSessionBuilder configure(CqlSessionBuilder cqlSessionBuilder) {
        System.out.println("Configuring CqlSession Builder");
        return cqlSessionBuilder
                .withConfigLoader(DriverConfigLoader.programmaticBuilder()
                // Resolves the timeout query 'SELECT * FROM system_schema.tables' timed out after PT2S
                .withDuration(DefaultDriverOption.METADATA_SCHEMA_REQUEST_TIMEOUT, Duration.ofMillis(60000))
                .withDuration(DefaultDriverOption.CONNECTION_INIT_QUERY_TIMEOUT, Duration.ofMillis(60000))
                .withDuration(DefaultDriverOption.REQUEST_TIMEOUT, Duration.ofMillis(15000))
                .build());
      }
    };
  }
  
 @Override
    public List<CreateKeyspaceSpecification> getKeyspaceCreations() {
        CreateKeyspaceSpecification specification = CreateKeyspaceSpecification.createKeyspace(keyspace)
                .with(KeyspaceOption.DURABLE_WRITES, true)
                .ifNotExists();
        return Arrays.asList(specification);
    }
}
