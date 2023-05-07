import React from 'react';
import { Modal, ProfileCircle } from '../../molecules';
import { UserData } from '../../interfaces';
import { Typography } from '../../atoms';

interface IProps {
  show: boolean;
  setShow: (value: boolean) => void;
  members: UserData[];
}

export const MembersModal = ({ show, setShow, members }: IProps) => {
  return (
    <Modal show={show} onClose={setShow} title="Team Members">
      <div className="px-6 py-8 flex flex-col gap-y-3">
        {members?.map((member: UserData) => (
          <div key={member._id} className="flex items-center gap-x-3">
            <ProfileCircle
              profileCircleBackgroundColor={member.profileCircleBackgroundColor}
              profileCircleText={member.profileCircleText}
              profileCircleTextColor={member.profileCircleTextColor}
            />
            <Typography element="p" weight="regular" color="black" size="xs">
              {member.fullname}
            </Typography>
          </div>
        ))}
      </div>
    </Modal>
  );
};
