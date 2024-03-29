import { Col, Layout, Row, Typography } from 'antd';

import { useCalendarClick } from '@utils/use-click-calendar';

import { ResultRequestKeys } from '@type/result-request-keys';

import { PrimaryBtn } from '@components/buttons/primary-button';
import { ContentCard } from '@components/content-card';
import { ModalWindow } from '@components/modal-window';
import { RequestResult } from '@components/request-result';

import { ActionsList } from './content/actions-list';
import { PossibilitieSection } from './content/possibilities-section';

import styles from './main-page.module.scss';

const { Content } = Layout;
const { Paragraph } = Typography;

export const MainPage = () => {
    const { isErr, handleClick, closeErrModal } = useCalendarClick();

    return (
        <>
            <ModalWindow
                isOpen={isErr}
                dataTestId='modal-no-review'
                children={
                    <RequestResult
                        keyErr={ResultRequestKeys.GET_FEEDBACK_ERR}
                        buttonsGroup={
                            <PrimaryBtn
                                type='primary'
                                htmlType='button'
                                className={styles.btn_err}
                                btnText='Назад'
                                onClick={closeErrModal}
                                dataTestId='write-review-not-saved-modal'
                            />
                        }
                    />
                }
            />

            <Content className={styles.content}>
                <Row gutter={16} style={{ maxWidth: '768px' }}>
                    <Col span={24}>
                        <ContentCard
                            className={styles.main_card}
                            bordered={false}
                            content={<PossibilitieSection />}
                        />
                    </Col>
                </Row>
                <Row
                    gutter={[
                        { xs: 0, sm: 16 },
                        { xs: 6, sm: 16 },
                    ]}
                    style={{ maxWidth: '768px', marginTop: '24px' }}
                >
                    <Col span={24}>
                        <ContentCard
                            className={styles.main_card}
                            bordered={false}
                            content={
                                <Paragraph className={styles.text}>
                                    CleverFit — это не просто приложение, а твой личный помощник
                                    в&nbsp;мире фитнеса. Не откладывай на завтра — начни
                                    тренироваться уже сегодня!
                                </Paragraph>
                            }
                        />
                    </Col>
                </Row>
                <ActionsList onClick={handleClick} />
            </Content>
        </>
    );
};
