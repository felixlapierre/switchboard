package org.beanpod.switchboard.config;

import lombok.AllArgsConstructor;
import org.beanpod.switchboard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@AllArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  private final UserService userService;

  private final BCryptPasswordEncoder bCryptPasswordEncoder;

  // TODO remove this method when sign in functionality is implemented
  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/*/**");
  }

  // TODO uncomment this block when sign in functionality is enabled, this secures the whole website
  //  @Override
  //  protected void configure(HttpSecurity http) throws Exception {
  //
  //    http.authorizeRequests()
  //        .antMatchers("/sign-up/**", "/sign-in/**")
  //        .permitAll()
  //        .anyRequest()
  //        .authenticated()
  //        .and()
  //        .formLogin()
  //        .loginPage("/sign-in")
  //        .permitAll();
  //  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
  }
}
