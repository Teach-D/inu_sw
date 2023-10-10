package sw.contest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})public class ContestApplication {
	public static void main(String[] args) {
		SpringApplication.run(ContestApplication.class, args);
	}

}
