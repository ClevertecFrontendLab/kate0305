import { Dispatch } from 'react';
import { Card } from 'antd';
import { Dayjs } from 'dayjs';
import { CloseOutlined } from '@ant-design/icons';

import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';

import { DateFormats } from '@type/dates';
import { TrainingResp } from '@type/service';
import { UserTraining } from '@type/training';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { TrainingList } from '@components/calendar-trainings/training-list';
import { ContentCard } from '@components/content-card';
import { EmptyBlock } from '@components/empty-block';

import styles from './modal-day.module.scss';

const { Meta } = Card;
type ModalDayProps = {
    date: Dayjs;
    trainingsListForSelectedDay: UserTraining[];
    appTrainingList: TrainingResp[];
    openChooseTraining: () => void;
    setCloseModal: Dispatch<React.SetStateAction<Element | null>>;
    isRightModalPosition: boolean;
};

export const ModalDay = ({
    date,
    trainingsListForSelectedDay,
    appTrainingList,
    openChooseTraining,
    setCloseModal,
    isRightModalPosition,
}: ModalDayProps) => {
    const closeModal = () => setCloseModal(null);
    const formattedDate = getFormattedDate(date, DateFormats.LOCAL);

    const isPastDate = checkIsPastDate(date);
    const trainingsListLength = trainingsListForSelectedDay.length;
    const isBtnDisabled = isPastDate || trainingsListLength === appTrainingList.length;

    return (
        <ContentCard
            className={isRightModalPosition ? styles.wrapper_last_day : styles.wrapper}
            actions={[
                <PrimaryBtn
                    type='primary'
                    btnText='Создать тренировку'
                    htmlType='button'
                    className={styles.btn_training}
                    disabled={isBtnDisabled}
                    onClick={openChooseTraining}
                />,
            ]}
            dataTestId='modal-create-training'
            content={
                <>
                    <div className={styles.title}>
                        <Meta
                            title={`Тренировки на ${formattedDate}`}
                            description={!trainingsListLength && 'Нет активных тренировок'}
                            className={styles.text}
                        />
                        <PrimaryBtn
                            type='text'
                            icon={<CloseOutlined style={{ fontSize: '12px' }} />}
                            onClick={closeModal}
                            dataTestId='modal-create-training-button-close'
                            className={styles.btn_close}
                        />
                    </div>
                    {trainingsListLength ? (
                        <TrainingList
                            fromModalDay={true}
                            onClick={openChooseTraining}
                            trainingsListForSelectedDay={trainingsListForSelectedDay}
                        />
                    ) : (
                        <EmptyBlock />
                    )}
                </>
            }
        />
    );
};
