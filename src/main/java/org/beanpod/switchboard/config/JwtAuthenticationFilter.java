package org.beanpod.switchboard.config;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import static org.beanpod.switchboard.config.SecurityProperties.AUTHENTICATION_URL;
import static org.beanpod.switchboard.config.SecurityProperties.AUTHORIZATION_HEADER_STRING;
import static org.beanpod.switchboard.config.SecurityProperties.BASIC_AUTHENTICATION_PREFIX;
import static org.beanpod.switchboard.config.SecurityProperties.BEARER_TOKEN_PREFIX;
import static org.beanpod.switchboard.config.SecurityProperties.EXPIRATION_TIME;

import com.auth0.jwt.JWT;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.beanpod.switchboard.entity.SwitchBoardUserDetails;
import org.beanpod.switchboard.exceptions.ExceptionType.CouldNotAuthenticateUserException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final SecurityProperties securityProperties;

  public JwtAuthenticationFilter(
      AuthenticationManager authenticationManager, SecurityProperties securityProperties) {
    this.authenticationManager = authenticationManager;
    this.securityProperties = securityProperties;
    setFilterProcessesUrl(AUTHENTICATION_URL);
  }

  @Override
  public Authentication attemptAuthentication(
      HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    try {
      var authorizationHeader = request.getHeader(AUTHORIZATION_HEADER_STRING);
      var encodedCredentials =
          authorizationHeader.substring(BASIC_AUTHENTICATION_PREFIX.length()).trim();
      String decodedCredentials =
          new String(Base64.getDecoder().decode(encodedCredentials), StandardCharsets.UTF_8);
      String[] credentials = decodedCredentials.split(":");

      return authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(credentials[0], credentials[1]));

    } catch (Exception e) {
      throw new CouldNotAuthenticateUserException();
    }
  }

  @Override
  protected void successfulAuthentication(
      HttpServletRequest request,
      HttpServletResponse response,
      FilterChain chain,
      Authentication authResult) {
    String username = ((SwitchBoardUserDetails) authResult.getPrincipal()).getUsername();
    String userRole =
        String.valueOf(((SwitchBoardUserDetails) authResult.getPrincipal()).getUserRole());
    String token =
        JWT.create()
            .withSubject(username)
            .withClaim("role", userRole)
            .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .sign(HMAC512(securityProperties.getSecret().getBytes()));
    response.addHeader(AUTHORIZATION_HEADER_STRING, BEARER_TOKEN_PREFIX + token);
    response.addHeader("Access-Control-Expose-Headers", AUTHORIZATION_HEADER_STRING);
  }
}
