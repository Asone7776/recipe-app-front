import React, {useEffect, useState, useCallback} from 'react';
import {Table, Space, Button, Tooltip, Typography, Modal, Row, Col, Input} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getComments, deleteComment} from "../../redux/actions/commentsActions";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {debounce} from "../../functions";
import {IRootState} from "../../redux/store";
import {CommentsResponse, CommentInterface} from "../../types/comments";

const CommentsList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const comments = useSelector<IRootState, CommentsResponse>((state) => state.comments.data.comments);
    const isLoading = useSelector<IRootState, boolean>((state) => state.comments.isLoading);
    const [currentComment, setCurrentComment] = useState<CommentInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const {Title} = Typography;

    useEffect(() => {
        dispatch(getComments({
            page: currentPage,
            search
        }));
    }, [dispatch, currentPage, search]);
    const closeModal = () => {
        setCurrentComment(null);
        setModal(false);
    };
    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifySearch = useCallback(
        debounce((search: string) => {
            setSearch(search);
        }, 500),
        []);
    const columns = [
        {
            title: 'Сообщение',
            dataIndex: 'message',
            key: 'message',
        },
        {
            title: 'Автор',
            dataIndex: 'user',
            key: 'user',
            render: (text: any) => (
                text ? text.name + '-' + text.email : null
            )
        },
        {
            title: 'Рецепт',
            dataIndex: 'recipe',
            key: 'recipe',
            render: (text: any) => (
                text ? text.name : null
            )
        },
        {
            title: '',
            key: 'action',
            width: 150,
            render: (text: any, record: CommentInterface) => (
                <Space size="middle" className={'actions-center'}>
                    <Tooltip title={'Редактировать'}>
                        <Button type={'default'} onClick={() => {
                            history.push({
                                pathname: `/admin/comments/edit/${record.id}`,
                            }, {
                                commentId: record.id
                            });
                        }}>
                            <EditFilled/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'}>
                        <Button onClick={() => {
                            setCurrentComment(record);
                            setModal(true);
                        }}>
                            <DeleteFilled/>
                        </Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table
                dataSource={comments.data}
                columns={columns}
                loading={isLoading}
                title={() => (
                    <>

                        <div className={'with-filters'}>
                            <Title level={4}>Список комментариев</Title>
                            <Row gutter={15}>
                                <Col span={5}>
                                    <label className={'cm-options-label'}>Поиск</label>
                                    <Input onChange={(event) => {
                                        let targetValue = event.target.value;
                                        let val = targetValue === '' ? null : targetValue;
                                        verifySearch(val);
                                    }} allowClear
                                    />
                                </Col>
                                <Col span={19} className={'bottomRightToEnd'}>
                                    <Button type={'primary'}>
                                        <Link to={'/admin/comments/add'}>
                                            Добавить комментарий
                                        </Link>
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                    </>
                )}
                footer={() => ''}
                pagination={{
                    current: currentPage || 1,
                    defaultPageSize: 15,
                    showSizeChanger: false,
                    total: comments && comments.total,
                    onChange: onPageChange
                }}
                rowKey={'id'}
                size={'middle'}
                bordered
            />
            <Modal
                title={`Удалить комментарий ${setCurrentComment && setCurrentComment.name}`}
                visible={modal}
                onCancel={closeModal}
                centered
                footer={[
                    <Button key="back" onClick={() => {
                        closeModal();
                    }}>
                        Отменить
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {
                        if (currentComment) {
                            dispatch(deleteComment(currentComment.id));
                        }
                        closeModal();
                    }}>
                        Удалить
                    </Button>,
                ]}
            >
            </Modal>
        </>

    )
};
export default CommentsList;
