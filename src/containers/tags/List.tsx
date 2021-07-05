import React, {useEffect, useState, useCallback} from 'react';
import {Table, Space, Button, Tooltip, Typography, Modal, Row, Col, Input} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getTags, deleteTag} from "../../redux/actions/tagsActions";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {debounce} from "../../functions";
import {IRootState} from "../../redux/store";
import {TagResponse, TagInterface} from "../../types/tags";

const TagsList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const tags = useSelector<IRootState, TagResponse>((state) => state.tags.data.tags);
    const isLoading = useSelector<IRootState, boolean>((state) => state.tags.isLoading);
    const [currentTag, setCurrentTag] = useState<TagInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const {Title} = Typography;

    useEffect(() => {
        dispatch(getTags({
            page: currentPage,
            search
        }));
    }, [dispatch, currentPage, search]);
    const closeModal = () => {
        setCurrentTag(null);
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
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            key: 'action',
            width: 150,
            render: (text: any, record: TagInterface) => (
                <Space size="middle" className={'actions-center'}>
                    <Tooltip title={'Редактировать'}>
                        <Button type={'default'} onClick={() => {
                            history.push({
                                pathname: `/admin/tags/edit/${record.id}`,
                            }, {
                                tagId: record.id
                            });
                        }}>
                            <EditFilled/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'}>
                        <Button onClick={() => {
                            setCurrentTag(record);
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
                dataSource={tags.data}
                columns={columns}
                loading={isLoading}
                title={() => (
                    <>

                        <div className={'with-filters'}>
                            <Title level={4}>Список тэгов</Title>
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
                                        <Link to={'/admin/tags/add'}>
                                            Добавить тэг
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
                    total: tags && tags.total,
                    onChange: onPageChange
                }}
                rowKey={'id'}
                size={'middle'}
                bordered
            />
            <Modal
                title={`Удалить тэг ${currentTag && currentTag.name}`}
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
                        if (currentTag) {
                            dispatch(deleteTag(currentTag.id));
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
export default TagsList;
