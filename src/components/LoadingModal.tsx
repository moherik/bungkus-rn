import {Center, Modal, Spinner} from 'native-base';
import React, {useEffect, useState} from 'react';

type Props = {
  loading: boolean;
  bg?: string;
  color?: string;
  size?: string;
};

const Loading = ({loading, bg = 'white', color = 'red.600'}: Props) => {
  const [loadingModalVisible, setLoadingModalVisible] =
    useState<boolean>(false);

  useEffect(() => {
    if (loading) {
      setLoadingModalVisible(true);
    } else {
      setLoadingModalVisible(false);
    }

    return () => {
      setLoadingModalVisible(false);
    };
  }, [loading]);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={loadingModalVisible}
      onClose={setLoadingModalVisible}
      size="sm">
      <Center bg={bg} borderRadius="md" p={2}>
        <Spinner color={color} />
      </Center>
    </Modal>
  );
};

export default Loading;
