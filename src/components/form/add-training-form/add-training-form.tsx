import { useState } from 'react';
import { Checkbox, Form, FormInstance, Input, InputNumber } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

import { createTraining, selectTrainingData } from '@redux/redusers/trainings-slice';
import { useAppDispatch, useAppSelector } from '@hooks/index';

import { checkIsPastDate } from '@utils/check-is-past-date';

import { Exercise, UserTraining } from '@type/training';

import { PrimaryBtn } from '@components/buttons/primary-button';

import styles from './add-training-form.module.scss';

type FormValues = Exercise & {
    isChecked?: boolean;
};

type AddTrainingFormProps = {
    form: FormInstance<Record<string, FormValues[]>>;
    date: Dayjs;
    name: string;
    trainingsListForSelectedDay: UserTraining[];
};

export const AddTrainingForm = ({
    form,
    date,
    name,
    trainingsListForSelectedDay,
}: AddTrainingFormProps) => {
    const dispatch = useAppDispatch();
    const { editTrainingData, training } = useAppSelector(selectTrainingData);

    const { isEditMode, editTrainingIndex } = editTrainingData;
    const { exercises } = training;

    const [formValuesChecked, setFormValuesChecked] = useState<number[]>([]);

    const pastDate = checkIsPastDate(date);

    const isHaveExerisesForEdit = trainingsListForSelectedDay[editTrainingIndex] ?? false;

    const exerisesForEdit =
        isHaveExerisesForEdit && trainingsListForSelectedDay[editTrainingIndex].exercises;

    const getInitialFormValues = () => {
        if (exercises.length) return { fields: exercises };
        if (isEditMode && exerisesForEdit.length) return { fields: exerisesForEdit };
        return { fields: [{}] };
    };

    const initialFormValues = getInitialFormValues();

    const onFinish = (values: Record<string, FormValues[]>) => {
        const trainings = [...values.fields].filter((training) => training.name);
        dispatch(
            createTraining({
                name,
                date: dayjs(date).toISOString(),
                exercises: trainings,
                isImplementation: pastDate,
            }),
        );
    };

    const getCheckedFields = () => {
        const formValues = form.getFieldsValue();
        const arrIndexes = formValues.fields
            .map((value, index) => value && value.isChecked && index)
            .filter((value): value is number => typeof value === 'number');
        return arrIndexes;
    };

    const onFormValuesChange = () => {
        setFormValuesChecked(getCheckedFields());
    };

    return (
        <Form
            form={form}
            id='add-training'
            name='add-training'
            layout='vertical'
            size='small'
            className={styles.form}
            onFinish={onFinish}
            onValuesChange={onFormValuesChange}
            initialValues={initialFormValues}
            preserve={false}
        >
            <Form.List name='fields'>
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            <div className={styles.container}>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <div className={styles.input_block} key={key}>
                                        <Form.Item {...restField} name={[name, 'name']}>
                                            <Input
                                                placeholder='Упражнение'
                                                data-test-id={`modal-drawer-right-input-exercise${index}`}
                                                addonAfter={
                                                    isEditMode && (
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'isChecked']}
                                                            valuePropName='checked'
                                                            className={styles.checkBox}
                                                        >
                                                            <Checkbox
                                                                data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                                                            />
                                                        </Form.Item>
                                                    )
                                                }
                                            />
                                        </Form.Item>
                                        <div className={styles.details_wrap}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'approaches']}
                                                label='Подходы'
                                            >
                                                <InputNumber
                                                    min={1}
                                                    placeholder='1'
                                                    addonBefore='+'
                                                    data-test-id={`modal-drawer-right-input-approach${index}`}
                                                />
                                            </Form.Item>
                                            <div className={styles.wrap}>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'weight']}
                                                    label='Вес, кг'
                                                >
                                                    <InputNumber
                                                        min={0}
                                                        placeholder='0'
                                                        data-test-id={`modal-drawer-right-input-weight${index}`}
                                                    />
                                                </Form.Item>
                                                <span className={styles.divider}>x</span>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'replays']}
                                                    label='Количество'
                                                >
                                                    <InputNumber
                                                        min={1}
                                                        placeholder='3'
                                                        data-test-id={`modal-drawer-right-input-quantity${index}`}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={isEditMode ? styles.btn_group : ''}>
                                <Form.Item
                                    className={isEditMode ? styles.btn_add_edit : styles.btn_add}
                                >
                                    <PrimaryBtn
                                        type='link'
                                        icon={
                                            <PlusOutlined
                                                style={{ fontSize: '14px', color: '#2f54eb' }}
                                            />
                                        }
                                        onClick={() => add()}
                                        btnText='Добавить ещё'
                                        className={''}
                                    />
                                </Form.Item>
                                {isEditMode && (
                                    <PrimaryBtn
                                        type='ghost'
                                        icon={<MinusOutlined style={{ fontSize: '14px' }} />}
                                        onClick={() => {
                                            remove(formValuesChecked);
                                        }}
                                        className={
                                            isEditMode ? styles.btn_add_edit_left : styles.btn_add
                                        }
                                        btnText='Удалить'
                                        disabled={!formValuesChecked.length}
                                    />
                                )}
                            </div>
                        </div>
                    );
                }}
            </Form.List>
        </Form>
    );
};
