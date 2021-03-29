package org.beanpod.switchboard.repository;

import java.util.List;
import java.util.Optional;
import org.beanpod.switchboard.entity.DecoderEntity;
import org.beanpod.switchboard.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DecoderRepository extends JpaRepository<DecoderEntity, String> {

  DecoderEntity save(DecoderEntity decoderEntity);

  //  General data access methods
  //
  //  List<DecoderEntity> findAll();
  //
  //  Optional<DecoderEntity> findDecoderBySerialNumber(String serialNumber);
  //
  //  Long deleteDecoderEntityBySerialNumber(String serialNumber);

  // Ownership data access methods

  List<DecoderEntity> findDecoderEntitiesByDeviceUser(UserEntity user);

  Optional<DecoderEntity> findDecoderByDeviceUserAndSerialNumber(
      UserEntity user, String serialNumber);

  Long deleteDecoderEntityByDeviceUserAndSerialNumber(UserEntity user, String serialNumber);
}
