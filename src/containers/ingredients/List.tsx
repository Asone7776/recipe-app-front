import React, {useEffect, useState, useCallback} from 'react';
import {Table, Space, Button, Tooltip, Typography, Modal, Row, Col, Input} from 'antd';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, deleteIngredient} from "../../redux/actions/ingredientsActions";
import {EditFilled, DeleteFilled} from "@ant-design/icons";
import {debounce} from "../../functions";
import {IRootState} from "../../redux/store";
import {IngredientsResponse, IngredientInterface} from "../../types/ingredients";

const IngredientsList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const ingredients = useSelector<IRootState, IngredientsResponse>((state) => state.ingredients.data.ingredients);
    const isLoading = useSelector<IRootState, boolean>((state) => state.ingredients.isLoading);
    const [currentIngredient, setCurrentIngredient] = useState<IngredientInterface | null>(null);
    const [currentPage, setCurrentPage] = useState<number | null>(null);
    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState<string | null>(null);
    const {Title} = Typography;

    useEffect(() => {
        dispatch(getIngredients({
            page: currentPage,
            search
        }));
    }, [dispatch, currentPage, search]);
    const closeModal = () => {
        setCurrentIngredient(null);
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
            render: (text: any, record: IngredientInterface) => (
                <Space size="middle" className={'actions-center'}>
                    <Tooltip title={'Редактировать'}>
                        <Button type={'default'} onClick={() => {
                            history.push({
                                pathname: `/admin/ingredients/edit/${record.id}`,
                            }, {
                                ingredientId: record.id
                            });
                        }}>
                            <EditFilled/>
                        </Button>
                    </Tooltip>
                    <Tooltip title={'Удалить'}>
                        <Button onClick={() => {
                            setCurrentIngredient(record);
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
                dataSource={ingredients.data}
                columns={columns}
                loading={isLoading}
                title={() => (
                    <>

                        <div className={'with-filters'}>
                            <Title level={4}>Список ингредиентов</Title>
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
                                        <Link to={'/admin/ingredients/add'}>
                                            Добавить ингредиент
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
                    total: ingredients && ingredients.total,
                    onChange: onPageChange
                }}
                rowKey={'id'}
                size={'middle'}
                bordered
            />
            <Modal
                title={`Удалить ингредиент ${currentIngredient && currentIngredient.name}`}
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
                        if (currentIngredient) {
                            dispatch(deleteIngredient(currentIngredient.id));
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
export default IngredientsList;
