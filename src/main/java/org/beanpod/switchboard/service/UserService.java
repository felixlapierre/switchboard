package org.beanpod.switchboard.service;

import lombok.RequiredArgsConstructor;
import org.beanpod.switchboard.dao.UserDaoImpl;
import org.beanpod.switchboard.dto.UserDto;
import org.openapitools.model.UserModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserDaoImpl userDao;
  private final BCryptPasswordEncoder bcryptPasswordEncoder;

  @Override
  public UserDetails loadUserByUsername(String username) {

    return userDao.loadUserByUsername(username);
  }

  public UserDto signUpUser(UserModel user) {
    String password = user.getPassword();
    final String encryptedPassword = bcryptPasswordEncoder.encode(password);
    user.setPassword(encryptedPassword);
    return userDao.save(user);
  }
}
