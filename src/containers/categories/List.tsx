import React, {useEffect, useState, useCallback} from 'react';
import {Table, Space, Button, Tooltip, Typography, Modal, Row, Col, Input} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getCategories, deleteCategory} from "../../redux/actions/categoriesActions";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {debounce} from "../../functions";
import {IRootState} from "../../redux/store";
import {CategoryResponse, CategoryInterface} from "../../types/categories";

const CategoriesList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const categories = useSelector<IRootState, CategoryResponse>((state) => state.categories.data.categories);
    const isLoading = useSelector<IRootState, boolean>((state) => state.categories.isLoading);
    const [currentCategory, setCurrentCategory] = useState<CategoryInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const {Title} = Typography;

    useEffect(() => {
        dispatch(getCategories({
            page: currentPage,
            search
        }));
    }, [dispatch, currentPage, search]);
    const closeModal = () => {
        setCurrentCategory(null);
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
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '',
            key: 'action',
            width: 150,
            render: (text: any, record: CategoryInterface) => (
                <Space size="middle" className={'actions-center'}>
                    <Tooltip title={'Редактировать'}>
                        <Button type={'default'} onClick={() => {
                            history.push({
                                pathname: `/admin/categories/edit/${record.id}`,
                            }, {
                                categoryId: record.id
                            });
                        }}>
                            <EditFilled/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'}>
                        <Button onClick={() => {
                            setCurrentCategory(record);
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
                dataSource={categories.data}
                columns={columns}
                loading={isLoading}
                title={() => (
                    <>

                        <div className={'with-filters'}>
                            <Title level={4}>Список категорий</Title>
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
                                        <Link to={'/admin/categories/add'}>
                                            Добавить категорию
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
                    total: categories && categories.total,
                    onChange: onPageChange
                }}
                rowKey={'id'}
                size={'middle'}
                bordered
            />
            <Modal
                title={`Удалить банк ${currentCategory && currentCategory.name}`}
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
                        if (currentCategory) {
                            dispatch(deleteCategory(currentCategory.id));
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
export default CategoriesList;
