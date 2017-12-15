package shahram.net.practice.cors;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping(path = "/main")
public class MainController {
    Logger log = LoggerFactory.getLogger(getClass());

    public static final String SECRET = "secret";
    public static final long TIMEOUT = 1000 * 60 * 60 * 24 * 365;

    @GetMapping(path = "/{username}")
    public String getToken(@PathVariable("username") String username) {
        Date now = new Date();
        String token = Jwts.builder().setSubject(username).claim("roles", "user,admin").setIssuedAt(now)
            .setExpiration(new Date(now.getTime() + TIMEOUT))
            .signWith(SignatureAlgorithm.HS256, SECRET).compact();
        log.info("Token: \n{}", token);

        return token;
    }
}
