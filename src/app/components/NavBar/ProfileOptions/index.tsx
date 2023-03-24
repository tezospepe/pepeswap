import { AccountInfo } from '@airgap/beacon-sdk';
import { ProfileOptionContainer } from './styles';
import { useEffect, useState } from 'react';
import { fetchAvatarByAddress } from '../api';

type ProfileOptionsProps = {
  account?: AccountInfo;
  visible: boolean;
};

export default function ProfileOptions({
  account,
  visible,
}: ProfileOptionsProps) {
  const [avatar, setAvatar] = useState<string>();

  useEffect(() => {
    const fetchAvatar = async (address: string) => {
      const fetchedAvatar = await fetchAvatarByAddress(address);
      setAvatar(fetchedAvatar);
    };

    if (account) {
      fetchAvatar(account.address);
    }
  }, [account]);

  return visible ? (
    <ProfileOptionContainer>
      <img src={avatar} alt="profile" />
    </ProfileOptionContainer>
  ) : null;
}
