import { useMemo, useState } from 'react';
import { Select } from 'antd';
import { Dayjs } from 'dayjs';
import { ArrowLeftOutlined } from '@ant-design/icons';

import {
    resetTraining,
    selectTrainingData,
    setEditTrainingData,
    setEditTrainingId,
} from '@redux/redusers/trainings-slice';
import { useAppDispatch, useAppSelector } from '@hooks/index';

import { checkIsPastDate } from '@utils/check-is-past-date';

import { TrainingResp } from '@type/service';
import { UserTraining } from '@type/training';

import { EditBtn } from '@components/buttons/edit-button';
import { PrimaryBtn } from '@components/buttons/primary-button';
import { DrawerAddExercise } from '@components/calendar-trainings/drawer-add-exercise';
import { ContentCard } from '@components/content-card';
import { EmptyBlock } from '@components/empty-block';

import styles from './modal-choose-training.module.scss';

type ModalChooseTrainingProps = {
    date: Dayjs;
    saveTraining: () => Promise<void>;
    setCloseModal: () => void;
    trainingsListForSelectedDay: UserTraining[];
    appTrainingList: TrainingResp[];
    isRightModalPosition: boolean;
};

export const ModalChooseTraining = ({
    date,
    saveTraining,
    setCloseModal,
    trainingsListForSelectedDay,
    appTrainingList,
    isRightModalPosition,
}: ModalChooseTrainingProps) => {
    const dispatch = useAppDispatch();
    const { updateTrainingLoading, training, editTrainingData } =
        useAppSelector(selectTrainingData);

    const { exercises } = training;
    const { isEditMode, editTrainingIndex } = editTrainingData;

    const [isOpenAddExercise, setOpenAddExercise] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<string | null>(null);

    const pastDate = checkIsPastDate(date);
    const isHaveDayExercise = useMemo(() => exercises.find(({ name }) => name), [exercises]);

    const { _id: editTrainingId, exercises: editTrainingExercise } =
        trainingsListForSelectedDay[editTrainingIndex] ?? [];

    const dayTrainingList = useMemo(
        () => trainingsListForSelectedDay.map(({ name }) => name) ?? [],
        [trainingsListForSelectedDay],
    );

    const trainingListForSelect = useMemo(
        () =>
            appTrainingList.filter(({ name }) =>
                dayTrainingList.length ? !dayTrainingList.includes(name) : name,
            ),
        [appTrainingList, dayTrainingList],
    );

    const getExerciseForRender = () => {
        if (isEditMode && editTrainingExercise && !isHaveDayExercise) {
            return editTrainingExercise;
        }
        if (isEditMode && editTrainingExercise && isHaveDayExercise) {
            return exercises;
        }
        if (selectedTraining && isHaveDayExercise) {
            return exercises;
        }
    };

    const exerciseForRender = getExerciseForRender();

    const handleChangeSelect = (trainingName: string) => {
        setSelectedTraining(trainingName);
        if (isEditMode) dispatch(setEditTrainingData({ isEditMode: false, editTrainingIndex: 0 }));
    };

    const closeModal = () => {
        dispatch(resetTraining());
        setCloseModal();
    };

    const openAddExercise = () => {
        if (isEditMode) dispatch(setEditTrainingId({ editTrainingId }));
        setOpenAddExercise(true);
    };

    const handleSaveBtn = async () => {
        await saveTraining();
        closeModal();
    };

    return (
        <>
            <ContentCard
                className={isRightModalPosition ? styles.wrapper_last_day : styles.wrapper}
                title={
                    <div className={styles.title}>
                        <PrimaryBtn
                            type='text'
                            icon={<ArrowLeftOutlined />}
                            onClick={closeModal}
                            dataTestId='modal-exercise-training-button-close'
                            className={styles.btn_close}
                        />
                        <Select
                            placeholder='Выбор типа тренировки'
                            defaultValue={
                                isEditMode
                                    ? dayTrainingList && dayTrainingList[editTrainingIndex]
                                    : null
                            }
                            style={{ width: 269 }}
                            onChange={handleChangeSelect}
                            options={
                                trainingListForSelect &&
                                trainingListForSelect.map(({ name }) => ({
                                    value: name,
                                    label: name,
                                }))
                            }
                            data-test-id='modal-create-exercise-select'
                        />
                    </div>
                }
                actions={[
                    <PrimaryBtn
                        btnText='Добавить упражнения'
                        htmlType='button'
                        className={styles.btn_add}
                        disabled={!selectedTraining && !editTrainingExercise}
                        onClick={openAddExercise}
                    />,
                    <PrimaryBtn
                        type='link'
                        btnText={pastDate ? 'Сохранить изменения' : 'Сохранить'}
                        htmlType='button'
                        loading={updateTrainingLoading}
                        onClick={handleSaveBtn}
                        className={styles.btn_save}
                        disabled={!isHaveDayExercise}
                    />,
                ]}
                dataTestId='modal-create-exercise'
                content={
                    exerciseForRender ? (
                        <ul className={styles.content}>
                            {exerciseForRender.map(({ name }, index) => (
                                <li className={styles.exircise} key={name}>
                                    <p className={styles.name} key={name}>
                                        {name}
                                    </p>
                                    <EditBtn index={index} onClick={openAddExercise} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <EmptyBlock />
                    )
                }
            />
            <DrawerAddExercise
                date={date}
                isOpenDrawer={isOpenAddExercise}
                trainingName={selectedTraining ?? dayTrainingList[editTrainingIndex]}
                trainingsListForSelectedDay={trainingsListForSelectedDay}
                setCloseDrawer={setOpenAddExercise}
            />
        </>
    );
};
