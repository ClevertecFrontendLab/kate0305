import { Dispatch } from 'react';
import { Badge, Drawer, Form, Typography } from 'antd';
import { Dayjs } from 'dayjs';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import { selectEditTrainingData } from '@redux/redusers/trainings-slice';
import { useAppSelector } from '@hooks/index';

import { checkIsPastDate } from '@utils/check-is-past-date';
import { getFormattedDate } from '@utils/get-formatted-date';
import { useMediaQuery } from '@utils/use-media-query';

import { DateFormats } from '@type/dates';
import { BadgeColors, UserTraining } from '@type/training';
import { MD_WIDTH } from '@constants/index';

import { AddTrainingForm } from '@components/form/add-training-form';

import styles from './drawer-add-exercise.module.scss';

const { Title, Paragraph } = Typography;

type DrawerAddExerciseProps = {
    date: Dayjs;
    trainingName: string;
    isOpenDrawer: boolean;
    trainingsListForSelectedDay: UserTraining[];
    setCloseDrawer: Dispatch<React.SetStateAction<boolean>>;
};

export const DrawerAddExercise = ({
    isOpenDrawer,
    date,
    trainingName,
    trainingsListForSelectedDay,
    setCloseDrawer,
}: DrawerAddExerciseProps) => {
    const [form] = Form.useForm();
    const { isEditMode } = useAppSelector(selectEditTrainingData);
    const formattedDate = getFormattedDate(date, DateFormats.LOCAL);
    const isLaptop = useMediaQuery(`(min-width: ${MD_WIDTH})`);

    const closeDrawer = () => {
        form.submit();
        setCloseDrawer(false);
    };

    return (
        <Drawer
            title={
                <Title level={4} className={styles.title}>
                    <span className={styles.icon}>
                        {isEditMode ? (
                            <EditOutlined style={{ fontSize: '14px' }} />
                        ) : (
                            <PlusOutlined style={{ fontSize: '14px' }} />
                        )}
                    </span>
                    {isEditMode ? 'Редактирование' : 'Добавление упражнений'}
                </Title>
            }
            width={408}
            onClose={closeDrawer}
            open={isOpenDrawer}
            mask={false}
            className={styles.wrapper}
            data-test-id='modal-drawer-right'
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            destroyOnClose={true}
            placement={isLaptop ? 'right' : 'bottom'}
            height={555}
        >
            <div className={styles.data}>
                <Badge
                    color={BadgeColors[trainingName as keyof typeof BadgeColors]}
                    text={trainingName}
                    className={styles.badge}
                />
                <Paragraph>{formattedDate}</Paragraph>
            </div>
            <AddTrainingForm
                form={form}
                date={date}
                name={trainingName}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
            />
            {isEditMode && checkIsPastDate(date) && (
                <p className={styles.watning}>
                    После сохранения внесенных изменений отредактировать проведенную тренировку
                    будет невозможно
                </p>
            )}
        </Drawer>
    );
};
