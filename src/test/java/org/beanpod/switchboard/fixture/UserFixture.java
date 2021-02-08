package org.beanpod.switchboard.fixture;

import org.beanpod.switchboard.dto.UserDto;
import org.beanpod.switchboard.entity.UserEntity;
import org.openapitools.model.UserModel;

public class UserFixture {

  public static UserModel getUserModel() {
    return new UserModel().email("moh@gmail.com").password("1234.");
  }

  public static UserDto getUserDto() {
    return new UserDto().builder().email("moh@gmail.com").password("1234.").build();
  }

  public static UserEntity getUserEntity() {
    return new UserEntity().builder().email("moh@gmail.com").password("1234.").build();
  }
}
